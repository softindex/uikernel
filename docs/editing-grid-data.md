---
title: Editing grid data
id: editing-grid-data
prev: applying-filters.html
next: removing-records.html
---

Time to make our form editable.

[Live demo](/examples/editing-grid-data/){:target="_blank"} and [code example]({{site.github}}_site/examples/editing-grid-data){:target="_blank"} are available here.

### Columns configuration

First of all let's make fields editable via UIKernel.Editors.

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

### Validation configuration

We'll also need to validate our edited data. Define your validation rules using regular expressions for example.

`validation.js`:
{% highlight javascript %}
var Validation = UIKernel.createValidator()
  .field('name', UIKernel.Validators.regExp(/^\w{2,30}$/, 'Invalid first name.'))
  .field('surname', UIKernel.Validators.regExp(/^\w{2,30}$/, 'Invalid last name.'))
  .field('phone', UIKernel.Validators.regExp(/^(\d{3}-)?\d{2,10}$/, 'Invalid phone number.'))
  .field('age', UIKernel.Validators.regExp(/^[^0]\d{0,2}$/, 'Invalid age.'))
  .field('gender', UIKernel.Validators.regExp(/^[12]$/, 'Invalid gender.'));
{% endhighlight %}

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
