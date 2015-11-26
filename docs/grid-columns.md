---
title: Grid Columns
id: grid-columns
prev: grid-component.html
next: grid-interface.html
---

Columns list is specified as an object with column string IDs as keys and column configuration objects as values.

{% highlight javascript %}
{
  {string}: {                       // Column ID
    name: {string},                 // Column tag <th> content
    parent: {string},               // Group name, column belongs to

    width: {string},                // Column width. Example: '70px'

    sortField: {string},            // Sorting parameter
    sortCycle: {string[]},          // Sorting modes sequence

    editorField: {string|string[]}, // Editable fields

    /**
     * Function returns editor React component.
     *
     * @param   {Object}           props    Default props
     * @return  {ReactComponent}
    **/
    editor: function (props) { },

    render: [
      {string}, ...,                // Fields, used for rendering

      /**
       * Cell rendering function.
       *
       * @param    {any}      recordId  Record ID
       * @param    {Object}   record    Record content
       * @return   {string}             Cell content
      **/
      function () { }
    ],

    /**
     * Table cell onClick handler.
     *
     * @param    {Event}    e          Event
     * @param    {any}      recordId   Record ID
     * @param    {Object}   grid       Grid context
    **/
    onClick: function () { },

    onClickRefs: {
      /**
       * Cell ref onClick handler.
       *
       * @param    {Event}    e          Event
       * @param    {any}      recordId   Record ID
       * @param    {Object}   grid       Grid context
      **/
      test: function () {...},
      ...
    }
  }, ...
}
{% endhighlight %}
