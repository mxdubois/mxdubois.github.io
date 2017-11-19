import { isNil } from 'ramda'
import React from 'react';
import ReactDOM from 'react-dom'
import throttle from 'throttleit'
import position from 'position'

import { parsePercentage, fixedOrPercentage } from './percentages'

const withRelativeDimensions = () => (InnerComponent) => {
  return class WithRelativeDimensions extends React.PureComponent {
    state = {
      width: 0,
      height: 0,
      viewportWidth: 0,
      viewportHeight: 0,
    }

    handleResize = throttle(() => {
      const node = ReactDOM.findDOMNode(this)
      if (!isNil(node)) {
        const viewport = position(window)
        this.setState({
          viewportWidth: viewport.width,
          viewportHeight: viewport.height,
          ...position(node),
        })
      }
    }, 50)

    computeWidthAndHeight() {
      const {
        width: fixedWidth,
        height: fixedHeight,
        aspectRatio = 1,
      } = this.props

      const {
        width: containerWidth,
        height: containerHeight,
      } = this.state

      const percentageWidth = parsePercentage(fixedWidth)
      const percentageHeight = parsePercentage(fixedHeight)

      // TODO could be simplified
      let width, height
      if (!isNil(fixedWidth) && isNil(fixedHeight)) {
        width = fixedOrPercentage(fixedWidth, percentageWidth, containerWidth)
        height = (1 / aspectRatio) * width
      } else if (!isNil(fixedHeight) && isNil(fixedWidth)) {
        height = fixedOrPercentage(fixedHeight, percentageHeight, containerHeight)
        width = (1 / aspectRatio) * height
      } else if (!isNil(fixedWidth) && !isNil(fixedHeight)) {
        width = fixedOrPercentage(fixedWidth, percentageWidth, containerWidth)
        height = fixedOrPercentage(fixedHeight, percentageHeight, containerHeight)
      } else {
        width = containerWidth
        height = (1 / aspectRatio) * width
      }

      return { width, height }
    }

    componentDidMount() {
      window.addEventListener('resize', this.handleResize)
      this.handleResize()
    }

    render() {
      const { width, height } = this.computeWidthAndHeight()
      return <InnerComponent
        {...this.props}
        width={width}
        height={height}
        containerWidth={this.state.width}
        containerHeight={this.state.height}
        viewportWidth={this.state.viewportWidth}
        viewportHeight={this.state.viewportHeight}
      />
    }
  }
}

export default withRelativeDimensions;
