---
title: Настройка роутов
id: server-routes
prev: server-side.html
next: server-validation.html
---

В нашем приложении будет только один модуль `userGrid`, он отвечает за работу с данными которые будут передаватся в клиентскую модель.
Опишем роуты этого модуля, UIKernel предоставляет возможность генерировать роуты(если вы используете Express), что мы и сделаем.

`userGrid/router.js`:
{% highlight javascript %}
//Подключаем UIKernel и серверную модель
var UIKernel = require('uikernel');
var model = require('./model');

//Сгенерируем роуты.
var router = UIKernel.gridExpressApi()
    .model(model)
    .getRouter(); //"getRouter" возвращает express.Router объект

//UIKernel не генерирует delete метод, нам прийдётся реализовать его
router.delete('/:recordId', function (req, res, next) {
    model.delete(req.params.recordId)
    .then(function () {
        res.end();
    })
    .catch(function (err) {
        next(err);
    })
});

module.exports = router; //Роутер модуля передаётся в главный роутер приложения
{% endhighlight %}

Обратите внимание на объект который передаётся в `.model()`
{% highlight javascript %}
var router = UIKernel.gridExpressApi()
    .model(model)// <--
    .getRouter();
});
{% endhighlight %}

Этот обьект должен реализовывать методы описанные в [Grid Model](/docs/grid-interface.html)<br>
Подробнее об `gridExpressApi` можно почитать [здесь](/docs/grid-express-api.html)

Использование `gridExpressApi` не является обязательным.
Вы можете реализовать роутинг любым удобным способом, главное что бы он обрабатывал необходимые для клиентской модели [роуты](/docs/grid-express-api.html) .

