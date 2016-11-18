---
title: Серверная часть
id: server_side
prev: tutorial.html
next: server_routes.html
---
* [Live demo](/examples/creating-records/){:target="_blank"}
* [Code]({{ site.github }}/examples/creating-records){:target="_blank"}

В этом туториале мы напишем серверную часть приложения которое будет использовать UIKernel.
Мы будем использовать Node.js, Express и MySql.

Приложение будет иметь такую структуру:

{% highlight html %}
|-- api
    |-- common
        MySQL.js
    |-- modules
        |-- modules
            |--userGrid
                model.js
                router.js
                validations.js
         routers.js
* клиентская часть описана в предыдущем туториале
|-- client
|--config
package.json
server.js
{% endhighlight %}

Необходимые для работы модули описаны в `package.json`, скопируйте его себе в проект и выполните в консоли `npm i`.

Настроим сервер:
`server.js`:
{% highlight javascript %}
var express = require('express');
var bodyParser = require('body-parser');
var api = require('./api/routers');
var config = require('config');

var app = express();

app.use(bodyParser.json());
app.use('/', express.static('./client'));
//для клиентской части приложения будем использовать библиотеку UIKernel из "node_modules"
app.use('/node_modules', express.static('./node_modules'));

//подключаем роуты
api.use(app);

//обработка ошибок
app.use(function (err, req, res, next) {
    console.error(err);
    var statusCode = err.statusCode || 500;
    var message = statusCode ? 'Internal Server Error' : err.message;
    res
        .status(statusCode)
        .send(message);
});

var PORT = process.env.PORT || config.get('defaultPort');

app.listen(PORT, function () {
    console.log(`All listening on port ${PORT}!`);
});
{% endhighlight %}

Главный роутер нашего приложения:
`routers.js`:
{% highlight javascript %}
var grid = require('./modules/userGrid/router');

module.exports.use = function (app) {
    app.use('/api/userGrid', grid);
};
{% endhighlight %}

Далее займёмся настройкой роутов наших модулей.