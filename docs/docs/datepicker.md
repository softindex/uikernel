---
title: DatePicker
id: datepicker
prev: select.html
next: suggest-box.html
---

* [Live demo](/examples/datepicker/){:target="_blank"}
* [Code]({{site.github}}_site/examples/datepicker){:target="_blank"}


Create a `MainComponent.jsx` with the following contents:

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

Next, render `MainComponent`.
 
`main.jsx`:
{% highlight javascript %}
React.render(<MainComponent/>, document.body);
{% endhighlight %} 