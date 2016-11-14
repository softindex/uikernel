---
title: Export
id: grid-export
prev: grid-adapters.html
next: grid-express-api.html
---

UIKernel allows to export grid data into JSON and CSV files.

### exportGridData

{% highlight javascript %}
UIKernel.exportGridData(gridModel, Object columns, string[] viewColumns, function exporter, Object settings,
function callback)
{% endhighlight %}

Exports grid data into a file.

**Settings object**

| Type     | Name         | Description                 |
|----------|--------------|-----------------------------|
| Object   | sort         | Sort parameters
| number   | limit        | Limit
| number   | offset       | Offset
| string[] | viewColumns  | Visible columns list

---

## Exporters

### toJSON
{% highlight javascript %}
UIKernel.toJSON(Object data, function callback)
{% endhighlight %}

Exports grid data into a JSON file.

### toCSV

{% highlight javascript %}
UIKernel.toCSV(Object data, function callback)
{% endhighlight %}

Exports grid data into a CSV file.