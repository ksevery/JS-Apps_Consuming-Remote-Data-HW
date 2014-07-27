require.config({
    paths: {
        jquery: 'libs/jquery-2.1.1.min',
        q: 'libs/q',
        httpRequester: 'http-requester'
    }
});
require(['httpRequester', 'jquery'], function(){
    var url = 'http://localhost:3000/students';
    var headers = {
        'accept': 'application/json'
    };

    var studentPesho = {
        name: 'Pesho',
        grade: 12
    };
    var studentMarche = {
        name: 'Mariq',
        grade: 2
    };
    var studentGosho = {
        name: 'Georgi',
        grade: 5
    };

    HttpRequester.postJSON(url, studentGosho, headers)
        .then(function () {
            var text = $('<h1> Data stored </h1>');
            $('#result').append(text);
        })
        .then(HttpRequester.postJSON(url, studentPesho, headers))
        .then(HttpRequester.postJSON(url, studentMarche, headers));

    HttpRequester.getJSON(url, headers)
        .then(function (data) {
            var dataAsObj = JSON.parse(data);
            var currStudent,
                list,
                listItem,
                wrapper;

            list = $('<ul class="students-list"></ul>');

            for(var i = 0, len = dataAsObj.count; i < len; i++){
                currStudent = dataAsObj.students[i];
                listItem = $('<li />').html(currStudent.name + ' is in ' + currStudent.grade + ' grade');
                list.append(listItem);
            }

            wrapper = $('#result').append(list);
        }, function (err) {
            console.log('Something is wrong! ' + err.status);
        })
});
