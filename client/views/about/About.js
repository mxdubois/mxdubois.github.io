import React from 'react'
import classnames from 'classnames/bind'

// Using CSS Modules so we assign the styles to a variable
import s from '../app/App.styl'

const cx = classnames.bind(s)

const About = () =>
  <div className={cx('page')}>
    <div className={cx('siteTitle')}>
      <h1>About Page</h1>
    </div>
    <p>Welcome to the about page...</p>
  </div>

export default About
