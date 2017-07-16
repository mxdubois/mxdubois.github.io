import React from 'react'
import T from 'prop-types'
import classnames from 'classnames/bind'
import { Link } from 'react-router'

// Using CSS Modules so we assign the styles to a variable
import s from '../app/App.styl'

const cx = classnames.bind(s)

const Links = ({ items }) =>
  <ul className={cx('Links')}>
    {items.map(({ label, href, icon }) =>
      <li key={label} className={cx('Links__item')}>
        <Link className={cx('Links__item__link')} href={href} target="_blank">
          {icon &&
            <div className={cx('Links__item__icon')}>
              <i className={`ion-${icon}`} />
            </div>}
          <div className={cx('Links__item__label')}>
            {label}
          </div>
        </Link>
      </li>,
    )}
  </ul>

Links.propTypes = {
  items: T.arrayOf(
    T.shape({
      label: T.string.isRequired,
      href: T.string.isRequired,
      icon: T.string,
    }),
  ).isRequired,
}

// TODO decide if this has any value
// eslint-disable-next-line
const CurrentSummary = () =>
  <ul className={cx('About__summary')} style={{ fontSize: 14 }}>
    {[
      { label: 'Currently', value: 'Senior Frontend Developer at Clara' },
      { label: 'Side-project', value: 'YTK, an interactive web comic' },
    ].map(({ label, value }) =>
      <li className={cx('About__summary__item')}>
        <span className={cx('About__summary__item__label')}>
          {label}
        </span>
        <span className={cx('About__summary__item__value')}>
          {value}
        </span>
      </li>,
    )}
  </ul>

const aboutLinks = [
  {
    label: 'Github',
    icon: 'social-github',
    href: '//github.com/mxdubois',
  },
  {
    label: 'LinkedIn',
    icon: 'social-linkedin',
    href: '//www.linkedin.com/in/michaelxdubois/',
  },
  {
    label: 'Twitter',
    icon: 'social-twitter',
    href: '//twitter.com/michaelxdubois',
  },
  {
    label: 'Email',
    icon: 'email',
    href: 'mailto:michael@michaeldubois.me',
  },
]

const About = () =>
  <div className={cx('About')}>
    <div className={cx('About__content')}>
      <div className={cx('About__profile')}>
        <div className={cx('About__portrait')}>
          <img
            className={cx('About__portrait__img')}
            src="//s.gravatar.com/avatar/41bcae1444ce24f2b1c7dc4c85b44ada?size=580"
          />
        </div>

        <div className={cx('About__profile__details')}>
          <h1 className={cx('About__name')}>Michael DuBois</h1>
          <div className={cx('About__lead')}>Programmer + Designer</div>
        </div>
      </div>

      {
        /* TODO consider moving below text on tablet/mobile */
        <div className={cx('About__links')}>
          <Links items={aboutLinks} />
        </div>
      }

      <div className={cx('About__intro')}>
        <p>
          Over the past 10 years, I have designed and implemented UIs, lead
          frontend architecture for a 10+ team, and developed algorithms that
          empower users to make better decisions.
        </p>
      </div>
    </div>
  </div>

export default About
