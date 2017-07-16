import React from 'react'
import T from 'prop-types'
import classnames from 'classnames/bind'

// Using CSS Modules so we assign the styles to a variable
import s from '../app/App.styl'

const cx = classnames.bind(s)

const FeedSection = ({ title, primaryColor, secondaryColor, subtitle, tldr }) =>
  <section
    className={cx('FeedSection')}
    style={{
      background: primaryColor,
      color: secondaryColor,
    }}
  >
    <header>
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
  </section>

FeedSection.propTypes = {
  title: T.string.isRequired,
  primaryColor: T.string.isRequired,
  secondaryColor: T.string.isRequired,
  subtitle: T.string,
  tldr: T.string,
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
        'Lead frontend architecture with react, redux and rxjs. Vetted the frontend team. Developed loan recommendation algorithms.',
    },
  },
  {
    key: 'agrisaurus',
    component: FeedSection,
    props: {
      primaryColor: 'blue',
      secondaryColor: 'white',
      subtitle: 'Gardening best practices, accessible to everyone',
      tldr:
        'Designed the UI, implemented features in Backbone.js, and developed plant-packing algorithms to maximum yield/sqft.',
    },
  },
  {
    key: 'ytk',
    component: FeedSection,
    props: {
      primaryColor: 'yellow',
      secondaryColor: 'red',
      subtitle: 'An interactive web comic, set in the Star Wars universe',
      tldr:
        'Adapted finished art into an interactive web comic, with animations driven by scrolling.',
    },
  },
  {
    key: 'farmscape',
    component: FeedSection,
    props: {
      primaryColor: 'green',
      secondaryColor: 'white',
      subtitle: 'The largest urban farming venture in the US',
      tldr:
        'Designed the original brand and developed multiple iterations of the website.',
    },
  },
  {
    key: 'artwork',
    component: FeedSection,
    props: {
      primaryColor: 'white',
      secondaryColor: 'black',
      subtitle: 'Artwork from my spare time',
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
