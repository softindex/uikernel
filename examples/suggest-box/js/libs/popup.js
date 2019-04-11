/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

const popup = {
  open(Component, props, className) {
    /*
     open modal with parameters:
     Component - React component that will be inside our modal
     props - initial properties
     className - the class name of a modal window when it is open
     */
    const el = document.getElementById('popup');
    el.classList.add(className);
    const innerContent = el.querySelector('.popup-inner-content:first-child');

    $(el).modal();
    ReactDOM.render(<Component {...props}/>, innerContent, () => {
      document.addEventListener('hide.bs.modal', function () {
        ReactDOM.unmountComponentAtNode(innerContent);
        el.classList.remove(className);
      });
    });

    return {
      close() {
        $(el).modal('hide');
      }
    };
  }
};