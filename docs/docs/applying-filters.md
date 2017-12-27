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
object passed to `UIKernel.Models.Grid.Collection`. This method will filter our data by name, surname, phone, gender, 
and age.

`model.js`:
{% highlight javascript %}
const model = new UIKernel.Models.Grid.Collection({
  // ...
  filtersHandler: function (data, filters) {
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

Next, we'll define the `applyFilters` method in our `MainComponent`. 
Inside this method we'll call `setState` to update our grid model. 

`MainComponent.js`:
{% highlight html %}
// ...
applyFilters(filters) {
    this.setState({
      model: UIKernel.applyGridFilters(model, filters)
    });
  }
{% endhighlight %}

`UIKernel.applyGridFilters` accepts a grid model and filters as arguments and returns a new grid model.


Now let’s create a form with three filters: `search`, `age`, and `gender`. Here's the code for that:

`FiltersForm.js`:
{% highlight javascript %}
class FiltersForm extends React.Component {
  constructor(props) {
    super(props);
    this.defaultFilters = {
      search: '',
      age: null,
      gender: 1
    };
    this.state = {
      filters: {...this.defaultFilters}
    };
    this.clearFilters = this.clearFilters.bind(this);
    this.updateFilter = this.updateFilter.bind(this);
  }

  clearFilters() {
    this.setState({filters: {...this.defaultFilters}});
    this.props.onSubmit(this.defaultFilters);
  }

  updateFilter(filter, value) {
    const filters = {...this.state.filters};
    filters[filter] = value.target ? value.target.value : value;

    this.setState({filters}, () => this.props.onSubmit(filters));
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
              onChange={this.updateFilter.bind(null, 'search')}
              value={this.state.filters.search}
            />
          </div>
        </div>
        <div className="form-group">
          <label className="col-sm-3 control-label">Age</label>
          <div className="col-sm-9">
            <input
              type="number" // number editor
              className="form-control"
              onChange={this.updateFilter.bind(null, 'age')}
              value={this.state.filters.age}
            />
          </div>
        </div>
        <div className="form-group">
          <label className="col-sm-3 control-label">Gender</label>
          <div className="col-sm-9">
            <UIKernel.Editors.Select // select editor
              className="form-control"
              onChange={this.updateFilter.bind(null, 'gender')}
              options={[
                [0, ''],
                [1, 'Male'],
                [2, 'Female']
              ]}
              value={this.state.filters.gender}
            />
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-offset-3 col-sm-9">
            <a className="btn btn-success" onClick={this.clearFilters}>
              Clear
            </a>
          </div>
        </div>
      </form>
    );
  }
}
{% endhighlight %}

Inside the constructor we've initialized our state variable `filters` and bound the `updateFilter` and  `clearFilters` methods.

`updateFilter` updates the value of `this.state.filters` and calls the function passed to `FiltersForm` via props.

`clearFilters` assigns `this.state.filters` its initial value and calls `this.props.onSubmit`.

---

Finally, let's add our form into the `render` method of `MainComponent`. 

{% highlight html %}
// ...
  render() {
    return (
      <div>
        <div className="panel panel-primary">
          <div className="panel-heading">
            <h3 className="panel-title">Filters</h3>
          </div>
          <div className="panel-body">
            <FiltersForm onSubmit={this.applyFilters}/>
          </div>
        </div>
        <div className="panel panel-info">
          <div className="panel-heading">
            <h3 className="panel-title">Records</h3>
          </div>
          <UIKernel.Grid
            model={this.state.model} // Grid model
            cols={columns} // columns configuration
            viewCount={10} // display 10 records per page
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