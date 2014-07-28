require.config({
    paths: {
        jquery: '../libs/jquery-2.1.1.min',
        httpRequester: '../http-requester',
        q: '../libs/q'
    }
});

require(['jquery', 'httpRequester'], function ($) {
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
        .then(HttpRequester.postJSON(url, studentPesho))
        .then(HttpRequester.postJSON(url, studentMarche));

    $('#delete').on('click', function () {
        var id = parseInt($('#delete-student').val());
        if(!(isNaN(id))){
            HttpRequester.deleteById(url, id)
                .then(HttpRequester.getJSON(url)
                    .then(function (data) {
                        drawStudentsList(data);
                    }, function () {
                        var error = $('<div />').css('background-color', 'red').html('Could not delete!');
                        $('#result').empty().append(error);
                }))
        }
    });

    $('#get-students').on('click', function (){
        HttpRequester.getJSON(url)
            .then(function(data){
                drawStudentsList(data);
            });
    });

    $('#clear').on('click', function () {
        $('#result').empty();
    });


    function drawStudentsList(data) {
        var result,
            list,
            listItem;

        result = $('#result').empty();
        list = $('<ul/>').addClass('students-list');

        for(var i = 0, len = data.count; i < len; i++){
            listItem = $('<li/>').html(data.students[i].name + ' in grade ' + data.students[i].grade + '. ID: ' + data.students[i].id);
            list.append(listItem);
        }

        result.append(list);
    }
});


