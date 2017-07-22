import R from 'ramda'
import React from 'react'
import T from 'prop-types'
import classnames from 'classnames/bind'

import madhoofAndWharvus from './MadhoofAndWharvus.png'
import stampedPortrait from './StampPortrait.png'
import artworkYugioh from './artworkYugioh.jpg'

// import agrisaurusTimelineAnimation from './agrisaurusTimelineAnimation.gif'
import agrisaurusLightboxAnimation from './agrisuarusLightboxAnimation.gif'
import agrisaurusClustering from './agrisaurusClustering.png'

import farmscapeInstall from './farmscapeInstall.png'
import farmscapeHomepage from './farmscapeHomepage.jpg'

import ytkBloodOrb from './ytkBloodOrb_smooth.gif'

import claraBestMatchLoan from './claraBestMatchLoan__once.gif'

// Using CSS Modules so we assign the styles to a variable
import s from '../app/App.styl'

const cx = classnames.bind(s)

// TODO
//
// MVP
// [X] Add Clara gallery items -- affordability, impersonation?, experimental pickers?
// [ ] define routes for static gen / SEO
// [ ] refine links - position, responsiveness, style
// [ ] deploy staging -- either github or madhoof
// [ ] copy revisions
// [ ] deploy production
//
// Bonus
// [ ] try horizontal arrangement of heading + tldrs
// [ ] gallery: carousel or vertical stack on mobile
// [ ] sticky links on mobile
// [ ] red email circle CTA?
// [ ] bullet pts in tldr?
// [ ] scroll-powered carousel for artwork
// [ ] scroll-powered GIFs
// [ ] SEO / social media optimization?

const FeedGallery = ({ items, size = 'default', style = 'default' }) => {
  const hasCaptions = R.any(R.has('caption'), items)

  return (
    <div
      className={cx(
        'FeedGallery',
        `FeedGallery--SIZE-${size.toUpperCase()}`,
        `FeedGallery--STYLE-${style.toUpperCase()}`,
      )}
    >
      <div className={cx('FeedGallery__content')}>
        {items.map(item =>
          <div
            key={item.imageSrc}
            className={cx('FeedGallery__item')}
            style={{ flexGrow: item.grow }}
          >
            {item.size === 'natural'
              ? <div className={cx('FeedGallery__item__natural')}>
                  <img
                    className={cx('FeedGallery__item__img')}
                    src={item.imageSrc}
                  />
                </div>
              : <div
                  className={cx('FeedGallery__item__crop')}
                  style={{
                    backgroundImage: `url(${item.imageSrc})`,
                    backgroundSize: item.size,
                  }}
                />}
            {hasCaptions &&
              <div className={cx('FeedGallery__item__caption')}>
                <div>
                  {item.caption}
                </div>
              </div>}
          </div>,
        )}
      </div>
    </div>
  )
}

FeedGallery.propTypes = {
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
      <FeedGallery
        size={gallerySize}
        style={galleryStyle}
        items={featuredItems}
      />}
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

const sections = [
  {
    key: 'clara',
    component: FeedSection,
    props: {
      primaryColor: 'black',
      secondaryColor: 'white',
      subtitle: 'An intuitive home mortgage experience',
      tldr:
        'Developing loan recommendation algorithms. Lead frontend re-architecture with react, redux and rxjs. Established an enjoyable frontend interview process.',
      gallerySize: 'medium',
      featuredItems: [
        {
          imageSrc: claraBestMatchLoan,
          size: 'natural',
        },
      ],
    },
  },
  {
    key: 'agrisaurus',
    component: FeedSection,
    props: {
      primaryColor: '#3c9ae4', // '#5396c8', // 'blue',
      secondaryColor: 'white',
      subtitle: 'Gardening best practices, accessible to everyone',
      tldr:
        'Designed the UI, implemented features in Backbone.js, and developed plant-packing algorithms to maximum yield/sqft.',
      gallerySize: 'medium',
      featuredItems: [
        {
          imageSrc: agrisaurusLightboxAnimation,
          size: 'natural',
        },
        {
          imageSrc: agrisaurusClustering,
          size: 'natural',
        },
      ],
    },
  },
  {
    key: 'ytk',
    component: FeedSection,
    props: {
      primaryColor: '#fffb77', // 'yellow',
      secondaryColor: '#ff3535', // 'red',
      subtitle: 'An interactive web comic, set in the Star Wars universe',
      tldr:
        'Adapted finished art into an interactive web comic, with animations driven by scrolling.',
      gallerySize: 'medium',
      featuredItems: [
        {
          imageSrc: ytkBloodOrb,
          size: 'natural',
        },
      ],
    },
  },
  {
    key: 'farmscape',
    component: FeedSection,
    props: {
      primaryColor: '#227a3c', // 'green',
      secondaryColor: 'white',
      subtitle: 'The largest urban farming venture in the US',
      tldr:
        'Designed the original brand and developed multiple iterations of the website.',
      gallerySize: 'medium',
      featuredItems: [
        {
          imageSrc: farmscapeHomepage,
          grow: 2,
          size: 'natural',
        },
        {
          imageSrc: farmscapeInstall,
          size: 'natural',
        },
      ],
    },
  },
  {
    key: 'artwork',
    component: FeedSection,
    props: {
      primaryColor: 'white',
      secondaryColor: 'black',
      size: 'fullscreen',
      gallerySize: 'large',
      galleryStyle: 'scroll',
      featuredItems: [
        {
          imageSrc: madhoofAndWharvus,
          caption: 'Concept art for a comics project',
          size: 'natural',
        },
        {
          imageSrc: stampedPortrait,
          caption: 'Stamped self-portrait',
          size: 'natural',
        },
        {
          imageSrc: artworkYugioh,
          caption:
            "First photoshop project (2003), for a friend's RPG Maker game.",
          size: 'natural',
        },
      ],
    },
  },
]

const Feed = props => {
  const { main, aside } = props
  console.log(props)

  return (
    <div className={cx('Feed')}>
      <main className={cx('Feed__main')}>
        {sections.map(section => {
          const Component = section.component
          return (
            <Component
              key={section.key}
              title={section.key}
              {...section.props}
            />
          )
        })}
      </main>
      {aside &&
        <aside className={cx('Feed__aside')}>
          <div className={cx('Feed__aside__content')}>
            {aside}
          </div>
        </aside>}
    </div>
  )
}

Feed.propTypes = {
  aside: T.node,
  main: T.node.isRequired,
}

export default Feed
