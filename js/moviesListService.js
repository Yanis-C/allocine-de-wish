angular
    .module('moviesApp')
    .factory('moviesListService', function($rootScope, $http) {

        var movies = JSON.parse(localStorage.getItem('movies_list')) || [];
        
        return {
            getMoviesList: function() {
                return movies;
            },
            setMoviesList: function(new_movies) {
                localStorage.setItem('movies_list', angular.toJson(new_movies));
                movies = JSON.parse(localStorage.getItem('movies_list'));
                $rootScope.$broadcast('moviesChanged',movies);
            },
            getMoviesAPIRequest: function() {
                return $http({
                    method: 'GET',
                    url: "https://api.themoviedb.org/3/movie/top_rated?language=fr-FR&page=1&api_key=cc2dec245b0e4503e91dadeaf282eca4"
                }).then(function successCallback(response) {
                    return response.data;
                }, function errorCallback(response) {
                    return response;
                });
            },
            formatAPIMovies : function(movies) {
                let movies_formatted = [];
                movies.forEach(function(movie) {
                    let movie_formatted = {
                        title: movie.title,
                        desc: movie.overview,
                        id: movie.id,
                        img: movie.backdrop_path,
                        img_2: movie.poster_path,
                        comments: [],
                        ratings: []
                    }

                    //Rajouter des avis aléatoires ?
                    let sum = 0
                    movie_formatted.ratings.forEach(function(rating) {
                        sum += parseInt(rating);
                    }) 
                    movie_formatted.rating_count = movie_formatted.ratings.length;
                    movie_formatted.rating_moy = sum > 0 ? (sum / movie_formatted.ratings.length).toFixed(2) : "Pas de note";

                    movies_formatted.push(movie_formatted);

                });
                
                return movies_formatted;
            }

        };
});