import React from 'react'
import T from 'prop-types'
import classnames from 'classnames/bind'

import ScrollableFeedSection from './ScrollableFeedSection'
import sections from './feedSections'

// Using CSS Modules so we assign the styles to a variable
import s from '../app/App.styl'

const cx = classnames.bind(s)

// TODO Potential non-essential improvements:
// [ ] try horizontal arrangement of heading + tldrs
// [ ] gallery: carousel or vertical stack on mobile
// [ ] sticky links on mobile
// [ ] red email circle CTA?
// [ ] bullet pts in tldr?
// [ ] SEO / social media optimization?

const Feed = props => {
  const { main, aside } = props

  return (
    <div className={cx('Feed')}>
      <main className={cx('Feed__main')}>
        {sections.map(section => {
          const Component = section.component || ScrollableFeedSection
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
