---
id: getting-started
title: Getting Started
next: overview.html
redirect_from: "docs/index.html"
---

To get started follow next steps:

1. Setup Next App in terminal

{% highlight bash %}
# Setup Next boilerplate
npx create-next-app
cd my-app
npm install react
npm install next

# Install UIKernel
npm i uikernel
# Install url
npm i url
{% endhighlight%}
{:start="2"}

2. Create folder `my-app/src/pages`. Then create file `index.jsx` inside `pages` folder. Open up `pages/index.jsx` and replace all with the next piece of code

 {% highlight javascript %}
 import React from "react";
import UIKernel from "uikernel";
import 'uikernel/dist/themes/base/uikernel.css';

const model = new UIKernel.Models.Grid.Collection({
  data: [
    [
      1,
      {
        name: "Pace",
        surname: "White",
        age: 20
      }
    ],
    [
      2,
      {
        name: "Evangeline",
        surname: "Terrell",
        age: 72
      }
    ],
    [
      3,
      {
        name: "Roach",
        surname: "Potts",
        age: 14
      }
    ]
  ]
});

const columns = {
  name: {
    name: "First Name",
    render: ["name", record => record.name]
  },
  surname: {
    name: "Last Name",
    render: ["surname", record => record.surname]
  },
  age: {
    name: "Age",
    render: ["age", record => record.age]
  }
};

export default () => <UIKernel.Grid columns={columns} model={model} />

 {% endhighlight %}

{:start="3"}
1. Try it out now using the `npm run dev` command


As you can see, we've passed `UIKernel.Grid` two props: `columns` and `model`. We've defined these props in the `columns` and `model` script parts as you can see in comments.

Then, to create a grid model, we've used [UIKernel.Models.Grid.Collection](/docs/grid-model-collection.html).

And that's all. Here's the [live demo](/examples/getting-started/){:target="_blank"} and [code]({{ site.github }}/examples/getting-started){:target="_blank"}.

## Next Steps

Check out [the tutorial](/docs/tutorial.html) and [examples](/examples/index.html) to learn more.
