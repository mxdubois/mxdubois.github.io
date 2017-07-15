import React from 'react'
import classnames from 'classnames/bind'

// Using CSS Modules so we assign the styles to a variable
import s from '../app/App.styl'

const cx = classnames.bind(s)

const NotFound = () =>
  <div className={cx('page')}>
    <h4>Not found</h4>
  </div>

export default NotFound
