import R from 'ramda'
import React from 'react'
import T from 'prop-types'
import classnames from 'classnames/bind'
import { Sticky, StickyContainer } from 'react-sticky'

import Position from '../../lib/react-position/Position'
import ControlledGIF from '../../lib/ControlledGIF'
import ControlledVideo from '../../lib/ControlledVideo'

import madhoofAndWharvus from './MadhoofAndWharvus.png'
import stampedPortrait from './StampPortrait.png'
import artworkYugioh from './artworkYugioh.jpg'

// import agrisaurusTimelineAnimation from './agrisaurusTimelineAnimation.gif'
import agrisaurusLightboxAnimation from './agrisuarusLightboxAnimation.gif'
import agrisaurusClustering from './agrisaurusClustering.png'

import farmscapeInstall from './farmscapeInstall.png'
import farmscapeHomepage from './farmscapeHomepage.jpg'

import ytkBloodOrb from './ytkBloodOrb_smooth_short_small.gif'

import claraBestMatchLoan from './claraBestMatchLoan__once.gif'

// Using CSS Modules so we assign the styles to a variable
import s from '../app/App.styl'

const cx = classnames.bind(s)

const containerInterpolator = R.memoize((containerKey, playheadKey) => {
 return (positions) => {
    const container = positions[containerKey]
    const playhead = positions[playheadKey] || positions.window

    let start
    let end
    if (container && playhead) {
      start = container.top
      end = container.bottom - playhead.height
    } else {
      const self = positions.self
      const viewport = positions.viewport
      start = self.top - viewport.height
      end = self.top // self.bottom
    }

    return {
      progress: (playhead.top - start) / (end - start),
    }
  }
})

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

const ScrolledGIF = (props) => {
  const {
    containerKey,
    playheadKey
  } = props
  // TODO add a loading indicator on ControlledGIF?
  //   or use the looping GIF?
  //   or a fixed image?
  //   or fork libgif and add support for loading pre-parsed GIF data

  return (
    <Position
      key={`${containerKey}:${playheadKey}`}
      interpolate={containerInterpolator(containerKey, playheadKey)}
    >{({ progress }) => (
      !!props.sources ? (
        <ControlledVideo
          key={`${containerKey}:${playheadKey}`}
          {...props}
          progress={Math.min(1, Math.max(0, progress))}
        />
      ) : (
        <ControlledGIF
          key={`${containerKey}:${playheadKey}`}
          breakpoints={{
            0: 280,
            380: 320,
            540: 480,
            780: 640,
          }}
          placeholder={props.src}
          {...props}
          progress={Math.min(1, Math.max(0, progress))}
        />
      )
    )}</Position>
  )
}

const ScrollingSection = ({
  positionKey,
  viewports,
  background,
  children,
}) => {
  return (
    <Position name={positionKey}>
      <StickyContainer
        style={{
          height: `${viewports * 100}vh`,
          background: background,
        }}>
        <Sticky>
          {({ style }) => (
            <Position name={`${positionKey}__content`}>
              <div style={style}>{children}</div>
            </Position>
          )}
        </Sticky>
      </StickyContainer>
    </Position>
  )
}

const FeedGalleryItem = (item) => {
  const itemMedia = item.size === 'natural' ? (
    <div className={cx('FeedGallery__item__natural')}>
      {
        item.controlledGIF ? (
          <ScrolledGIF
            className={cx('FeedGallery__item__img')}
            src={item.imageSrc}
            sources={item.sources}
            width={640}
            containerKey={item.containerKey}
            playheadKey={`${item.containerKey}__content`}
          />
        ) : (
          <img
            className={cx('FeedGallery__item__img')}
            src={item.imageSrc}
          />
        )
      }
    </div>
  ) : (
    <div
      className={cx('FeedGallery__item__crop')}
      style={{
        backgroundImage: `url(${item.imageSrc})`,
        backgroundSize: item.size,
      }}
    />
  )

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


const FeedGallery = ({ containerKey, items, size = 'default', style = 'default' }) => {
  const hasCaptions = R.any(R.has('caption'), items)

  const renderedItems = items.map(item =>
    <FeedGalleryItem
      key={item.imageSrc}
      containerKey={containerKey}
      showCaptions={hasCaptions}
      {...item}
    />
   )

  const interpolator = style === 'autoscroll' ?
    containerInterpolator(containerKey, `${containerKey}__content`) : () => ({ progress: 0 })

  return (
    <div
      className={cx(
        'FeedGallery',
        `FeedGallery--SIZE-${size.toUpperCase()}`,
        `FeedGallery--STYLE-${style.toUpperCase()}`,
      )}
    >
      <Position
        interpolate={interpolator}
      >
        {({ progress }) => (
          <div
            style={{
              display: 'flex',
              flex: '1 1 0',
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
              {renderedItems}
            </div>
          </div>
        )}
      </Position>
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
        containerKey={title}
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

const ScrollableFeedSection = ({ viewports, ...rest }) => {
  return !R.isNil(viewports) ? (
    <ScrollingSection
      positionKey={rest.title}
      background={rest.primaryColor}
      viewports={viewports}
    >
      <FeedSection size="fullscreen" {...rest} />
    </ScrollingSection>
  ) : <FeedSection {...rest} />
}

const featuredArtwork = [
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
]

const sections = [
  {
    key: 'clara',
    component: ScrollableFeedSection,
    props: {
      primaryColor: 'black',
      secondaryColor: 'white',
      subtitle: 'An intuitive home mortgage experience',
      tldr:
        'Established frontend architecture with react, redux and rxjs. Vetted the frontend team. Developing loan recommendation algorithms.',
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
    component: ScrollableFeedSection,
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
    component: ScrollableFeedSection,
    props: {
      primaryColor: '#fffb77', // 'yellow',
      secondaryColor: '#ff3535', // 'red',
      subtitle: 'An interactive web comic, set in the Star Wars universe',
      tldr:
        'Adapted finished art into an interactive web comic, with animations driven by scrolling.',
      gallerySize: 'medium',
      viewports: 2,
      featuredItems: [
        {
          imageSrc: ytkBloodOrb,
          size: 'natural',
          controlledGIF: true,
        },
      ],
    },
  },
  {
    key: 'farmscape',
    component: ScrollableFeedSection,
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
    component: ScrollableFeedSection,
    props: {
      primaryColor: 'white',
      secondaryColor: 'black',
      size: 'fullscreen',
      gallerySize: 'large',
      galleryStyle: 'autoscroll',
      viewports: featuredArtwork.length * .8,
      featuredItems: featuredArtwork,
    },
  },
]

const Feed = props => {
  const { main, aside } = props

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
