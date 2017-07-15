import React from 'react';
import T from 'prop-types';
import { Link, IndexLink } from 'react-router';
import classnames from 'classnames/bind';

// Using CSS Modules so we assign the styles to a variable
import s from './App.styl';
const cx = classnames.bind(s);

/**
 * NOTE: As of 2015-11-09 react-transform does not support a functional
 * component as the base compoenent that's passed to ReactDOM.render, so we
 * still use createClass here.
 */
export default class App extends React.Component {
  static propTypes = {
    children: T.node,
  };

  render() {
    return (
      <div className={cx('App')}>
        <nav className={cx('nav')}>
          <IndexLink to='/' activeClassName={cx('active')}>Home</IndexLink>
          <Link to='/about' activeClassName={cx('active')}>About</Link>
        </nav>
        {this.props.children}
      </div>
    );
  }
}
