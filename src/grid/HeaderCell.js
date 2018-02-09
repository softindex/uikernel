import React from 'react';

const HeaderCell = React.createClass({
  propTypes: () => ({
    col: React.PropTypes.object,
    header: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.element
    ]),
    onClick: React.PropTypes.func
  }),

  handleClick(event) {
    const {col} = this.props;

    if (col.sort) {
      this.props.onClick(col.field);
      return;
    }

    const $target = $(event.target);
    const $refParent = $target.parents('[ref]');
    const ref = $refParent.attr('ref') || event.target.getAttribute('ref');
    let handler;

    if (ref && col.onClickRefs) {
      handler = col.onClickRefs[ref];
      if (handler) {
        return handler(event, this);
      }
    }

    if (col.onClick) {
      col.onClick(event, this);
    }
  },

  render() {
    const {header, col} = this.props;
    const props = {
      className: col.className,
      colSpan: col.cols,
      rowSpan: col.rows,
      onClick: this.handleClick
    };

    if (typeof header === 'string') {
      return <th {...props} dangerouslySetInnerHTML={{__html: header}}/>;
    }

    return <th {...props}>{header}</th>;
  }
});

export default HeaderCell;
