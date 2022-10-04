---
title: Applying filters
id: applying-filters
prev: sorting-and-pagination.html
next: editing-grid-data.html
---
* [Live demo](/examples/applying-filters/){:target="_blank"}
* [Code]({{ site.github }}/examples/applying-filters){:target="_blank"}

There are only a few things we need to do here: teach the grid model to work with filters, create a form and render it.

First, let's modify our model so that it can work with filters. We'll add the `filtersHandler` method to the settings
object passed to `UIKernel.Models.Grid.Collection`.


`model.js`:
{% highlight javascript %}
const model = new UIKernel.Models.Grid.Collection({
  // ...
  filtersHandler(data, filters) {
      return data.filter((record) => {
        const data = record[1];

        if (filters.search) {
          const found = (
            data.name.toLowerCase().indexOf(filters.search.toLowerCase()) >= 0 ||
            data.surname.toLowerCase().indexOf(filters.search.toLowerCase()) >= 0 ||
            data.phone.indexOf(filters.search) >= 0
          );

          if (!found) {
            return false
          }
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

Filters themselves will be defined in `MainComponent` in the next way:
 `MainComponent.js`:
 {% highlight javascript %}
 // ...
 import FiltersForm from './FiltersForm';

 const DEFAULT_FILTERS = {
   search: '',
   age: null,
   gender: 0,
 };
 // ..
  {% endhighlight %}

Init filters object in state.

`MainComponent.js`:
{% highlight javascript %}
 constructor(props) {
    super(props);
    this.state = {
      model,
      filters : DEFAULT_FILTERS
    };
  }
{% endhighlight %}


Next, we'll define the `onFiltersChange` method in our `MainComponent`.
Inside this method we'll call `setState` to update our grid model and filters.

`MainComponent.js`:
{% highlight html %}
// ...
onFiltersChange(filters) {
    this.setState({
      filters,
      model: UIKernel.applyGridFilters(model, filters)
    });
  }
{% endhighlight %}

`UIKernel.onFiltersChange` accepts a grid model and filters as arguments and returns a new state with updated filters and grid model.


Now let’s create a form with three filters: `search`, `age`, and `gender`. Here's the code for that:

`components/FiltersForm.js`:
{% highlight javascript %}
import React from 'react';
import UIKernel from 'uikernel';

class FiltersForm extends React.Component {
  updateFilter(filter, value) {
    this.props.onChange({
      ...this.props.filters,
      [filter]: value
    });
  }

  render() {
    return (
      <form className="filters-form form-horizontal">
        <div className="form-group">
          <label className="col-sm-3 control-label">Search</label>
          <div className="col-sm-9">
            <input
              type="text" // text editor
              className="form-control"
              onChange={event => this.updateFilter('search', event.target.value)}
              value={this.props.filters.search}
            />
          </div>
        </div>
        <div className="form-group">
          <label className="col-sm-3 control-label">Age</label>
          <div className="col-sm-9">
            <UIKernel.Editors.Number // number editor
              className="form-control"
              onChange={value => this.updateFilter('age', value)}
              value={this.props.filters.age}
            />
          </div>
        </div>
        <div className="form-group">
          <label className="col-sm-3 control-label">Gender</label>
          <div className="col-sm-9">
            <UIKernel.Editors.Select // select editor
              className="form-control"
              onChange={value => this.updateFilter('gender', value)}
              options={[
                [0, ''],
                [1, 'Male'],
                [2, 'Female']
              ]}
              value={this.props.filters.gender}
            />
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-offset-3 col-sm-9">
            <a href="#" className="btn btn-default" onClick={() => this.props.onClear()}>
              Clear
            </a>
          </div>
        </div>
      </form>
    );
  }
}

export default FiltersForm


{% endhighlight %}



`updateFilter` updates the value of `this.state.filters` and calls the function passed to `FiltersForm` via props.

---

Finally, let's add our form into the `render` method of `MainComponent`.

{% highlight html %}
// ...
  render() {
   {
      return (
        <div>
          <div className="panel panel-primary">
            <div className="panel-heading">
              <h3 className="panel-title">Filters</h3>
            </div>
            <div className="panel-body">
              <FiltersForm
                filters={this.state.filters}
                onChange={filters => this.onFiltersChange(filters)}
                onClear={() => this.onFiltersChange(DEFAULT_FILTERS)}
              />
            </div>
          </div>
          <div className="panel panel-info">
            <div className="panel-heading">
              <h3 className="panel-title">Records</h3>
            </div>
            <UIKernel.Grid
              model={this.state.model}
              col s={columns}
              viewCount={10}
            />
          </div>
        </div>
      );
    }
  }
{% endhighlight %}

Here, we've added some Bootstrap markup to display the form and grid beautifully.
We also need to set padding for our form. So let's open the `main.css` file and type the following:

{% highlight html %}
.filters-form {
    padding-bottom: 10px;
}
{% endhighlight %}

Now go ahead and type into the form fields and see the grid data change.
