---
id: getting-started
title: Getting Started
next: tutorial.html
redirect_from: "docs/index.html"
---

## Starter Kit

Download the starter kit to get started.

<center>
  <a href="/download.html" class="btn btn-lg btn-success download-uikernel-button">
    Download UIKernel v{{ site.uikernel_version }}
  </a>
</center>

In the root directory of the starter kit, create `index.html` with the following contents.

`index.html`:
{% highlight html %}
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8"/>
    <title>First grid component</title>
    <link href="css/bootstrap.min.css" rel="stylesheet" type="text/css"/>
    <link href="css/uikernel/main.css" rel="stylesheet" type="text/css"/>
</head>
<body>
    <script src="js/libs/jquery.min.js"></script>
    <script src="js/libs/lodash.min.js"></script>
    <script src="js/libs/react.0.13.3.min.js"></script>
    <script src="js/libs/JSXTransformer-0.13.3.js"></script>
    <script src="js/libs/uikernel.js"></script>

    <!-- Main file to render -->
    <script src="js/main.jsx" type="text/jsx"></script>

    <!-- Its columns -->
    <script src="js/columns.jsx" type="text/jsx"></script>

    <!-- Our first model -->
    <script src="js/model.js"></script>
</body>
</html>
{% endhighlight %}

Here, we've included the required libraries - React, JQuery and UIKernel, and additionally some helpful libs.

The file named `main.jsx` is going to be the main React entry point, where we'd like to render our first UIKernel.Grid.
As you see it also needs columns list to display and model as a store.

It's a great habbit to separate logic, so we'll create `columns.js` and `model.js` files too.

`main.jsx`:
{% highlight html %}
React.render(
  <UIKernel.Grid
    cols={columns}
    model={model}
  />
, document.body);
{% endhighlight %}

List columns data as an object.

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

Use UIKernel.Models.Grid.Collection to write your first model, which's going to respond with a fake data of 3 records.

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

And that's all. [Live demo](/examples/getting-started/){:target="_blank"} and [code example]({{ site.github }}_site/examples/getting-started){:target="_blank"} are available here.

## Want CommonJS?

If you want to use UIKernel with
[browserify](http://browserify.org/){:target="_blank"},
[webpack](https://webpack.github.io/){:target="_blank"}, or another CommonJS-compatible module system, just use the
[uikernel npm package](https://www.npmjs.com/package/uikernel){:target="_blank"}.

## Next Steps

Check out [the tutorial](/docs/tutorial.html) and the other examples in the starter kit's `examples` directory to learn more.
