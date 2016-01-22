---
title: Applying filters
id: applying-filters
prev: sorting-and-pagination.html
next: editing-grid-data.html
---
* [Live demo](/examples/applying-filters/){:target="_blank"}
* [Code]({{ site.github }}/examples/applying-filters){:target="_blank"}

Sometimes you may wish to add filtering to your grid.
There are only a few things we need to do here: create a form, teach our model to work with filters, and render the form.

Let’s create the form first. Here's the code for that:

`FiltersForm.jsx`:
{% highlight javascript %}
var FiltersForm = (function () {
  var defaultFilters = {
    search: '',
    age: null,
    gender: 0
  };

  return React.createClass({
    getInitialState: function () {
      return {
        filters: _.clone(defaultFilters)
      }
    },
    onClear: function () {
      this.setState({filters: _.clone(defaultFilters)});
      this.props.onSubmit(defaultFilters);
    },
    updateValue: function (field, value) {
      if (value.target) {
        value = value.target.value
      }

      this.state.filters[field] = value;
      this.props.onSubmit(this.state.filters);
    },
    render() {
      return (
        <form className="filters-form row">
          <div className="col-sm-7">
            <label className="control-label">Search</label>
            <input
              type="text" // text editor
              className="form-control"
              onChange={this.updateValue.bind(null, 'search')}
              value={this.state.filters.search}
            />
          </div>
          <div className="col-sm-2">
            <label className="control-label">Age</label>
            <input
              type="number" // number editor
              className="form-control"
              onChange={this.updateValue.bind(null, 'age')}
              value={this.state.filters.age}
            />
          </div>
          <div className="col-sm-2">
            <label className="control-label">Gender</label>
            <UIKernel.Editors.Select // select editor
              className="form-control"
              onChange={this.updateValue.bind(null, 'gender')}
              options={[
                [0, ''],
                [1, 'Male'],
                [2, 'Female']
              ]}
              value={this.state.filters.gender}
            />
          </div>
          <div className="col-sm-1">
            <label className="control-label">&nbsp;</label>
            <a className="btn btn-success show" onClick={this.onClear}>
              Clear
            </a>
          </div>
        </form>
      );
    }
  });
})();
{% endhighlight %}
---
We add an object of filters to the `FiltersForm` component as its state.

In `updateValue`, we change the value of filters and call `onChangeFiltersHandler` passed to `FiltersForm` via props.
`onChangeFiltersHandler` calls `applyGridFilters`, which accepts a model and filters as parameters and returns a new model.
We'll define `onChangeFiltersHandler` in `MainComponent` a bit later.

In `onClear`, we assign filters their initial value and call the callback from  `MainComponent`.

The `render` method returns a tree of React components, but all what is interesting for us is inputs.
We pass them the `onChange` props with `updateValue` set as callbacks.

---

Next, let's define `filtersHandler` in our model.

`model.js`:
{% highlight javascript %}
var model = new UIKernel.Models.Grid.Collection({
  // ...
  filtersHandler: function(data, filters) {
        return data.filter(function (record) {
          var data = record[1];

          if (filters.search) {
            var found = (
              data.name.indexOf(filters.search) >= 0 ||
              data.surname.indexOf(filters.search) >= 0 ||
              data.phone.indexOf(filters.search) >= 0
            );
            if (!found) return false;
          }

          if (filters.gender && data.gender !== filters.gender) {
            return false;
          }

          if (filters.age && data.age !== Number(filters.age)) {
            return false;
          }

          return true;
        });
      }
});
{% endhighlight %}
---

Finally, let's add the `onChangeFiltersHandler` method to our `MainComponent` and render our form. Open your `MainComponent.jsx` file and modify it as bellow:

{% highlight html %}
// ...
onChangeFiltersHandler: function (filters) {
  this.setState({
    model: UIKernel.applyGridFilters(model, filters)
  });
},
render: function () {
  return (
    <div className="container">
      <div className="panel panel-primary">
        <div className="panel-heading">
          <h3 className="panel-title">Filters</h3>
        </div>
        <div className="panel-body">
          <FiltersForm
            onSubmit={this.onChangeFiltersHandler}
          />
        </div>
      </div>
      <div className="panel panel-info">
        <div className="panel-heading">
          <h3 className="panel-title">Records</h3>
        </div>
        <UIKernel.Grid
          model={this.state.model} // Grid model
          cols={columns} // columns configuration
          viewCount={10} // 10 records limit to display by default
        />
      </div>
    </div>
  );
}
{% endhighlight %}
---

Here, we've added some Bootstrap markup to display our form and grid beautifully.
We also need to set padding for our form. So let's open our `main.css` file and type the following:

{% highlight html %}
.filters-form {
    padding-bottom: 10px;
}
{% endhighlight %}
---

Now go ahead and type into the fields and see the grid data change.