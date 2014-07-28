require.config({
    paths: {
        jquery: '../libs/jquery-2.1.1.min',
        oauth: '../libs/oauth.min'
    }
});

require(['oauth', 'jquery'], function () {
    function getAuth() {
        OAuth.initialize('xqHCNPxId0ep23NuqqP2JK-5Pcc');
        var authPromise = OAuth.popup('twitter', {
            cache: true
        });

        return authPromise;
    }

    $('#authorize').on('click', function () {
        getAuth()
            .done(function () {
                console.log('Successful login!');
        })
    });

    $('#get-tweets').on('click', function () {
        var username = $('#username').val();
        var count = parseInt($('#count').val());
        if(isNaN(count)){
            count = 20;
        }

        var requestUrl = 'https://api.twitter.com/1.1/statuses/user_timeline.json?count=' + count + '&screen_name=' + username;

        getAuth()
            .done(function (result) {
                result.get(requestUrl)
                    .done(function (response) {
                        var result,
                            list,
                            listItem,
                            listContainable,
                            name,
                            message;

                        result = $('#result').empty();
                        list = $('<ul class="tweets-list"/>');

                        for(var i = 0, len = response.length; i < len; i++){
                            name = response[i].user.name;
                            message = response[i].text;
                            listItem = $('<li />');
                            listContainable = $('<div class="tweet-contents" />').html(name + ': ' + message);
                            listItem.append(listContainable);
                            list.append(listItem);
                        }

                        result.append(list);
                    })
            })
    })

});
