angular
    .module('moviesApp')
    .controller('moviesCtrl', function($scope, moviesListService) {
    
        $scope.movies = moviesListService.getMoviesList();
        console.log($scope.movies);
    
    });