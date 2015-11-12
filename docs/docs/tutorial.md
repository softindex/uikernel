---
title: Tutorial
id: tutorial
prev: getting-started.html
next: first-grid-component.html
---

We'll start our introductory lesson with [UI Kernel package](https://www.npmjs.com/package/uikernel){:target="_blank"} install.

You can use `npm install uikernel` for it.

Let's also include some extra libs, such as
[React](https://facebook.github.io/react/downloads.html){:target="_blank"},
[jQuery](https://jquery.com/download/){:target="_blank"} and
[Bootstrap](http://getbootstrap.com/getting-started/#download){:target="_blank"}. We'll also use
[browserify](http://browserify.org/#install){:target="_blank"} in this example.

Our `index.html` file should look like this:

{% highlight html %}
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8"/>
    <title>Example</title>
    <link href="css/bootstrap.min.css" rel="stylesheet" type="text/css"/>
    <link href="css/uikernel/main.css" rel="stylesheet" type="text/css"/>
    <link href="css/main.css" rel="stylesheet" type="text/css"/>
</head>
<body>
    <div id="body"></div>
    
    <script src="js/libs/jquery.min.js"></script>
    <script src="js/libs/lodash.min.js"></script>
    <script src="js/libs/react.0.13.3.min.js"></script>
    <script src="js/libs/JSXTransformer-0.13.3.js"></script>
    <script src="js/libs/uikernel.js"></script>

    <!-- Our first model -->
    <script src="js/model/model.js"></script>

    <!-- Our main component -->
    <script src="js/components/MainComponent.jsx" type="text/jsx"></script>

    <!-- Its columns -->
    <script src="js/columns.jsx" type="text/jsx"></script>

    <!-- Main file to render -->
    <script src="js/main.jsx" type="text/jsx"></script>
</body>
</html>
{% endhighlight %}
