---
title: DatePicker
id: datepicker
prev: select.html
next: suggest-box.html
---

* [Live demo](/examples/datepicker/){:target="_blank"}
* [Code]({{ site.github }}/examples/datepicker){:target="_blank"}

In this example, we use `UIKernel.Editors.DatePicker` to create a date picker.
`value` and `onChange` props are required, other props are optional.
To define a value format, we pass `format` prop.
To define a displayed value format, we pass `textFormat` prop.
`min` prop is used to define the minimum date.
`max` prop is used to define the maximum date.

You can also use [other props](editors.html#DatePicker).

`MainComponent.js`
{% highlight javascript %}
var MainComponent = React.createClass({
  getInitialState: function () {
    return {
      date: '2003-05-01'
    };
  },
  handleChanges: function (newDate) {
    this.setState({date: newDate});
  },
  render: function () {
    return (
      <div className="container">
        <span>Date: {this.state.date}</span>
        <br/>
        <UIKernel.Editors.DatePicker
          ref="datepicker"
          format="yy-mm-dd" // inner field value format
          textFormat="DD, d MM, yy" // displayed field value format
          onChange={this.handleChanges} // value change handler
          min="2003-01-01" // minimum date value
          max="2003-12-31" // maximum date value
          value={this.state.date} // field value
          />
      </div>
    );
  }
});
{% endhighlight %}

`main.js`:
{% highlight javascript %}
React.render(<MainComponent/>, document.body);
{% endhighlight %}