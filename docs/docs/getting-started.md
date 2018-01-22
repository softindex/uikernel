---
id: getting-started
title: Getting Started
next: overview.html
redirect_from: "docs/index.html"
---

## Starter Kit

Download the starter kit to get started.

<center>
  <a href="/dist/create-react-app-starter-kit.zip" class="btn btn-lg btn-success download-uikernel-button">
    Download Starter Kit {{ site.uikernel_version }}
  </a>
</center>

To get starter follow follow next steps:

1. Install Create React App. It sets up your development environment so that you can use the latest React features. You’ll need to have Node >= 6 on your machine.
`npm install -g create-react-app
 create-react-app try-uikernel`
2. Go to `try-uikernel` directory and open the project in your favourite editor.
3. In file `package.json`  add line `"uikernel": "git+ssh://git@github.com/softindex/uikernel.git#v1.0.0"` to "dependencies" list and run `npm install`
4. In `src` directory create files `model.js` and `columns.js`.
5. Open up `src/model.js` and define a model.

 {% highlight javascript %}
 const model = new UIKernel.Models.Grid.Collection({
    data: [
      [1, {
        name: 'Pace',libs
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
{:start="6"}
6. Open `src/columns.js` and add columns. Columns data is listed as an object.

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
{% endhighlight%}
{:start="7"}
7. `src/index.js` is the main React entry point, where we render our first `UIKernel.Grid`. Replace
{% highlight javascript %}
ReactDOM.render(<App />, document.getElementById('root'));
{% endhighlight %}

with

{% highlight javascript %}
ReactDOM.render(
    <UIKernel.Grid
        cols={columns}
        model={model}
    />
    , document.getElementById('root'));
{% endhighlight %}
{:start="8"}
8. The last thing to make it work are appropriate imports, so in the beginning add lines:

{% highlight javascript %}
import UIKernel from 'uikernel';
import columns from './columns';
import model from './model';
{% endhighlight %}
{:start="9"}
9. Try your work by command `npm start`

Next, let's take a closer look on each of file content.

`index` is the main React entry point where we render our first `UIKernel.Grid`.

As you can see, we've passed `UIKernel.Grid` two props: `cols` and `model`. We've defined these props in the `columns` and `model` script parts as you can see in comments.

Columns data is listed as an object.

Then, to create a grid model, we've used [UIKernel.Models.Grid.Collection](/docs/grid-model-collection.html).

And that's all. Here's [live demo](/examples/getting-started/){:target="_blank"} and [code]({{ site.github }}/examples/getting-started){:target="_blank"}.

## Want CommonJS?

If you want to use UIKernel with
[browserify](http://browserify.org/){:target="_blank"},
[webpack](https://webpack.github.io/){:target="_blank"}, or other CommonJS-compatible module system, just use the
[uikernel npm package](https://www.npmjs.com/package/uikernel){:target="_blank"}.

## Next Steps

Check out [the tutorial](/docs/tutorial.html) and [examples](/examples/index.html) to learn more.
