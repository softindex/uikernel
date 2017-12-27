---
id: getting-started
title: Getting Started
next: overview.html
redirect_from: "docs/index.html"
---

## Starter Kit

Download the starter kit to get started.

<center>
  <a href="/dist/starter-kit.zip" class="btn btn-lg btn-success download-uikernel-button">
    Download Starter Kit {{ site.uikernel_version }}
  </a>
</center>

Open up `getting-started/index.html`. It has the following contents:

{% highlight html %}
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Getting Started</title>
  <link href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.5/css/bootstrap.min.css" rel="stylesheet" type="text/css"/>
  <link href="../libs/css/base/main.css" rel="stylesheet" type="text/css"/>
  <link href="css/main.css" rel="stylesheet" type="text/css"/>
</head>
<body>
<div class="container" id="example"></div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/react/0.14.8/react.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/react/0.14.8/react-dom.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.15.0/babel.min.js"></script>
<script src="../libs/js/uikernel.js"></script>

<!-- Grid model -->
<script src="js/model.js" type="text/babel"></script>

<!-- Grid columns -->
<script src="js/columns.js" type="text/babel"></script>

<!-- Main file to render -->
<script src="js/main.js" type="text/babel"></script>
</body>
</html>
{% endhighlight %}

Here, we've included the required libraries - React, JQuery and UIKernel.

The file `getting-started/js/main.js` is the main React entry point where we render our first `UIKernel.Grid`.

`main.js`:
{% highlight html %}
ReactDOM.render(
  <UIKernel.Grid
    cols={columns}
    model={model}
  />
, document.getElementById('example'));
{% endhighlight %}

As you can see, we've passed `UIKernel.Grid` two props: `cols` and `model`. It's a good practice to separate logic,
so we've defined these props in the `getting-started/js/columns.js` and `getting-started/js/model.js` files.

Columns data is listed as an object.

`columns.js`:
{% highlight javascript %}
const columns = {
  name: {
    name: 'First Name',
    render: ['name', record => record.name]
  },
  surname: {
    name: 'Last Name',
    render: ['surname', record => record.surname]
  },
  age: {
    name: 'Age',
    render: ['age', record => record.age]
  }
};
{% endhighlight %}

To create a grid model, we've used [UIKernel.Models.Grid.Collection](/docs/grid-model-collection.html).

`model.js`:
{% highlight javascript %}
const model = new UIKernel.Models.Grid.Collection({
  data: [
    [1, {
      name: 'Pace',
      surname: 'White',
      age: 20
    }],
    [2, {
      name: 'Evangeline',
      surname: 'Terrell',
      age: 72
    }],
    [3, {
      name: 'Roach',
      surname: 'Potts',
      age: 14
    }]
  ]
});
{% endhighlight %}

And that's all. Here's [live demo](/examples/getting-started/){:target="_blank"} and [code]({{ site.github }}/examples/getting-started){:target="_blank"}.

## Want CommonJS?

If you want to use UIKernel with
[browserify](http://browserify.org/){:target="_blank"},
[webpack](https://webpack.github.io/){:target="_blank"}, or other CommonJS-compatible module system, just use the
[uikernel npm package](https://www.npmjs.com/package/uikernel){:target="_blank"}.

## Next Steps

Check out [the tutorial](/docs/tutorial.html) and [examples](/examples/index.html) to learn more.
