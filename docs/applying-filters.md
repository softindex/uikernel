---
title: Applying filters
id: applying-filters
prev: sorting-and-pagination.html
next: editing-grid-data.html
---

We'll apply search filters at this step.

[Live demo](/examples/applying-filters/){:target="_blank"} and [code example]({{site.github}}_site/examples/applying-filters){:target="_blank"} are available here.

### Filters component

We'll create a FiltersForm file and list our filters as UIKernel.Editors.

`FiltersForm.jsx`:
{% highlight javascript %}
var FiltersForm = (function () {
  var defaultFilters = {
    search: '',
    age: null,
    gender: 0
  };

  return React.createClass({
    mixins: [UIKernel.Mixins.Form],
    componentWillMount: function () {
      this.initForm({ // initialize filters form
        fields: ['search', 'age', 'gender'],
        model: new UIKernel.Models.Form(defaultFilters),
        submitAll: true,
        autoSubmit: true,
        autoSubmitHandler: this.onSubmit
      });
    },
    onSubmit: function (err, data) {
      if (!err) {
        this.props.onSubmit(data);
      }
    },
    onClear: function () { // onClear filters event
      this.submitData(defaultFilters, this.onSubmit);
    },
    render() {
      var data = this.getData();

      return (
        <form className="filters-form row">
          <div className="col-sm-7">
            <label className="control-label">Search</label>
            <input
              type="text" // text editor
              className="form-control"
              onChange={this.updateField.bind(null, 'search')} // on data change event
              value={data.search}
            />
          </div>
          <div className="col-sm-2">
            <label className="control-label">Age</label>
            <input
              type="number" // number editor
              className="form-control"
              onChange={this.updateField.bind(null, 'age')}
              value={data.age}
            />
          </div>
          <div className="col-sm-2">
            <label className="control-label">Gender</label>
            <UIKernel.Editors.Select // select editor
              className="form-control"
              onChange={this.updateField.bind(null, 'gender')}
              options={[
                [0, ''],
                [1, 'Male'],
                [2, 'Female']
              ]}
              value={data.gender}
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

Include it to `index.html`:

{% highlight html %}
<!-- Filters form component -->
<script src="js/components/FiltersForm.jsx" type="text/jsx"></script>
{% endhighlight %}

Process filters in the model `model.js`:

{% highlight javascript %}
var model = (function () {
  // Generate some data for our model
  // ...

  return new UIKernel.Models.Grid.Collection({
    data: data,
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
)}();
{% endhighlight %}

And pass it to Main component `MainComponent.jsx` to render:

{% highlight html %}
<FiltersForm onSubmit={this.applyFilters} />
{% endhighlight %}
