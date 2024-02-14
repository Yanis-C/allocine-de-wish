angular
    .module('moviesApp')
    .controller('moviePageCtrl', function($scope, $routeParams, moviesListService) {
        
        let ref_movie = $routeParams.ref_movie;

        let movies = moviesListService.getMoviesList();

        $scope.movie = movies.find(movie => movie.ref_movie == ref_movie);
        console.log(ref_movie, movies);

    })