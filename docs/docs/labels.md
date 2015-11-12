---
title: Labels
id: labels
prev: editors.html
next: list-model.html
---

Some editors return string names after his changes. While working with IDs in user interfaces it's often needed to synchronize them with string names; e.g. a countryId for updating the database and the country name string for displaying to the user.
UIKernel has editors that support automatic synchronization, they are `SuggestBox` and `Select`.

This speeds up the initial rendering of the grid, since no additional AJAX calls are needed to resolve country ID into country name. 

You need to use `onLabelChange={handler)}` prop to automatically synchronize id and string name.

---

## Usage in forms

{% highlight javascript %}
<UIKernel.SuggestBox
  onChange={this.validateField.bind(null, 'countryId')}
  onLabelChange={this.updateField.bind(null, 'countryName')} // Update string name
  value={data.countryId}
  ...
/>
{% endhighlight %}

> `this.updateField` updates the field value without checking validation

---

## Usage in grids

{% highlight javascript %}
countryId: {
  editor: function () {
    return <UIKernel.SuggestBox
      {...this.props}
      onLabelChange={this.updateField.bind(null, 'countryName')} // Update string name
      ...
    />;
  },
  render: ['countryId', 'countryName', function (record) {
    return record.countryName;
  }],
  ...
}
{% endhighlight %}
