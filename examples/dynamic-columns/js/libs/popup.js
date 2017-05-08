/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

var popup = {
  open: function (Component, props, className) {
    /*
     open modal with parameters:
     Component - React component that will be inside our modal
     props - initial properties
     className - the class name of a modal window when it is open
     */
    var $el = $('#popup').addClass(className);// get modal dialog by id
    var innerContent = $el.find('.popup-inner-content').get(0); // find inner element by using class name
    $el.modal();

    React.render(React.createElement(Component, props), innerContent, function () { // create react element
      $(document).on('hide.bs.modal', function () {
        React.unmountComponentAtNode(innerContent);
        $el.removeClass(className); // remove class name
      });
    });

    return {
      close() {
        $el.modal('hide'); // close our modal
      }
    };
  }
};