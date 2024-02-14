angular
    .module('moviesApp')
    .controller('moviePageCtrl', function($scope, $routeParams, moviesListService, AuthService) {
        
        let id = $routeParams.id;

        var movies = moviesListService.getMoviesList();
        if (movies.length == 0) {
            //récupération par api
            moviesListService.getMoviesAPIRequest().then(function(data) {
                movies = moviesListService.formatAPIMovies(data.results);
                moviesListService.setMoviesList(movies);
            }).catch(function(error) {
                console.log("Error: ", error);
            });
        }

        var movie_index = movies.findIndex(movie => movie.id == id);

        $scope.movie = movies[movie_index];
        console.log(movie_index, $scope.movie);

        $scope.isUserLogged = AuthService.isUserLogged();
        $scope.isMovieRated = AuthService.isMovieRated($scope.movie.id);

        $scope.$on('moviesChanged', function(event, newMovies) {
            movies = newMovies;
            movies.findIndex(movie => movie.id == id);
            $scope.movie = movies[movie_index];
            $scope.isMovieRated = AuthService.isMovieRated($scope.movie.id);
		});

        $scope.$on('connectUserChanged', function(event, newConnectUser) {
            console.log(newConnectUser);
            $scope.isUserLogged = AuthService.isUserLogged();
            $scope.isMovieRated = AuthService.isMovieRated($scope.movie.id);
		});

        $scope.sendComment = function() {
            movies[movie_index]['comments'].push($scope.new_comment);
            //Send
            moviesListService.setMoviesList(movies);
            $scope.new_comment = "";
        }

        $scope.sendRate = function() {
            movies[movie_index]['ratings'].push(parseInt($scope.new_rating));
            //Send
            moviesListService.setMoviesList(movies);
            AuthService.rateMovie($scope.movie.id);
            $scope.new_rating = 1;
        }
    })