import R from 'ramda'
import React from 'react'
import SuperGif from 'jsgif'
import shallowEqual from 'shallowequal'

const clamp = (min, max, value) => Math.min(max, Math.max(min, value))

class ControlledVideo extends React.Component {
  state = {}

  componentDidMount() {
    this.rafId = window.requestAnimationFrame(this.handleAnimationFrame)
  }

  handleAnimationFrame = () => {
    this.updatePlaybackState(this.props.progress)
    this.rafId = window.requestAnimationFrame(this.handleAnimationFrame)
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

  updatePlaybackState(progress) {
    if (!R.isNil(this.videoNode)) {
      const clampedProgress = clamp(0, 1, progress)
      const currentTime = Math.round(clampedProgress * this.videoNode.duration) || 0
      this.videoNode.currentTime = currentTime
      if (this.videoNode.paused) {
        try {
          this.videoNode.play()
        } catch (e) {
          console.error(e)
        }
      }
      //this.setState({ currentTime })
    }
  }

  updatePlayback() {
    //if (!R.isNil(this.state.currentTime) && !R.isNil(this.videoNode)) {
      //this.videoNode.play()
      //this.videoNode.currentTime = this.state.currentTime
    //}
  }

  render() {
    return (
      <div
        className={this.props.className}
      >
        <video
          ref={(node) => { this.videoNode = node}}
          width={this.props.width}
          height={this.props.width}
          preload
        >
          {this.props.sources.map(({ src, type }) => (
            <source
              src={src}
              type={type}
            />
          ))}
        </video>
      </div>
    )
  }
}

export default ControlledVideo
