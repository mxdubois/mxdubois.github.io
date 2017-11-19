import R from 'ramda'
import React from 'react'
import T from 'prop-types'
import classnames from 'classnames/bind'

import Position from '../../lib/react-position/Position'
import withRelativeDimensions from '../../lib/relative/withRelativeDimensions'
import ScrolledGIF from './ScrolledGIF'
import FeedImg from './FeedImg'
import containerInterpolator from './containerInterpolator'

// Using CSS Modules so we assign the styles to a variable
import s from './FeedGallery.styl'

const cx = classnames.bind(s)

const FeedGalleryItem = item => {
  let itemMedia
  if (item.controlledGIF) {
    itemMedia =
      <div className={cx('FeedGallery__item__natural')}>
        <ScrolledGIF
          className={cx('FeedGallery__item__img')}
          placeholder={item.placeholder}
          src={item.imageSrc}
          sources={item.sources}
          width={640}
          containerKey={item.containerKey}
          playheadKey={`${item.containerKey}__content`}
        />
      </div>
  } else if (item.size === 'natural') {
    itemMedia =
      <FeedImg
        className={cx('FeedGallery__item__natural')}
        src={item.imageSrc}
        maxWidth={item.maxWidth}
        maxHeight={item.maxHeight}
      />
      /*
      <div className={cx('FeedGallery__item__natural')}>
        <img
          className={cx('FeedGallery__item__img')}
          src={item.imageSrc}
        />
      </div>
      */
  } else {
    itemMedia =
      <div
        className={cx('FeedGallery__item__crop')}
        style={{
          backgroundImage: `url(${item.imageSrc})`,
          backgroundSize: item.size,
        }}
      />
  }

  const itemCaption = (
    <div className={cx('FeedGallery__item__caption')}>
      <div>
        {item.caption}
      </div>
    </div>
  )

  return (
    <div
      key={item.imageSrc}
      className={cx('FeedGallery__item')}
      style={{ flexGrow: item.grow }}
    >
      {itemMedia}
      {item.showCaptions && itemCaption}
    </div>
  )
}

const FeedGallery = ({
  containerKey,
  items,
  size = 'default',
  style = 'default',
}) => {
  const hasCaptions = R.any(R.has('caption'), items)

  const interpolator =
    style === 'autoscroll'
      ? containerInterpolator(containerKey, `${containerKey}__content`)
      : () => ({ progress: 0 })

  return (
    <div
      className={cx(
        'FeedGallery',
        `FeedGallery--SIZE-${size.toUpperCase()}`,
        `FeedGallery--STYLE-${style.toUpperCase()}`,
      )}
    >
      <Position interpolate={interpolator}>
        {({ progress, galleryHeight, galleryWidth }) =>
          <div
            style={{
              display: 'flex',
              flex: '1 1 auto',
              //flexDirection: 'column',
              // Translate a layer the width of the container in the opposite
              // direction to "subtract" the container width,
              // so we only scroll to the right edge of content layer.
              transform: `translate3d(${progress * 100}%, 0, 0)`,
            }}
          >
            <div
              className={cx('FeedGallery__content')}
              style={{
                // Translate content all the way to the left.
                // See above, we'll translate the parent to the right
                // so we don't slide it all the way off screen left.
                transform: `translate3d(${-1 * progress * 100}%, 0, 0)`,
              }}
            >
              {items.map(item => (
                <FeedGalleryItem
                  key={item.imageSrc}
                  maxHeight={galleryHeight}
                  maxWidth={0.8 * galleryWidth}
                  containerKey={containerKey}
                  showCaptions={hasCaptions}
                  {...item}
                />
              ))}
            </div>
          </div>}
      </Position>
    </div>
  )
}

FeedGallery.propTypes = {
  containerKey: T.string,
  items: T.arrayOf(
    T.shape({
      imageSrc: T.string.isRequired,
      caption: T.string,
      size: T.oneOf(['contain', 'cover', 'natural']),
    }),
  ).isRequired,
  size: T.oneOf(['large', 'medium', 'default']),
  style: T.oneOf(['scroll', 'default']),
}

export default FeedGallery
