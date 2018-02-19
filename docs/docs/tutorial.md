---
title: Tutorial
id: tutorial
prev: getting-started.html
next: first-grid-component.html
---
* [Live demo](/examples/creating-records/){:target="_blank"}
* [Code]({{ site.github }}/examples/creating-records){:target="_blank"}

This tutorial demonstrates how to build forms and editable grids with UIKernel. The steps for this tutorial are as follows:

1. Create a grid
2. Add sorting and pagination
3. Create a form for filtering grid data
4. Make the grid editable
5. Add the possibility to remove grid records
6. Create a form for adding records into the grid


To get started, we will need to [install](/download.html) UIKernel.

Next, create a directory with the following structure:

{% highlight html %}
|-- css
    |-- uikernel
        * css and images we've downloaded
    main.css
|-- js
    |-- components
        FiltersForm.js
        CreateForm.js
        MainComponent.js
    |-- libs
        uikernel.js
    |-- models
        model.js
        validation.js
    columns.js
    main.js
index.html
{% endhighlight %}

All files in `js/components` and `js/models` as well as the `css/main.css` file are empty, we'll add some code into them later.

Our `index.html` file should look like this:

{% highlight html %}
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8"/>
    <title>Example</title>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.5/css/bootstrap.min.css" rel="stylesheet" type="text/css"/>
    <link href="css/uikernel/main.css" rel="stylesheet" type="text/css"/>
    <link href="css/main.css" rel="stylesheet" type="text/css"/>
</head>
<body>
<div class="container" id="example"></div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.15.0/lodash.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/react/16.2.0/umd/react.development.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/react-dom/16.2.0/umd/react-dom.development.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.15.0/babel.min.js"></script>
<script src="../libs/js/uikernel.js"></script>

<!-- Validation -->
<script src="js/model/validation.js" type="text/babel"></script>

<!-- Grid model -->
<script src="js/model/model.js" type="text/babel"></script>

<!-- Grid columns -->
<script src="js/columns.js" type="text/babel"></script>

<!-- FiltersForm component -->
<script src="js/components/FiltersForm.js" type="text/babel"></script>

<!-- CreateForm component -->
<script src="js/components/CreateForm.js" type="text/babel"></script>

<!-- Our main component -->
<script src="js/components/MainComponent.js" type="text/babel"></script>

<!-- Main file to render -->
<script src="js/main.js" type="text/babel"></script>
</body>
</html>
{% endhighlight %}
---

Now you can move on to the first step of our tutorial.
