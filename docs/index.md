---
layout: default
title: UI library for building forms, editable grids and reports | UIKernel
nav-menu: home
---

<div class="love-video row">
  <div class="col-sm-8">
    <h3>Simple way to manage complex interfaces</h3>
    UIKernel is a comprehensive React.js UI library for building forms, editable grids and reports with drilldowns and filters, based on a simple unified record model with client-side and server-side validations and data bindings.
    <!--div class="actions">
      <a href="/docs/grid-interface.html" class="btn-bordered">Read more</a>
    </div-->
  </div>
  <div class="col-sm-4">
    <img src="/static/images/example-1.png" class="pull-right"/>
  </div>
</div>
<br />

<div class="home-example">
  <h2>What you can do with UIKernel components</h2>
</div>
<div class="home-example">
  <div class="row">
    <div class="col-md-4"><h3>Interact with data<i class="fa fa-pencil-square-o grid-i"></i></h3><p>You can set up grid not only to display data but to add new records, update or delete them</p></div>
    <div class="col-md-4"><h3>Filtering<i class="fa fa-filter grid-i"></i></h3><p>UIKernel grid supports sorting by different fields</p></div>
    <div class="col-md-4"><h3>Sorting & pagination<i class="fa fa-sort-amount-asc grid-i"></i></h3><p>Sort data by default order or by user choice and paginate the data.</p></div>
  </div>
  <div class="row">
    <div class="col-md-4"><h3>Data source<i class="fa fa-database grid-i"></i></h3><p>Pass data from any source to UIKernel model</p></div>
    <div class="col-md-4"><h3>Convenient inputs<i class="fa fa-keyboard-o grid-i"></i></h3><p>Each form input or grid cell can be one from UIKernel editors: date picker, suggest box, number, select, checkbox</p></div>
    <div class="col-md-4"><h3>Validation<i class="fa fa-check-square-o grid-i"></i></h3><p>Use UIKernel validators to check fields on client or both on client and server. Also custom validation rules can be applied</p></div>
  </div>
  <div class="row">
    <div class="col-md-4"><h3>Data export<i class="fa fa-download grid-i"></i></h3><p>Export grid data in JSON or CSV formats for further interaction.</p></div>
    <div class="col-md-4"><h3>Synchronize multiple grids<i class="fa fa-refresh grid-i"></i></h3><p>Automatic synchronization of multiple forms and grids with a shared data model</p></div>
    <div class="col-md-4"><h3>Bulk operations<i class="fa  fa-users grid-i"></i></h3><p>UIKernel grid support performing massive operations on records</p></div>
  </div>
</div>

<div class="home-example">
  <h2>Basic grid example</h2>
  {% include example.html %}
</div>

<div class="hide">
  <h2>Features</h2>
  <div class="row">
    <div class="col-sm-6">
      Basic
      <ul>
        <li>Sorting columns</li>
        <li>Grid pagination</li>
        <li>Nested column headers</li>
        <li>Inplace cell editing</li>
        <li>Realtime grid - save data right after editing</li>
        <li>Edit and create forms</li>
        <li>Records removing</li>
      </ul>
    </div>
    <div class="col-sm-6">
      Advanced
      <ul>
        <li>Filters</li>
        <li>Scrollable grid - if grid exceeds some limit</li>
        <li>Dynamic columns list - switch on/off some columns</li>
        <li>Marking fields as new, changed or invalid</li>
        <li>Extra records - shows and marks edited record even when moving to other page</li>
        <li>Validation while editing or creating</li>
        <li>Records selecting - to perform bulk operations if you want</li>
      </ul>
    </div>
  </div>

  <h2>More</h2>
  <ul>
    <li>Download our <a href="/uikernel/uikernel-{{ site.uikernel_version }}.tar.gz">starter kit</a></li>
    <li>Visit our <a href="/docs/getting-started.html">getting started page</a></li>
    <li>Check the <a href="/docs/tutorial.html">tutorial</a></li>
    <li>Take a look at the <a href="#">examples page</a></li>
  </ul>
</div>

<br />
<h3>Speeds up development</h3>
You just need to pass a model and configuration to make a component appear on your page.
<br />
<br />
{% highlight html tabsize=2 %}
<UIKernel.Grid
  model={model}
  cols={columns}
/>
{% endhighlight %}
<br />
<h3>Code clarity</h3>
UIKernel tries to avoid unnecessary abstractions, giving you the opportunity to define a model as you want.
Nevertheless, there are basic implementations that work with client data and models linking server and
client interface using API.
