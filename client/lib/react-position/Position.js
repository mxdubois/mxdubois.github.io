import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { positionContextShape } from './PositionContext';
import memoize from 'memoizee/weak';
import position from 'position';
import uuid from 'uuid'

/**
 * NOTE:
 * This is straight copied from my sideproject, YTK, for expediency.
 * This code is raw, beta, unfit for third-party use.
 */

export default class Position extends React.Component {
  static propTypes = {
    name: PropTypes.string,
    interpolate: PropTypes.func,
    children: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.node,
    ]).isRequired,
  };

  static defaultProps = {
    interpolate: () => ({}),
  }

  static contextTypes = {
    positionContext: PropTypes.shape(positionContextShape).isRequired,
  };

  state = {
    interpolatedState: {},
  };

  componentWillMount() {
    const { positionContext } = this.context;
    this.state.name = this.props.name || uuid()
    this.registerWithContext(positionContext);
  }

  componentWillReceiveProps(newProps, newContext) {
    const { positionContext } = newContext;
    this.state.name = newProps.name || uuid()
    this.registerWithContext(positionContext);
  }

  componentWillUnmount() {
    this.unregisterWithContext();
  }

  registerWithContext = (positionContext) => {
    if (!positionContext) {
      throw new Error('Position must be placed within a PositionContext');
    }

    const { register } = positionContext;

    if (register !== this._currentRegister) {
      this.unregisterWithContext();

      this._currentRegister = register;
      this._currentUnregister = register({
        name: this.state.name,
        update: this.update,
        getPosition: this.getPosition,
      });
    }
  }

  unregisterWithContext = () => {
    if (this._currentUnregister) {
      this._currentUnregister();
    }

    this._currentRegister = undefined;
    this._currentUnregister = undefined;
  }

  runInterpolateMemoized = memoize((interpolate, ownPosition, state) => {
    return interpolate({ ...state, self: ownPosition, });
  }) // limit cache size to 1, just bailing out of repeat calls

  update = (ownPosition, state) => {
    const { interpolate } = this.props;
    const interpolatedState = this.runInterpolateMemoized(
      interpolate,
      ownPosition,
      state
    );

    if (interpolatedState !== this.state.interpolatedState) {
      this.setState({ interpolatedState });
    }
  }

  getPosition = () => {
    const node = ReactDOM.findDOMNode(this);
    return node ? position(node) : {};
  }

  render = () => {
    const { interpolatedState } = this.state;
    if (typeof this.props.children === 'function') {
      const renderedChildren = this.props.children(interpolatedState);
      return renderedChildren && React.Children.only(renderedChildren);
    } else {
      return this.props.children && React.Children.only(this.props.children);
    }
  }
}
