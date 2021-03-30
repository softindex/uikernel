import React from 'react';
import {isEqual, omit} from '../common/utils';
import Component from './Component';

class DeprecatedComponents extends React.Component {
  constructor(props) {
    super(props);
    if (props.hasOwnProperty('cols')) {
      console.warn('Prop "cols" deprecated. Use "columns" insted');
      this._cols = props.cols;
    } else {
      this._cols = props.columns;
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.hasOwnProperty('cols')) {
      console.warn('Prop "cols" deprecated. Use "columns" insted');
      if (!isEqual(this.props.cols, nextProps.cols)) {
        this._cols = nextProps.cols;
      }
    } else {
      this._cols = nextProps.columns;
    }
  }

  render() {
    const {forwardedRef} = this.props;
    const props = omit(this.props, ['forwardedRef', 'cols', 'columns']);

    return <Component {...props} ref={forwardedRef} cols={this._cols} />;
  }
}

export default React.forwardRef((props, ref) => {
  return <DeprecatedComponents {...props} forwardedRef={ref} />;
});
