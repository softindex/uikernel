---
id: getting-started
title: Getting Started
next: overview.html
redirect_from: "docs/index.html"
---

To get started follow next steps:

1. Setup Create React App in terminal

{% highlight bash %}
npm install -g create-react-app # install create-react-app globally
create-react-app try-uikernel   # create new project named try-uikernel
cd try-uikernel                 # go to project directory
npm i uikernel                  # install uikernel package
{% endhighlight%}
{:start="2"}

2. Open up `src/index.js` and paste next code after `import`s

 {% highlight javascript %}
 import UIKernel from 'uikernel';

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

 ReactDOM.render(
      <UIKernel.Grid
          cols={columns}
          model={model}
      />
      , document.getElementById('root'))
 {% endhighlight %}

{:start="3"}
3. Try your work by command `npm start`


As you can see, we've passed `UIKernel.Grid` two props: `cols` and `model`. We've defined these props in the `columns` and `model` script parts as you can see in comments.

Then, to create a grid model, we've used [UIKernel.Models.Grid.Collection](/docs/grid-model-collection.html).

And that's all. Here's [live demo](/examples/getting-started/){:target="_blank"} and [code]({{ site.github }}/examples/getting-started){:target="_blank"}.

## Want CommonJS?

If you want to use UIKernel with
[browserify](http://browserify.org/){:target="_blank"},
[webpack](https://webpack.github.io/){:target="_blank"}, or other CommonJS-compatible module system, just use the
[uikernel npm package](https://www.npmjs.com/package/uikernel){:target="_blank"}.

## Next Steps

Check out [the tutorial](/docs/tutorial.html) and [examples](/examples/index.html) to learn more.
