---
layout: default
title: Downloads
nav-menu: download
---

### Starter Kit
Download the starter kit to get started. It includes UIKernel and some examples.

<center>
  <a href="/dist/starter-kit.zip" class="btn btn-lg btn-success download-uikernel-button">
    Download Starter Kit {{ site.uikernel_version }}
  </a>
</center>

### Individual Downloads

* [UIKernel v{{ site.uikernel_version }} (development)](/dist/uikernel.js){:download="uikernel.js"}
* [UIKernel v{{ site.uikernel_version }} (production)](/dist/uikernel.min.js){:download="uikernel.min.js"}
* [CSS & Images](/dist/static.zip){:download="static.zip"}

The uncompressed, development version of UI Kernel core.

{% highlight html %}
<script src="/uikernel/uikernel-{{ site.uikernel_version }}.js"></script>
{% endhighlight %}

The compressed, production version of UI Kernel core.

{% highlight html %}
<script src="/uikernel/uikernel-{{ site.uikernel_version }}.min.js"></script>
{% endhighlight %}

### NPM
{% highlight bash %}
$ npm install uikernel
{% endhighlight %}

### Bower
To install static files:

{% highlight bash %}
$ bower install uikernel
{% endhighlight %}