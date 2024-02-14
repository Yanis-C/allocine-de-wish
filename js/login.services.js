angular.module('moviesApp')
    .service('AuthService', function ($q) {
        var users = [
            { name: "junior", password: "1234" }
        ];

        this.connected_user = JSON.parse(localStorage.getItem('connected_user')) || {};
        console.log(this.connected_user);

        this.login = function (user) {
            var deferred = $q.defer();
            var found = false;
            var connect_user = {};

            users.forEach(userBdd => {
                if (userBdd.name == user.username && userBdd.password == user.password) {
                    found = true;
                    connect_user = userBdd;
                }
            });

            if (found && connect_user) {
                deferred.resolve('Login successful');
                localStorage.setItem('connected_user', angular.toJson(connect_user))
                this.connected_user = JSON.parse(localStorage.getItem('connected_user')) || {};
                console.log(this.connected_user);
                window.location.href = "#!/";
            } else {
                deferred.reject('Invalid username or password');
            }

            return deferred.promise;
        };

        this.logout = function() {
            localStorage.removeItem('connected_user');
            this.connected_user = JSON.parse(localStorage.getItem('connected_user')) || {};
            console.log(this.connected_user);
        }

        this.isUserLogged = function() {
            return (typeof this.connected_user != 'undefined' && typeof this.connected_user.name != 'undefined');
        }
    });
