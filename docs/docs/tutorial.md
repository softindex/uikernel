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

Setup Create React App in terminal

{% highlight bash %}
# Setup React boilerplatenpm install -g create-react-app
create-react-app react-app
cd react-app

# Install UIKernel
npm i uikernel

# Install bootstrap
npm i bootstrap

{% endhighlight%}

Change structure in the react-app folder to the next structure:

{% highlight html %}
|-- src
    |-- Components
        MainComponent.js
        CreateForm.js
        FiltersForm.js
    index.js
    columns.js
    model.js
    validator.js
    main.css
|-- public
    index.html
package.json

{% endhighlight%}

All files are empty, we'll add some code into them later.

Our `index.html` file should look like this:

{% highlight html %}
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, shrink-to-fit=no"
    />
    <meta name="theme-color" content="#000000" />
    <title>React App</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
  </body>
</html>
{% endhighlight %}
---
and `main.css` look like this:
{% highlight html %}
#body {
    margin: 0 auto;
}

.container {
    padding-top: 10px;
}

.btn-success {
    margin: 0 15px 15px 0;
}
.action{
    margin-top: 15px;
}
.data-grid {
    margin: 10px 0;
}
{% endhighlight %}
---
Now you can move on to the first step of our tutorial.
