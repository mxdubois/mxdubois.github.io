import React from 'react'
import T from 'prop-types'

import Position from '../../lib/react-position/Position'
import ControlledGIF from '../../lib/ControlledGIF'
import containerInterpolator from './containerInterpolator'

const ScrolledGIF = props => {
  const { containerKey, playheadKey } = props
  // TODO add a loading indicator on ControlledGIF?
  //   or use the looping GIF?
  //   or a fixed image?
  //   or fork libgif and add support for loading pre-parsed GIF data

  return (
    <Position
      key={`${containerKey}:${playheadKey}`}
      interpolate={containerInterpolator(containerKey, playheadKey)}
    >
      {({ progress }) =>
        <ControlledGIF
          key={`${containerKey}:${playheadKey}`}
          breakpoints={{
            0: 280,
            380: 320,
            540: 480,
            780: 640,
          }}
          placeholder={props.placeholder || props.src}
          {...props}
          progress={Math.min(1, Math.max(0, progress))}
        />}
    </Position>
  )
}

ScrolledGIF.propTypes = {
  containerKey: T.string,
  playheadKey: T.string,
  placeholder: T.string,
  src: T.string,
}

export default ScrolledGIF
