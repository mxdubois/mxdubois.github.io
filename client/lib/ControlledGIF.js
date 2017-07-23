import R from 'ramda'
import React from 'react'
import SuperGif from 'jsgif'
import shallowEqual from 'shallowequal'

const clamp = (min, max, value) => Math.min(max, Math.max(min, value))

class ControlledGIF extends React.Component {
  componentDidMount() {
    this.virtualRoot = document.createElement('div')
    this.virtualImg = document.createElement('img')
    this.virtualImg.src = this.props.src
    this.virtualRoot.appendChild(this.virtualImg)
    this.superGif = new SuperGif({
      auto_play: false,
      gif: this.virtualImg,
      show_progress_bar: true,
      // TODO will need to be able to resize this mofo
      max_width: 600,
    })
    this.superGif.load()
    this.superGif.pause()
    this.updatePlaybackState(this.props.progress)
    this.updateCanvas()
  }

  componentWillReceiveProps(nextProps) {
    this.updatePlaybackState(nextProps.progress)
  }

  // TODO
  shouldComponentUpdate(nextProps, nextState) {
    return !shallowEqual(nextProps, this.props) && !shallowEqual(nextState, this.state)
  }

  componentWillUpdate() {
    this.updatePlayback()
  }

  componentDidUpdate() {
    this.updateCanvas()
  }

  updatePlaybackState(progress) {
    const clampedProgress = clamp(0, 1, progress)
    const lastFrameIndex = this.superGif.get_length() - 1
    const frameIndex = Math.round(clampedProgress * lastFrameIndex)
    this.setState({ frameIndex })
  }

  updatePlayback() {
    const frameIndex = this.state.frameIndex
    if (!R.isNil(frameIndex) &&
        frameIndex !== this.superGif.get_current_frame() &&
        !R.isNil(this.superGif.get_frame(frameIndex))
     ) {
      this.superGif.move_to(frameIndex)
    }
  }

  updateCanvas() {
    const canvas = this.superGif.get_canvas()
    if (canvas) {
      this.mountedRoot.appendChild(canvas)
    }
  }

  render() {
    return (
      <div
        className={this.props.className}
        ref={(node) => this.mountedRoot = node}
      />
    )
  }
}

export default ControlledGIF
