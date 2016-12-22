---
title: Создание модели
id: server_model
prev: server_validation.html
next: editors.html
---

Мы используем [MySQL](https://github.com/mysqljs/mysql) и [Squel](https://hiddentao.com/squel/) для формирования запросов.<br>
Реализуем метод `read`:

`userGrid/model.js`:
{% highlight javascript %}
read: function (settings, cb) {
        var data = {};
        var query = squel.select()
            .field('SQL_CALC_FOUND_ROWS *')
            .from('getting_started')
            .limit(settings.limit || 10)
            .offset(settings.offset || 0);

        if (settings.sort) {
            var sort = settings.sort[0];
            query.order(sort[0], sort[1] === 'asc');
        }
        query.order('name', true);

        if (settings.filters) {
            if (settings.filters.search) {
                var pattern = `%${settings.filters.search}%`;
                query.where('name LIKE ? OR surname LIKE ?', pattern, pattern);
            }
            if (settings.filters.age) {
                query.where('age = ?', settings.filters.age);
            }
            if (settings.filters.gender) {
                query.where('gender = ?', settings.filters.gender);
            }
        }

        mysql.query(query)
            .then(function (result) {
                data.records = result.map(function (elem) {
                    return [elem.id, elem]; //формируем массив данных
                });
                return mysql.query('SELECT FOUND_ROWS() as count')
            })
            .then(function (result) {
                data.count = result[0].count;
                cb(null, data);
            })
            .catch(function (err) {
               cb(err);
            });
}
{% endhighlight %}

Параметры запроса приходят в объекте `settings`. Они используются для фильтров и пагинации.
Важно обратить внимание на эту часть:
{% highlight javascript %}
data.records = result.map(function (elem) {
                    return [elem.id, elem];
                });
                return mysql.query('SELECT FOUND_ROWS() as count')
{% endhighlight %}

Данные которые мы отсылаем на клиент должны находится в свойстве `records`.
Это должен быть массив состоящий из масивов, которые первым елементом содержат индитификатор, а вторым данные для отображения.
Например:
{% highlight javascript %}
[
   [1, {id:1, name: "Sonya", surname: "Weaver", phone: "555-0159", age: 59, gender: 1}],
   [2, {id:2, name: "Bates", surname: "Weaver", phone: "555-0144", age: 54, gender: 2}],
   [3, {id:3, name: "Rodriguez", surname: "Terrell", phone: "555-0146", age: 40, gender: 2}]
]
{% endhighlight %}
Так же, мы используем свойство `count`, для передачи количества всех записей.
Подробнее о формате ответов на запросы можно почитать [здесь](/docs/grid-interface.html)

Реализуем методы валидации:
{% highlight javascript %}
isValidRecord: validator.isValidRecord,

// Вспомагательный метод, реализовывать не обязательно
isValidRecordAsync: promisify(validator.isValidRecord),
{% endhighlight %}

Метод для получения поля по id:
{% highlight javascript %}
getRecord: function (id, cols, cb) {
        var query = squel.select()
            .from('getting_started')
            .where('id = ?', id);

        return mysql.query(query)
            .then(function (result) {
                var record = result[0];
                if (cb)
                    cb(null, record);
                return record;
            })
            .catch(function (err) {
                console.log(err);
                if (cb)
                    cb(err);
                return err;
            })
}
{% endhighlight %}

Реализуем метод `create`:
{% highlight javascript %}
create: function (data, cb) {
// Валидатор UIKernel не умеет проверять наличее полей, потому назначим значения по умолчанию
        data = Object.assign({
            name: '',
            surname: '',
            age: '',
            phone: '',
            gender: ''
        }, data);

        var query = squel.insert()
            .into("getting_started")
            .setFields(data);

        this.isValidRecordAsync(data)
            .then(function (validationErrors) {
                if (validationErrors.isEmpty()) {// Если валидация успешна, записываем данные в базу
                    return mysql.query(query);
                }
                else return Promise.reject(validationErrors);// если валидация не успешна, возвращаем объект валидации
            })
            .then(function (result) {
                cb(null, result.insertId) //после успешного создания записи, возвращаем её id
            })
            .catch(function (err) {
                cb(err);
            })
}
{% endhighlight %}

Если от сервера прийдёт объект валидации, то форма создания записи подсветит поля что не прошли проверку.

Реализуем метод `update`:
{% highlight javascript %}
update: function (records, cb) {
        var self = this;
        var promises = records.map(function (record) {
            var recordId = record[0];
            var values = record[1];
            var query = squel.update()
                .table('getting_started')
                .setFields(values)
                .where('id = ?', recordId);

            return self.isValidRecordAsync(values)
                .then(function (validationErrors) {
                    if (validationErrors.isEmpty()) {// Если валидация успешна, обновляем данные в базе
                        return mysql.query(query)
                            .then(function () {
                                return self.getRecord(recordId);//возвращаем объекты которые были изменены
                            })
                            .then(function (record) {
                                return [record.id, record]
                            })
                    }
                    else return [recordId, validationErrors];// если валидация не успешна, возвращаем объект валидации
                });
        });

        Promise.all(promises)
            .then(function (result) {
                cb(null, result) //Массив содержащий объекты валидации и изменения записей базы
            })
            .catch(function (err) {
                cb(err);
            })
    },
{% endhighlight %}

Метод `update` должен возвращать объекты валидации и изменения записей базы.
Валидации используются для отображения неправильно заполненых полей при изменении данных.
Объекты изменений нужны для обновления клиентской модели.
Формат данных ответа сервера такой же как и при вызове метода `read`.

Реализуем метод `delete`:
{% highlight javascript %}
 delete: function (id) {
        var query = squel.delete()
            .from("getting_started")
            .where('id = ?', id);
        return mysql.query(query)
    }
{% endhighlight %}

Формат ответа метода `delete` произвольный. Зависит от реализации `delete` клиентской модели.