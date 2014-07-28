define(['q', 'jquery'], function (Q) {
    window.HttpRequester = (function () {
        function getJSON(requestUrl, headers) {
            var deferred = Q.defer();

            $.ajax({
                url:requestUrl,
                type: 'GET',
                dataType: 'json',
                headers: headers,
                success: function (data) {
                    deferred.resolve(data);
                },
                error: function (err) {
                    deferred.reject(err);
                }
            });

            return deferred.promise;
        }

        function postJSON(requestUrl, data, headers) {
            var deferred = Q.defer();

            $.ajax({
                url: requestUrl,
                type: 'POST',
                dataType: 'json',
                data: data,
                headers: headers,
                success: function (data) {
                    deferred.resolve(data)
                },
                error: function (err) {
                    deferred.reject(err)
                }
            });

            return deferred.promise;
        }

        function deleteById(requestUrl, id){
            var deferred = Q.defer();

            $.ajax({
                url: requestUrl + '/' + id + '/',
                type: 'POST',
                data: { _method: 'delete'},
                success: function (data) {
                    deferred.resolve(data);
                },
                error: function (err) {
                    deferred.reject(err);
                }
            });

            return deferred.promise;
        }

        return {
            getJSON: getJSON,
            postJSON: postJSON,
            deleteById: deleteById
        }
    }());
});

