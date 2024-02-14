angular.module('moviesApp')
    .service('AuthService', function ($q, $rootScope) {
        var users = JSON.parse(localStorage.getItem('users')) || [{ name: "user", password: "1234" }];
        var found = false;

        this.connected_user = JSON.parse(localStorage.getItem('connected_user')) || {};
        console.log(this.connected_user);

        this.login = function (user) {
            var deferred = $q.defer();
            var connect_user = {};

            users.forEach((userBdd, index) => {
                if (userBdd.name == user.username && userBdd.password == user.password) {
                    found = true;
                    connect_user = userBdd;
                    connect_user.key = index;
                }
            });

            if (found && connect_user) {
                deferred.resolve('Login successful');
                this.setConnectedUser(connect_user);
                window.location.href = "#!/";
            } else {
                deferred.reject('Invalid username or password');
            }

            return deferred.promise;
        };

        this.sign = function (user) {
            var deferred = $q.defer();

            users.forEach(userBdd => {
                if (userBdd.name == user.username) {
                    found = true;
                }
            })

            if (found) {
                deferred.reject('User already exist!');
                found = false;
            } else {
                if (user.password == user.passwordConfirm) {
                    var newUser = {
                        name: user.username,
                        password: user.password
                    }

                    users.push(newUser);
                    this.setUsers(users);
                    deferred.resolve('Sign Up successful');
                } else {
                    deferred.reject('Verify your passwords');
                }
            }

            return deferred.promise;
        };

        this.logout = function() {
            localStorage.removeItem('connected_user');
            this.connected_user = JSON.parse(localStorage.getItem('connected_user')) || {};
            $rootScope.$broadcast('connectUserChanged', this.connected_user);
        }

        this.isUserLogged = function() {
            return (typeof this.connected_user != 'undefined' && typeof this.connected_user.name != 'undefined');
        }

        this.isMovieRated = function(id) {
            if (typeof this.connected_user.rated_movies == 'undefined') return false;
            //Check if the movie is already rated by user
            let movie_rated = this.connected_user.rated_movies.find(movie => movie == id);
            return (typeof movie_rated != 'undefined');
        }

        this.rateMovie = function(id) {
            if (typeof this.connected_user.rated_movies) {
               this.connected_user.rated_movies = [];
            }
            this.connected_user.rated_movies.push(id);
            this.setConnectedUser(this.connected_user);
        }

        this.setUsers = function(users) {
            localStorage.setItem('users', angular.toJson(users))
            users = JSON.parse(localStorage.getItem('users')) || {};
            $rootScope.$broadcast('usersChanged', users);
        }

        this.setConnectedUser = function(connect_user) {
            localStorage.setItem('connected_user', angular.toJson(connect_user))
            this.connected_user = JSON.parse(localStorage.getItem('connected_user')) || {};
            $rootScope.$broadcast('connectUserChanged', this.connected_user);
            users[this.connected_user.key] = connect_user;
            this.setUsers(users);
        }
    });
