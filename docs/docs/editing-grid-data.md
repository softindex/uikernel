---
title: Editing grid data
id: editing-grid-data
prev: applying-filters.html
next: removing-records.html
---
* [Live demo](/examples/editing-grid-data/){:target="_blank"}
* [Code]({{ site.github }}/examples/editing-grid-data){:target="_blank"}

Our grid already has sorting, pagination, and filtering. Now it's time to make it editable.

First, let's modify the grid columns by adding each of them the `editor` property.

`columns.js`:
{% highlight javascript %}
var columns = {
  name: {
    name: 'First Name',
    // ...
    editor: function () {
      return <input type="text" {...this.props}/>; // text editor
    },
    // ...
  },
  surname: {
    name: 'Last Name',
    // ...
    editor: function () {
      return <input type="text" {...this.props}/>;
    },
    // ...
  },
  phone: {
    name: 'Phone',
    // ...
    editor: function () {
      return <input type="text" {...this.props}/>;
    },
    // ...
  },
  age: {
    name: 'Age',
    // ...
    editor: function () {
      return <input type="number" {...this.props}/>; // number editor
    },
    // ...
  },
  gender: {
    name: 'Gender',
    // ...
    editor: function () {
      return <UIKernel.Editors.Select // select editor
        {...this.props}
        options={[
          [1, 'Male'],
          [0, 'Female']
        ]}
      />;
    },
    // ...
};
{% endhighlight %}
---
You may have noticed that all inputs as well as `UIKernel.Editors.Select` have some props passed to them via `{...this.props}`.
These props are passed through `UIKernel.Grid`. They include `onChange`, `onFocus`, `onBlur`, and `value`.

---
We'll also need to validate our edited data. So let's define some validation rules.

`validation.js`:
{% highlight javascript %}
var validation = UIKernel.createValidator()
  .field('name', UIKernel.Validators.regExp.notNull(/^\w{2,30}$/, 'Invalid first name.'))
  .field('surname', UIKernel.Validators.regExp.notNull(/^\w{2,30}$/, 'Invalid last name.'))
  .field('phone', UIKernel.Validators.regExp.notNull(/^(\d{3}-)?\d{2,10}$/, 'Invalid phone number.'))
  .field('age', UIKernel.Validators.regExp.notNull(/^[^0]\d{0,2}$/, 'Invalid age.'))
  .field('gender', UIKernel.Validators.regExp.notNull(/^[12]$/, 'Invalid gender.'))
{% endhighlight %}
---
We first create a validator instance by calling `UIKernel.createValidator`.
Then we call `field` to define validation rules. We pass it two arguments: a column name and a validation function.
In this example, we're using only `UIKernel.Validators.regExp`. There are much more UIKernel validation functions.
You can check them [here](validator.html).

---

Now let's modify our `model.js` file as follows:

{% highlight javascript %}
var model = new UIKernel.Models.Grid.Collection({
  // ...
  validation: validation
});
{% endhighlight %}

Или

{% highlight javascript %}
var model = new UIKernel.Models.Grid.Xhr({
  // ...
  validation: validation
});
{% endhighlight %}

---

The last task is to make it possible to discard and save the edited data. So let's create the `onSave` and `onClear` methods in our `MainComponent`.

`MainComponent.js`:
{% highlight javascript %}
onSave: function () {
    this.refs.grid.save()
      .catch(() => {
        alert('Error');
      });
  },

onClear: function () {
  this.refs.grid.clearAllChanges();
}
{% endhighlight %}
---
Here, we're using the `save` and `clearAllChanges` methods of `UIKernel.Grid`. To make it all work, we also need to add a `ref` attribute to our grid
and two buttons for calling the methods we've just created.

`MainComponent.js`:
{% highlight javascript %}
// ...
<UIKernel.Grid
  ref="grid"
  model={this.state.model}
  cols={columns}
  viewCount={20}
/>
<div className="panel-footer">
  <a className="btn btn-success" onClick={this.onClear}>Clear</a>
  {' '}
  <a className="btn btn-primary" onClick={this.onSave}>Save</a>
</div>
// ...
{% endhighlight %}
---
Now our grid data is editable.
