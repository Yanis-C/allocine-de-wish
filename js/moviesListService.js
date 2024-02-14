angular
    .module('moviesApp')
    .factory('moviesListService', function($rootScope, $http) {

        var movies = JSON.parse(localStorage.getItem('movies_list')) || [];

        function addRatingsSum(movies){
            movies.forEach(function(movie) {
                let sum = 0
                movie.ratings.forEach(function(rating) {
                    sum += parseFloat(rating);
                }) 
                movie.rating_count = movie.ratings.length;
                if (movie.vote_count_api && movie.vote_moy_api) {
                    movie.rating_count = movie.ratings.length + movie.vote_count_api;
                    sum += movie.vote_moy_api * movie.vote_count_api;
                }
                movie.rating_moy = sum > 0 ? (sum / movie.rating_count).toFixed(2) : "Pas de note";
            })
            return movies;
        }
        
        return {
            getMoviesList: function() {
                return movies;
            },
            setMoviesList: function(new_movies) {
                localStorage.setItem('movies_list', angular.toJson(addRatingsSum(new_movies)));
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
                        ratings: [],
                        rating_moy: (movie.vote_average / 2).toFixed(2),
                        rating_count: Math.floor(Math.random() * 100) + 1, //fausse valeur, mieux pour les tests
                        vote_count_api: Math.floor(Math.random() * 100) + 1,
                        vote_moy_api: (movie.vote_average / 2).toFixed(2)
                    }

                    /*let sum = 0
                    movie_formatted.ratings.forEach(function(rating) {
                        sum += parseInt(rating);
                    }) 
                    movie_formatted.rating_count = movie_formatted.ratings.length;
                    movie_formatted.rating_moy = sum > 0 ? (sum / movie_formatted.ratings.length).toFixed(2) : "Pas de note";*/

                    movies_formatted.push(movie_formatted);

                });
                
                return movies_formatted;
            }

        };
});