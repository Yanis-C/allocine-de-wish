let app = angular.module('moviesApp', ['ngRoute']);

app.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: './templates/home.html',
            controller: 'moviesCtrl'
        })

        .when('/movie/:ref_movie', {
            templateUrl: './templates/movie_page.html',
            controller: 'moviePageCtrl'
        })

        .when('/login', {
            templateUrl: './templates/login.html'
        })

        .otherwise({ redirectTo: '/' });
})