angular.module('moviesApp.services', [])
    .service('AuthService', function ($q) {
        var users = [
            { name: "junior", password: "1234" }
        ];

        this.login = function (user) {
            var deferred = $q.defer();
            var found = false;

            users.forEach(userBdd => {
                if (userBdd.name == user.username && userBdd.password == user.password) {
                    found = true;
                }
            });

            if (found) {
                deferred.resolve('Login successful');
            } else {
                deferred.reject('Invalid username or password');
            }

            return deferred.promise;
        };
    });
