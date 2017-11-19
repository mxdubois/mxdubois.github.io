import R from 'ramda'
import React from 'react'
import withRelativeDimensions from '../../lib/relative/withRelativeDimensions'

// TODO constrain these changes to autoscrolling sections (styles too)
const FeedImg = withRelativeDimensions()((props) => {
  const {
    className,
    src,
    containerHeight,
    viewportWidth,
    maxHeight,
    maxWidth,
  } = props

  console.log(props)

  return (
    <div className={className}>
      <img
        style={{
          maxWidth: maxWidth || '100%',
          maxHeight,
        }}
        src={src}
      />
    </div>
  )

})


export default FeedImg
