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
class MainComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: '2003-05-01'
    };
    this.handleChanges = this.handleChanges.bind(this);
  }

  handleChanges(newDate) {
    this.setState({date: newDate});
  }

  render() {
    return (
      <div className="container">
        <span>Date: {this.state.date}</span>
        <br/>
        <UIKernel.Editors.DatePicker
          ref={(datepicker) => this.datepicker = datepicker}
          format="YYYY-MM-DD"
          textFormat="dddd, MMMM Do YYYY"
          onChange={this.handleChanges}
          min="2003-01-01"
          max="2003-12-31"
          value={this.state.date}
        />
      </div>
    );
  }
}
{% endhighlight %}

`main.js`:
{% highlight javascript %}
React.render(<MainComponent/>, document.body);
{% endhighlight %}