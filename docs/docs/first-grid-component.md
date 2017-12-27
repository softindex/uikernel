---
title: First grid component
id: first-grid-component
prev: tutorial.html
next: sorting-and-pagination.html
---

* [Live demo](/examples/first-grid-component/){:target="_blank"}
* [Code]({{ site.github }}examples/first-grid-component){:target="_blank"}


First, let's create a client model for our grid and pass it some fake data.

`model.js`:
{% highlight javascript %}
const model = new UIKernel.Models.Grid.Collection({
  data: [
    [1, {id:1, name: "Sonya", surname: "Weaver", phone: "555-0159", age: 59, gender: 2}],
    [2, {id:2, name: "Bates", surname: "Weaver", phone: "555-0144", age: 54, gender: 2}],
    [3, {id:3, name: "Rodriguez", surname: "Terrell", phone: "555-0146", age: 40, gender: 1}]
    // ...
  ]
});
{% endhighlight %}

Here, we've used [UIKernel.Models.Grid.Collection](/docs/grid-model-collection.html) and passed it a settings object as an argument.

>If you want a grid to use [server](/docs/server-side.html) data, apply [UIKernel.Models.Grid.Xhr](/docs/grid-model-xhr.html):
>
>{% highlight javascript %}
const model = new UIKernel.Models.Grid.Xhr({
    api: 'https://example.com/api/users', // Your Grid API
});
{% endhighlight %}

Next, we'll configure columns.

`columns.js`:
{% highlight javascript %}
const columns = {
  name: {
    name: 'First Name', // column title
    render: ['name', record => _.escape(record.name)] // method for rendering of table cells
  },
  surname: {
    name: 'Last Name',
    render: ['surname', record => _.escape(record.surname)]
  },
  phone: {
    name: 'Phone',
    render: ['phone', record => _.escape(record.phone)]
  },
  age: {
    name: 'Age',
    render: ['age', record => record.age]
  },
  gender: {
    name: 'Gender',
    render: ['gender', (record) => {
      switch (record.gender) {
        case 1:
          return 'Male';
        case 2:
          return 'Female';
        default:
          return 'Undefined';
      }
    }]
  }
};
{% endhighlight %}

`columns`is an object with string IDs as properties and configuration objects as their values.
We've passed our configuration objects only two props: `name` and `render`. There are also other props.
You can read about them [here](/docs/grid-columns.html).

Now we need to render our grid. Let's do it in the `render` method of another component named `MainComponent`.

`MainComponent.js`:
{% highlight javascript %}
class MainComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {model};
  }

  render() {
    return (
      <div>
        <UIKernel.Grid
          model={this.state.model} // Grid model
          cols={columns} // columns configuration
        />
      </div>
    );
  }
}
{% endhighlight %}

Finally, let's render `MainComponent` in a separate file.

`main.js`:
{% highlight javascript %}
ReactDOM.render(<MainComponent/>, document.getElementById('example'));
{% endhighlight %}
