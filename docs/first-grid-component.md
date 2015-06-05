---
title: First grid component
id: first-grid-component
prev: tutorial.html
next: sorting-and-pagination.html
---

We'll create the first component named as Contact Book and display our test data.

[Live demo](/examples/first-grid-component/){:target="_blank"} and [code example]({{site.github}}_site/examples/first-grid-component){:target="_blank"} are available here.

### Main component

The main component takes several props, including the Grid model and columns.

`MainComponent.jsx`:
{% highlight javascript %}
var MainComponent = React.createClass({
  getInitialState: function () {
    return {
      model: model // let's store model in the state
    };
  },
  render: function () {
    return (
      <UIKernel.Grid
        model={this.state.model} // Grid model
        cols={columns} // columns configuration
      />
    );
  }
});
{% endhighlight %}

### Grid Model

Let's create a client model and pass it some fake data.

`model.js`:
{% highlight javascript %}
var model = new UIKernel.Models.Grid.Collection({
  data: [
    [1, {id:1, name: "Sonya", surname: "Weaver", phone: "555-0159", age: 59, gender: 1}],
    [2, {id:2, name: "Bates", surname: "Weaver", phone: "555-0144", age: 54, gender: 2}],
    [3, {id:3, name: "Rodriguez", surname: "Terrell", phone: "555-0146", age: 40, gender: 2}]
    // ...
  ]
});
{% endhighlight %}

### Columns configuration

`columns.jsx`:
{% highlight javascript %}
var columns = {
  name: {
    name: 'First Name', // columns title
    render: ['name', function (record) { // method to render a cell
      return record.name; // returns HTML. Escape ampersand result
    }]
  },
  surname: {
    name: 'Last Name',
    render: ['surname', function (record) {
      return record.surname;
    }]
  },
  phone: {
    name: 'Phone',
    render: ['phone', function (record) {
      return record.phone;
    }]
  },
  age: {
    name: 'Age',
    render: ['age', function (record) {
      return record.age;
    }]
  },
  gender: {
    name: 'Gender',
    render: ['gender', function (record) {
      switch (record.gender) {
        case 1: return 'Male';
        case 2: return 'Female';
        default: return 'Undefined';
      }
    }]
  }
};
{% endhighlight %}

### Main file

Render the main component.

`main.jsx`:
{% highlight javascript %}
React.render(<MainComponent/>, document.body);
{% endhighlight %}
