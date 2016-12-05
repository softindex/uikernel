---
title: Removing records
id: removing-records
prev: editing-grid-data.html
next: creating-records.html
---

* [Live demo](/examples/removing-records/){:target="_blank"}
* [Code]({{ site.github }}/examples/removing-records){:target="_blank"}

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

Для Xhr модели:

{% highlight javascript %}
var model = new UIKernel.Models.Grid.Collection({
  // ...
});

model.delete = function (id) {
model.delete = function (id) { // используем обёртку вокруг xhr для отпраки запросов, вы можете использовать любую удообную для вас библиотеку.
    return this._xhr({
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json'
        },
        uri: this._apiUrl + id
    })
};
{% endhighlight %}
---------------

Next, let's create a new column named `tools` and configure it. We'll set its width by defining the `width` property.
The `render` method will return the remove button.
In `onClickRefs`, we'll define a function for removing grid records.

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

Если вы используете Xhr модель то `grid.updateTable()` необходимо выполнить по окончании `delete()`:
{% highlight javascript %}
del: function (event, recordId, record, grid) {
        grid.getModel()
                    .delete(recordId)
                    .then(() => {
                      grid.updateTable();
                    });
        });
{% endhighlight %}
---

That's all. Now we can remove grid records.
