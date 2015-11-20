---
title: Tutorial
id: tutorial
prev: getting-started.html
next: first-grid-component.html
---

This tutorial shows us how to build forms and editable grids with UIKernel. The steps for this tutorial are as follows:

1. Create a grid
2. Add sorting and pagination to our grid
3. Create a from for filtering grid data
4. Make our grid editable
5. Add the possibility to remove records from our grid
6. Create a from for adding records to our grid


To get started, install the [UIKernel package](https://www.npmjs.com/package/uikernel){:target="_blank"} through npm:

{% highlight html %}
npm install uikernel
{% endhighlight %}

Then create a directory with the following structure:

{% highlight html %}
-- css
--- uikernel
--- bootstrap.min.css
-- js
--- components
---- FiltersForm.jsx
---- CreateForm.jsx
---- MainComponent.jsx
--- libs
---- JSXTransformer-0.13.3.js
---- jquery.min.js
---- lodash.min.js
---- react.0.13.3.min.js
---- uikernel.js
--- model
---- model.js
---- validation.js
--- columns.jsx
--- main.jsx
-- index.html
{% endhighlight %}

As you can see, we've also included some extra libs, such as
[React](https://facebook.github.io/react/downloads.html){:target="_blank"},
[jQuery](https://jquery.com/download/){:target="_blank"}, and
[Bootstrap](http://getbootstrap.com/getting-started/#download){:target="_blank"}.

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

    <!-- Validation -->
    <script src="js/model/validation.js"></script>

    <!-- Our first model -->
    <script src="js/model/model.js"></script>

    <!-- Our main component -->
    <script src="js/components/MainComponent.jsx" type="text/jsx"></script>

    <!-- Its columns -->
    <script src="js/columns.jsx" type="text/jsx"></script>

    <!-- Filters form component -->
    <script src="js/components/FiltersForm.jsx" type="text/jsx"></script>

    <!-- Main file to render -->
    <script src="js/main.jsx" type="text/jsx"></script>
</body>
</html>
{% endhighlight %}

Now you can move on to the next step of our tutorial.
