---
title: Removing records
id: removing-records
prev: editing-grid-data.html
next: creating-records.html
---

* [Live demo](/examples/removing-records/){:target="_blank"}
* [Code]({{ site.github }}/examples/removing-records/){:target="_blank"}

That's the simple part. First, let's add the delete method to our model.

`model.js`:
{% highlight javascript %}

const model = new UIKernel.Models.Grid.Collection({
  // ...
});

model.delete = function (id) {
  this.data = this.data.filter((record) => record[0] !== id);
  return Promise.resolve(id);
};
{% endhighlight %}

Next, let's create a new column named `tools` and configure it. We'll set its width by defining the `width` property.
The `render` method will return the remove button.
Inside `onClickRefs` we'll define a function for removing grid records.

`columns.js`:
{% highlight javascript %}
const columns = {
  tools: {
      width: 50,
      render: [() => '<a href="javascript:void(0)" ref="del">[X]</a>'],
      onClickRefs: {
        del: (event, recordId, record, grid) => { // ref="del" click handler
          grid.getModel()
            .delete(recordId)
            .then(() => {
              grid.updateTable();
            });
        }
      }
    },
  // ...
};
{% endhighlight %}

That's it. Now we can remove grid records.
