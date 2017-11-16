---
title: List XHR Model
id: list-xhr-model
prev: list-model.html
next: list-express-api.html
---

List XHR Model is a class that interacts with the server API keeping there its data.

*List XHR Model implements [List Model Interface](/docs/list-model.html){:target="_blank"}*

## Constructor

{% highlight javascript %}
  const listXhrModel = new UIKernel.Models.List.Xhr(apiUrl, xhr)
{% endhighlight %}

**Parameters**:

| Type         | Name              | Description                   |
|--------------|-------------------|-------------------------------|
| String       | settings.apiUrl   | *Required*. API address to interact with  |
| Function     | settings.xhr      | *Optional*. XHR interface. By default there is used a built-in xhr function, but you can override it here. |

---

## Methods

### async read

{% highlight javascript %}
  const listData = await listXhrModel.read(search);
{% endhighlight %}

Fetch options list from the server for a Select or SuggestBox editor.
The method sends `GET` request to the URI = settings.apiUrl parameter taken in the constructor.
In successful case(server response status == 200) returns parsed server response, otherwise throws an error.

**Parameters**:

| Type       | Name         | Description                                                                                    |
|------------|--------------|------------------------------------------------------------------------------------------------|
| String     | search       | *Optional*. List labels search filter(case insensitive). If the parameter is specified, the method will return only list items whose labels contain the passed string. |

**Returns**: Promise which resolves with the parsed server response.

**Example**:

{% highlight javascript %}
  const res = await listXhrModel.read('Al');
  console.log(res);    // [ [1,'Alex'], [3,'Albert'] ]
{% endhighlight %}

---

### async getLabel

{% highlight javascript %}
  await listXhrModel.getLabel(id);
{% endhighlight %}

Fetch the option name(label) by the specified `id` from the server.
The method sends `GET` request to the URI = settings.apiUrl parameter taken in the constructor.
In successful case(server response status == 200) returns parsed server response
(which is assumed to be a string value of the corresponding label), otherwise throws an error.

**Parameters**:

| Type       | Name     | Description                                      |
|------------|----------|--------------------------------------------------|
| Number     | id       | *Required*. Id of a list option to get label of. |

**Example**:

{% highlight javascript %}
  const label = await listXhrModel.getLabel(1);
  console.log(label);    // 'Alex'
{% endhighlight %}
