import React from 'react'
import classnames from 'classnames/bind'

import s from '../app/App.styl'
import logo from './react-logo.png'

const cx = classnames.bind(s)

const Home = () =>
  <div className={cx('page')}>
    <div className={cx('siteTitle')}>
      <img src={logo} alt="React Logo" />
      <h1>React Static Boilerplate</h1>
    </div>
    <p>Why React static?</p>
    <ul>
      <li>
        <span className={cx('hl')}>Dev</span> friendly
      </li>
      <li>
        <span className={cx('hl')}>User</span> friendly
      </li>
      <li>
        <span className={cx('hl')}>SEO</span> friendly
      </li>
    </ul>
  </div>

export default Home
