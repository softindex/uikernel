---
id: getting-started
title: Getting Started
next: overview.html
redirect_from: "docs/index.html"
---

To get started follow next steps:

1. Setup Create React App in terminal

{% highlight bash %}
# Setup React boilerplate
npm install -g create-react-app
create-react-app react-app
cd react-app

# Install UIKernel
npm i uikernel
{% endhighlight%}
{:start="2"}

2. Open up `src/index.js` and replace all with next piece of code

 {% highlight javascript %}
 import React from 'react';
 import ReactDOM from 'react-dom';
 import UIKernel from 'uikernel';
 import 'uikernel/themes/base/main.css';

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
   <UIKernel.Grid cols={columns} model={model}/>,
   document.getElementById('root')
 );
 {% endhighlight %}

{:start="3"}
3. Try your work by command `npm start`


As you can see, we've passed `UIKernel.Grid` two props: `cols` and `model`. We've defined these props in the `columns` and `model` script parts as you can see in comments.

Then, to create a grid model, we've used [UIKernel.Models.Grid.Collection](/docs/grid-model-collection.html).

And that's all. Here's [live demo](/examples/getting-started/){:target="_blank"} and [code]({{ site.github }}/examples/getting-started){:target="_blank"}.

## Next Steps

Check out [the tutorial](/docs/tutorial.html) and [examples](/examples/index.html) to learn more.
