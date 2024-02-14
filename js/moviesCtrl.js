angular
    .module('moviesApp')
    .controller('moviesCtrl', function($scope, moviesListService) {
    
        $scope.movies = moviesListService.getMoviesList();
        if ($scope.movies.length == 0) {
            //récupération par api
            moviesListService.getMoviesAPIRequest().then(function(data) {
                let movies = moviesListService.formatAPIMovies(data.results);
                moviesListService.setMoviesList(movies);
            }).catch(function(error) {
                console.log("Error: ", error);
            });
        }

        $scope.$on('moviesChanged', function(event, newMovies) {
            $scope.movies = newMovies;
		});

        $scope.order= "alphabetical";
        $scope.getOrder = function() {
            if ($scope.order == "alphabetical") {
                this.reverse = false;
                return 'title';
            } else {
                this.reverse = true;
                return 'rating_moy'
            }
        }

        $scope.redirectMovie = function(id) {
            window.location.href = "#!/movie/" + id
        }
    
    });