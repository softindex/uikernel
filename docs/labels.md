---
title: Labels
id: labels
prev: editors.html
next: list-model.html
---

While working with IDs in user interfaces, it's often needed to synchronize them with string names;
e.g. a country id for updating the database and a country name for displaying it to the user.

UIKernel provides editors that support automatic synchronization. They are `SuggestBox` and `Select`.

You need to use an `onLabelChange={handler}` prop to automatically synchronize IDs and string names.

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

> `this.updateField` updates the field value without validation

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

`onLabelChange={handler}` speeds up the initial rendering of the grid, since no additional XHR calls are needed to resolve a country id into a country name.
