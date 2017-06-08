---
title: Select
id: select
prev: data-binding.html
next: datepicker.html
---

* [Live demo](/examples/select/){:target="_blank"}
* [Code]({{ site.github }}/examples/select){:target="_blank"}

In this example, we use `UIKernel.Editors.Select` and pass it the `value`, `onChange`, `options`, 
and `onLabelChange` props. You can also use [other props](editors.html#Select).

`MainComponent.jsx`:
{% highlight javascript %}
class MainComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 2,
      label: 'Option 2'
    };
    this.options = [
      [null, ''], [1, 'Option 1'], [2, 'Option 2'], [3, 'Option 3'], [4, 'Option 4'], [5, 'Option 5']
    ];
    this.handleChange = this.handleChange.bind(this);
    this.handleLabelChange = this.handleLabelChange.bind(this);
  }

  handleChange(newValue) {
    this.setState({value: newValue});
  }

  handleLabelChange(newLabel) {
    this.setState({label: newLabel})
  }

  render() {
    return (
      <div className="container">
        <span>Selected: {this.state.label}</span>
        <br/>
        <UIKernel.Editors.Select
          ref="select"
          onChange={this.handleChange}
          onLabelChange={this.handleLabelChange}
          value={this.state.value}
          options={this.options}
        />
      </div>
    );
  }
}
{% endhighlight %}

`main.js`:
{% highlight javascript %}
ReactDOM.render(<MainComponent/>, document.body);
{% endhighlight %}



