import R from 'ramda'
import React from 'react'
import SuperGif from 'jsgif'
import shallowEqual from 'shallowequal'
import debounce from 'lodash.debounce'

const clamp = (min, max, value) => Math.min(max, Math.max(min, value))

class ControlledGIF extends React.Component {
  state = {
    frameIndex: null
  }

  constructor(props, context) {
    super(props, context)
    this.state = {
      ...this.state,
      breakpoints: props.breakpoints,
    }
  }

  componentDidMount() {
    this.virtualRoot = document.createElement('div')
    this.virtualImg = document.createElement('img')
    this.virtualImg.src = this.props.src
    this.virtualRoot.appendChild(this.virtualImg)
    this.handleResize()
    window.addEventListener('resize', this.debouncedHandleResize)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.debouncedHandleResize)
  }

  replaceSuperGif = () => {
    const maxWidth = this.maxWidth()
    this.superGif = new SuperGif({
      auto_play: false,
      gif: this.virtualImg,
      show_progress_bar: true,
      max_width: maxWidth,
      draw_while_loading: false,
    })
    this.superGif.load(this.handleLoadComplete)
    this.superGif.pause()
    this.updatePlaybackState(this.props.progress)
    this.updateCanvas()
    this.setState({ loading: true })
  }

  componentWillReceiveProps(nextProps) {
    if (!shallowEqual(nextProps.breakpoints, this.props.breakpoints)) {
      this.state.breakpoints = nextProps.breakpoints // Don't need to trigger re-render
      this.handleResize()
    }
    if (nextProps.maxWidth !== this.props.maxWidth) {
      this.handleResize()
    }
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

  maxWidth = () => {
    const viewportWidth = window.innerWidth
    const breakpointTuples = R.toPairs(this.state.breakpoints || {})
    const activeTuple =
      R.findLast(([key]) => Number(key) <= viewportWidth, breakpointTuples)

    const [_, maxWidth] = (activeTuple || [0, this.props.maxWidth])
    return maxWidth
  }

  handleLoadComplete = () => {
    this.setState({ loading: false })
    this.updatePlayback()
  }

  handleResize = () => {
    const maxWidth = this.maxWidth()
    const currentWidth = (this.superGif && this.superGif.get_canvas() || {}).width
    this.setState({ maxWidth })
    if (currentWidth !== maxWidth) {
      this.replaceSuperGif()
    }
  }

  debouncedHandleResize = debounce(this.handleResize, 100)

  updatePlaybackState(progress) {
    const clampedProgress = clamp(0, 1, progress)
    const lastFrameIndex = this.superGif.get_length() - 1
    const frameIndex = Math.round(clampedProgress * lastFrameIndex)
    this.state.frameIndex = frameIndex
    this.updatePlayback()
    this.setState({ frameIndex })
  }

  updatePlayback() {
    const frameIndex = this.state.frameIndex
    if (!R.isNil(frameIndex) &&
        !this.superGif.get_loading() &&
        frameIndex !== this.superGif.get_current_frame() &&
        !R.isNil(this.superGif.get_frame(frameIndex))
     ) {
      this.superGif.move_to(frameIndex)
    }
  }

  updateCanvas() {
    const canvas = this.superGif.get_canvas()
    if (canvas) {
      const children = this.mountedRoot.children
      R.slice(0, children.length, children).forEach((element) => {
        this.mountedRoot.removeChild(element)
      })
      this.mountedRoot.appendChild(canvas)
    }
  }

  render() {
    return (
      <div
        className={this.props.className}
        style={{ position: 'relative' }}
      >
        <div
          style={{
            visiblility: this.state.loading ? 'hidden' : undefined,
          }}
          ref={(node) => this.mountedRoot = node}
        />
        {this.props.placeholder && (
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: -1,
              maxWidth: this.state.maxWidth,
              background: `url(${this.props.placeholder})`,
              backgroundSize: 'cover',
              visiblility: this.state.loading ? undefined : 'hidden',
            }}
          />
        )}
      </div>
    )
  }
}

export default ControlledGIF
