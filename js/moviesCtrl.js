angular
    .module('moviesApp')
    .controller('moviesCtrl', function($scope, moviesListService) {
    
        $scope.movies = moviesListService.getMoviesList();
        console.log($scope.movies);

        $scope.redirectMovie = function(ref_movie) {
            window.location.href = "#!/movie/" + ref_movie
        }
    
    });