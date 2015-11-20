---
title: Editing grid data
id: editing-grid-data
prev: applying-filters.html
next: removing-records.html
---

Our grid already has sorting, pagination, and filtering. Now it's time to make it editable.

* [Live demo](/examples/editing-grid-data/){:target="_blank"}
* [Code]({{site.github}}_site/examples/editing-grid-data){:target="_blank"}


First, let's modify our columns by adding `editor`to them, which will simply return inputs. Only in the gender column it will return `UIKernel.Editors.Select`.

`columns.js`:
{% highlight javascript %}
var columns = {
  name: {
    name: 'First Name',
    sortCycle: ['asc', 'desc', 'default'],
    editor: function () {
      return <input type="text" {...this.props}/>; // text editor
    },
    render: ['name', function (record) {
      return record.name;
    }]
  },
  surname: {
    name: 'Last Name',
    sortCycle: ['asc', 'desc', 'default'],
    editor: function () {
      return <input type="text" {...this.props}/>;
    },
    render: ['surname', function (record) {
      return record.surname;
    }]
  },
  phone: {
    name: 'Phone',
    sortCycle: ['asc', 'desc', 'default'],
    editor: function () {
      return <input type="text" {...this.props}/>;
    },
    render: ['phone', function (record) {
      return record.phone;
    }]
  },
  age: {
    name: 'Age',
    sortCycle: ['asc', 'desc', 'default'],
    editor: function () {
      return <input type="number" {...this.props}/>; // number editor
    },
    render: ['age', function (record) {
      return record.age;
    }]
  },
  gender: {
    name: 'Gender',
    sortCycle: ['asc', 'desc', 'default'],
    editor: function () {
      return <UIKernel.Editors.Select // select editor
        {...this.props}
        options={[
          [1, 'Male'],
          [0, 'Female']
        ]}
      />;
    },
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

You may have noticed that all inputs and `UIKernel.Editors.Select` have some props passed to them via `{...this.props}`.


We'll also need to validate our edited data. So let's define some validation rules.

`validation.js`:
{% highlight javascript %}
var validation = UIKernel.createValidator()
  .field('name', UIKernel.Validators.regExp(/^\w{2,30}$/, 'Invalid first name.'))
  .field('surname', UIKernel.Validators.regExp(/^\w{2,30}$/, 'Invalid last name.'))
  .field('phone', UIKernel.Validators.regExp(/^(\d{3}-)?\d{2,10}$/, 'Invalid phone number.'))
  .field('age', UIKernel.Validators.regExp(/^[^0]\d{0,2}$/, 'Invalid age.'))
  .field('gender', UIKernel.Validators.regExp(/^[12]$/, 'Invalid gender.'))
  .field('customField', function (value) {
    if (value % 2 === 0) {
      return 'N';
    }
  });
{% endhighlight %}

We first create a validator instance by calling `UIKernel.createValidator()`.
Then we call `field()` to define validation rules. We pass it two arguments: a column name and a validation function.
In this example, we're using only `UIKernel.Validators.regExp()`. There are much more UIKernel validation functions.
You can check them here.

### Grid Model

And turn validation on in your Grid model.

`model.js`:
{% highlight javascript %}
var model = new UIKernel.Models.Grid.Collection({
  // ...
  validation: Validation
});
{% endhighlight %}

### Main component

The last task is to make it able to discard and save our edited data.

`MainComponent.jsx`:
{% highlight javascript %}
onSave: function () {
  this.refs.grid.save(function (err) {
    if (err) {
      alert('Error');
    }
  });
},

onClear: function () {
  this.refs.grid.clearAllChanges();
}
{% endhighlight %}
