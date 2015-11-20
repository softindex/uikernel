---
title: Applying filters
id: applying-filters
prev: sorting-and-pagination.html
next: editing-grid-data.html
---

Sometimes you may wish to add filtering to your grid. There are only a few things we need to do here: create the form, define a filter handler in our model, and render the form.

* [Live demo](/examples/applying-filters/){:target="_blank"}
* [Code]({{site.github}}_site/examples/applying-filters){:target="_blank"}

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

In `updateValue()`, we change the value of filters and call `onSubmit()`, which is passed to `FiltersForm` through a prop and has `applyFilters()` set as a callback.

In `onClear()`, we assign filters their initial value and call `onSubmit()`.

The `render()` method returns a tree of React components, but all what is interesting for us is inputs. We pass them `onChange` props with `updateValue()` set as callbacks.

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

Finally, let's render our form in `MainComponent`. Above the code for the grid, type the following:

`MainComponent.jsx`:
{% highlight html %}
<FiltersForm onSubmit={this.applyFilters} />
{% endhighlight %}
---

Now go ahead and type into your filter box and see the grid data change.