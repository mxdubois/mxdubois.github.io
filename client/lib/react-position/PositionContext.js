/* global window, document */
/* eslint-disable react/sort-comp */
import React, { PropTypes } from 'react'
import R, { compose, map, toPairs, fromPairs, equals } from 'ramda'
import position from 'position'
import memoize from 'memoizee'

/**
 * NOTE:
 * This is straight copied from my sideproject, YTK, for expediency.
 * This code is raw, beta, unfit for third-party use.
 */

const rectangleIntersect = (a, b) => {
  const horizontalIntersect =
    Math.max(a.left, b.left) <= Math.min(a.right, b.right)
  const verticalIntersect =
    Math.max(a.top, b.top) <= Math.min(a.bottom, b.bottom)
  return horizontalIntersect && verticalIntersect
}

// TODO
const consumePosition = x => x
const viewportPosition = memoize((width, height) => ({ width, height }), {
  max: 2,
})

export const positionContextShape = {
  register: PropTypes.func.isRequired,
}

// TODO consider whether this should be the mechanism by which we disable
//   updates far enough outside of the window or if we should use something else
//   to determine that.
//   Related: we may still need the position from things outside the window
//   to drive animation of things inside the window. Seems somewhat unlikely, though.
export default class PositionContext extends React.Component {
  static propTypes = {
    children: PropTypes.node,
  }

  static childContextTypes = {
    positionContext: PropTypes.shape(positionContextShape).isRequired,
  }

  state = {
    registeredOutposts: {},
    positionState: {},
  }

  positionContext = {
    register: outpost => {
      this.state.registeredOutposts = R.assoc(
        outpost.name,
        outpost,
        this.state.registeredOutposts,
      )
      return () => {
        this.state.registeredOutposts = R.dissoc(
          outpost.name,
          this.state.registeredOutposts,
        )
      }
    },
  }

  getChildContext() {
    return {
      positionContext: this.positionContext,
    }
  }

  componentDidMount() {
    this.rafId = window.requestAnimationFrame(this.onAnimationFrame)
  }

  componentWillUnmount() {
    window.cancelAnimationFrame(this.rafId)
  }

  // TODO decide if it's worth optimizing performance here
  collectPositions(windowPosition, documentPosition) {
    return compose(
      fromPairs,
      map(([name, outpost]) => {
        const positionState = consumePosition(
          outpost.getPosition(),
          windowPosition,
          documentPosition,
        )
        return [name, positionState]
      }),
      toPairs,
    )(this.state.registeredOutposts)
  }

  updateSubscribers() {
    const windowPosition = this.state.positionState.window
    const viewingZone = {
      left: windowPosition.left - 1 * windowPosition.width,
      right: windowPosition.right + 1 * windowPosition.width,
      top: windowPosition.top - 1 * windowPosition.height,
      bottom: windowPosition.bottom + 1 * windowPosition.height,
    }

    R.keys(this.state.registeredOutposts).forEach(name => {
      // Outposts can be removed by this very update function,
      // so we must check for each key that was registered
      // at the beginning of this function
      const outpost = this.state.registeredOutposts[name]
      if (outpost) {
        const outpostPosition = this.state.positionState[name]
        const isInViewZone = rectangleIntersect(viewingZone, outpostPosition)

        // TODO perhaps include a way to opt out of this performance optimization
        // TODO do we need to occassionally update things out of the view?
        if (isInViewZone) {
          // important that these objects are the same when unchanged
          // so outpost can memoize
          outpost.update(outpostPosition, this.state.positionState)
        }
      }
    })
  }

  onAnimationFrame = () => {
    const windowPosition = position(window)
    const documentPosition = position(document)

    const trackedPositions = this.collectPositions(
      windowPosition,
      documentPosition,
    )

    const consumedWindow = consumePosition(
      windowPosition,
      windowPosition,
      documentPosition,
    )

    const newPositionState = {
      window: consumedWindow,
      document: consumePosition(
        documentPosition,
        windowPosition,
        documentPosition,
      ),
      viewport: viewportPosition(consumedWindow.width, consumedWindow.height),
      ...trackedPositions,
    }

    if (!equals(this.state.positionState, newPositionState)) {
      this.state.positionState = newPositionState
    }

    this.updateSubscribers()

    this.rafId = window.requestAnimationFrame(this.onAnimationFrame)
  }

  render() {
    return this.props.children && React.Children.only(this.props.children)
  }
}
