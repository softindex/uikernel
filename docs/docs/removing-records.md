---
title: Removing records
id: removing-records
prev: editing-grid-data.html
next: creating-records.html
---

* [Live demo](/examples/removing-records/){:target="_blank"}
* [Code]({{site.github}}_site/examples/removing-records){:target="_blank"}

That's the simple part. First, let's add the delete method to our model.

`model.js`:
{% highlight javascript %}
var model = new UIKernel.Models.Grid.Collection({
  // ...
});

model.delete = function (id) {
  this.data = _.reject(this.data, function (record) {
    return record[0] === id;
  });
  return id;
};
{% endhighlight %}
---

Next, let's create a new column named `tools` and configure it. We'll set its width by defining the `width` property.
The `render` method will return the remove button.
In `onClickRefs`, we'll define the function for removing records from our grid.

`columns.js`:
{% highlight javascript %}
var columns = {
  tools: {
    width: 50,
    render: [function () {
      return '<a href="javascript:void(0)" ref="del">[X]</a>';
    }],
    onClickRefs: {
      del: function (event, recordId, record, grid) { // ref="del" click handler
        grid.getModel().delete(recordId); // our delete function
        grid.updateTable(); // update table after deleting a record
      }
    }
  },
  // ...
};
{% endhighlight %}
---

That's all. Now we can remove our grid records.
