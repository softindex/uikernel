---
title: Валидация данных
id: server-validation
prev: server-routes.html
next: server-model.html
---

UIKernel поддерживает клиентскую и серверную валидации.
Реализуем сеерверную валидацию. Будем использовать [встроенные валидаторы UIKernel](/docs/validator.html).

`userGrid/validations.js`:
{% highlight javascript %}
var validator = UIKernel.createValidator()
     .field('name', UIKernel.Validators.regExp.notNull(/^\w{2,30}$/, 'Invalid first name.'))
     .field('surname', UIKernel.Validators.regExp.notNull(/^\w{2,30}$/, 'Invalid last name.'))
     .field('phone', UIKernel.Validators.regExp.notNull(/^(\d{3}-)?\d{2,10}$/, 'Invalid phone number.'))
     .field('age', UIKernel.Validators.regExp.notNull(/^[^0]\d{0,2}$/, 'Invalid age.'))
     .field('gender', UIKernel.Validators.regExp.notNull(/^[12]$/, 'Invalid gender.'));

module.exports = validatorWrapper;
{% endhighlight %}

Метод принимает на вход объект который необходимо провалидировать, и возвращает обьект с результатом валидации.
