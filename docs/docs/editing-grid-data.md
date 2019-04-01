---
title: Editing grid data
id: editing-grid-data
prev: applying-filters.html
next: removing-records.html
---
* [Live demo](/examples/editing-grid-data/){:target="_blank"}
* [Code]({{ site.github }}/examples/editing-grid-data/){:target="_blank"}

Our grid already has sorting, pagination, and filtering. Now it's time to make it editable.

First, let's modify the grid columns by adding each of them the `editor` property.

`columns.js`:
{% highlight javascript %}
import UIKernel from 'uikernel';
import React from 'react';

const columns = {
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
      return <UIKernel.Editors.Number {...this.props}/>; // number editor
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
          [2, 'Female']
        ]}
      />;
    },
    // ...
};
{% endhighlight %}

You may have noticed that all inputs as well as `UIKernel.Editors.Select` have some props passed to them via `{...this.props}`.
These props are passed through `UIKernel.Grid`. They include `onChange`, `onFocus`, `onBlur`, and `value`.

---
We'll also need to validate our edited data. So let's define some validation rules.

`validation.js`:
{% highlight javascript %}
import UIKernel from 'uikernel'

const validator = UIKernel.createValidator()
  .field('name', UIKernel.Validators.regExp.notNull(/^\w{2,30}$/, 'Invalid first name.'))
  .field('surname', UIKernel.Validators.regExp.notNull(/^\w{2,30}$/, 'Invalid last name.'))
  .field('phone', UIKernel.Validators.regExp.notNull(/^(\d{3}-)?\d{2,10}$/, 'Invalid phone number.'))
  .field('age', UIKernel.Validators.number.notNull(0, 120, 'Invalid age.'))
  .field('gender', UIKernel.Validators.enum.notNull([1, 2], 'Invalid gender.'));

export default validator
{% endhighlight %}
Here, we've called `UIKernel.createValidator` to create a validator.

`field` is the method of validator which accepts two parameters: a column name and a validation function.

In this example, we've used only `UIKernel.Validators.regExp`. There are many more UIKernel validation functions, see them all [here](validator.html).

---

Now let's modify our `model.js` file as follows:

{% highlight javascript %}
import UIKernel from 'uikernel';
import validator from './validation';

const model = new UIKernel.Models.Grid.Collection({
  // ...
  validator
});
{% endhighlight %}
---

The last task is to make it possible to discard and save the edited data.
So we'll define the `saveChanges` and `clearChanges` methods in our `MainComponent`.

`MainComponent.js`:
{% highlight javascript %}
// ...

saveChanges() {
    this.grid.save()
      .catch(() => {
        alert('Error');
      });
  },

clearChanges() {
  this.grid.clearAllChanges();
}
{% endhighlight %}

Inside `saveChanges ` we've called the `save` method to save changes.

Inside `clearChanges` we've called the `clearAllChanges` method to remove changes.

To make it all work, we also need to add the `ref` attribute to our grid and two buttons for calling the methods we've just created.

`MainComponent.js`:
{% highlight javascript %}
// ...
<UIKernel.Grid
  ref={(grid) => this.grid = grid}
  model={this.state.model}
  cols={columns}
  viewCount={10}
/>
<div className="panel-footer">
  <a className="btn btn-success" onClick={() => this.clearChanges()}>Clear</a>
  {' '}
  <a className="btn btn-primary" onClick={() => this.saveChanges()}>Save</a>
</div>
// ...
{% endhighlight %}

Now our grid data is editable.
