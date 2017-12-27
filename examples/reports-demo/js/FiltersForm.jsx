/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

var FiltersForm = React.createClass({
  mixins: [UIKernel.Mixins.Form],
  componentWillMount: function () {
    this.initForm({
      model: new UIKernel.Models.Form(this.props.filters),
      autoSubmit: true,
      autoSubmitHandler: function (err, data) {
        this.props.onSubmit(data);
      }.bind(this)
    });
  },
  render: function () {
    if (!this.isLoaded()) {
      return <span>Loading...</span>;
    }

    var data = this.getData();
    return (
      <form className="filters-form row">
        {data.hasOwnProperty('date') ?
          <DateRangeEditor
            onChange={this.updateField.bind(null, 'date')}
            value={data.date}
          />
        : null}
      </form>
    );
  }
});