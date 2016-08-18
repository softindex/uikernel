---
title: Select
id: select
prev: data-binding.html
next: datepicker.html
---

* [Live demo](/examples/select/){:target="_blank"}
* [Code]({{ site.github }}/examples/select){:target="_blank"}

In this example, we use `UIKernel.Editors.Select` and pass it `value`, `onChange`, `options`, and `onLabelChange` props.
You can also use [other props](editors.html#Select).

`MainComponent.jsx`:
{% highlight javascript %}
var options = [
  [null, ''], [1, 'Option 1'], [2, 'Option 2'], [3, 'Option 3'], [4, 'Option 4'], [5, 'Option 5']
];

var MainComponent = React.createClass({
  getInitialState: function () {
    return {
      value: 2,
      label: 'Option 2'
    };
  },
  handleChange: function (newValue) {
    this.setState({value: newValue});
  },
  handleLabelChange: function (newLabel) {
    this.setState({label: newLabel})
  },
  render: function () {
    return (
      <div>
        <span>Selected: {this.state.label}</span>
        <br />
        <UIKernel.Editors.Select
          onChange={this.handleChange}
          onLabelChange={this.handleLabelChange}
          value={this.state.value}
          options={options}
        />
      </div>
    );
  }
});
{% endhighlight %}

`main.js`:
{% highlight javascript %}
ReactDOM.render(<MainComponent/>, document.body);
{% endhighlight %}



