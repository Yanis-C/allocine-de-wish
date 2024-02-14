angular
    .module('moviesApp')
    .controller('moviePageCtrl', function($scope, $routeParams, moviesListService, AuthService) {
        
        let ref_movie = $routeParams.ref_movie;

        var movies = moviesListService.getMoviesList();
        var movie_index = movies.findIndex(movie => movie.ref_movie == ref_movie);

        $scope.movie = movies[movie_index];
        console.log(movie_index, $scope.movie);

        $scope.isUserLogged = AuthService.isUserLogged();
        $scope.isMovieRated = AuthService.isMovieRated($scope.movie.ref_movie);

        $scope.$on('moviesChanged', function(event, newMovies) {
            movies = newMovies;
            movies.findIndex(movie => movie.ref_movie == ref_movie);
            $scope.movie = movies[movie_index];
		});

        $scope.$on('connectUserChanged', function(event, newConnectUser) {
            console.log(newConnectUser);
            $scope.isUserLogged = AuthService.isUserLogged();
            $scope.isMovieRated = AuthService.isMovieRated($scope.movie.ref_movie);
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
            AuthService.rateMovie($scope.movie.ref_movie);
            $scope.new_rating = 1;
        }
    })