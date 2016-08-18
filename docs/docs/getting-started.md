---
id: getting-started
title: Getting Started
next: tutorial.html
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
<html>
<head>
    <meta charset="utf-8"/>
    <title>First grid component</title>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.5/css/bootstrap.min.css" rel="stylesheet" type="text/css"/>
    <link href="css/uikernel/main.css" rel="stylesheet" type="text/css"/>
</head>
<body>
    <div class="container" id="example"></div>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/react/0.14.8/react.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/react/0.14.8/react-dom.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.15.0/babel.min.js"></script>
    <script src="../libs/js/uikernel.min.js"></script>

    <!-- Grid model -->
    <script src="js/model.js"></script>

    <!-- Grid columns -->
    <script src="js/columns.js"></script>

    <!-- Main file to render -->
    <script src="js/main.js" type="text/babel"></script>
</body>
</html>
{% endhighlight %}

Here, we've included the required libraries - React, JQuery and UIKernel.

The file `getting-started/js/main.js` is the main React entry point, where we render our first `UIKernel.Grid`.

`main.js`:
{% highlight html %}
ReactDOM.render(
  <UIKernel.Grid
    cols={columns}
    model={model}
  />
, document.getElementById('example'));
{% endhighlight %}

As you can see, the `UIKernel.Grid` component has two props: `cols` and `model`. It's a good practice to separate logic,
so we've defined these props in the `getting-started/js/columns.js` and `getting-started/js/model.js` files.

Columns data is listed as an object.

`columns.js`:
{% highlight javascript %}
var columns = {
  name: {
    name: 'First Name',
    render: ['name', function (record) {
      return record.name;
    }]
  },
  surname: {
    name: 'Last Name',
    render: ['surname', function (record) {
      return record.surname;
    }]
  },
  age: {
    name: 'Age',
    render: ['age', function (record) {
      return record.age;
    }]
  }
};
{% endhighlight %}

To create a grid model, we use [UIKernel.Models.Grid.Collection](/docs/grid-model-collection.html).

`model.js`:
{% highlight javascript %}
var model = new UIKernel.Models.Grid.Collection({
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
[webpack](https://webpack.github.io/){:target="_blank"}, or another CommonJS-compatible module system, just use the
[uikernel npm package](https://www.npmjs.com/package/uikernel){:target="_blank"}.

## Next Steps

Check out [the tutorial](/docs/tutorial.html) and [examples](/examples/index.html) to learn more.
