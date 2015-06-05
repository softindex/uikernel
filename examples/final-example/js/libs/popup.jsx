var Popup = {
  open: function (Component, props, className) {
    const $el = $('#popup').addClass(className);
    const innerContent = $el.find('.popup-inner-content').get(0);

    $el.modal();

    React.render(<Component {...props}/>, innerContent, function () {
      $(document).on('hide.bs.modal', function () {
        React.unmountComponentAtNode(innerContent);
        $el.removeClass(className);
      });
    });

    return {
      close() {
        $el.modal('hide');
      }
    };
  }
};
