import React from 'react'
import T from 'prop-types'
import classnames from 'classnames/bind'

import FeedGallery from './FeedGallery'

// Using CSS Modules so we assign the styles to a variable
import s from '../app/App.styl'

const cx = classnames.bind(s)

const FeedSection = ({
  title,
  primaryColor,
  secondaryColor,
  subtitle,
  tldr,
  featuredItems,
  gallerySize,
  galleryStyle,
  size = 'default',
}) =>
  <section
    className={cx('FeedSection', `FeedSection--SIZE-${size.toUpperCase()}`)}
    style={{
      background: primaryColor,
      color: secondaryColor,
    }}
  >
    <header className={cx('FeedSection__header')}>
      <h1 className={cx('FeedSection__heading')}>
        {title}
      </h1>
      {subtitle &&
        <p
          className={cx('FeedSection__subheading')}
          style={{
            color: secondaryColor,
            fontSize: 22,
            lineHeight: '24px',
            letterSpacing: '.05ex',
            fontWeight: 300,
          }}
        >
          {subtitle}
        </p>}
      {tldr &&
        <p
          className={cx('FeedSection__tldr')}
          style={{
            color: secondaryColor,
            fontSize: 16,
            lineHeight: '24px',
            opacity: 0.87,
          }}
        >
          {tldr}
        </p>}
    </header>
    {featuredItems &&
      <div className={cx('FeedSection__gallery')}>
        <FeedGallery
          containerKey={title}
          size={gallerySize}
          style={galleryStyle}
          items={featuredItems}
        />
      </div>}
  </section>

FeedSection.propTypes = {
  title: T.string.isRequired,
  primaryColor: T.string.isRequired,
  secondaryColor: T.string.isRequired,
  subtitle: T.string,
  tldr: T.string,
  featuredItems: FeedGallery.propTypes.items,
  size: T.oneOf(['fullscreen', 'default']),
  gallerySize: FeedGallery.propTypes.size,
  galleryStyle: FeedGallery.propTypes.style,
}

export default FeedSection
