angular
    .module('moviesApp')
    .factory('moviesListService', function($rootScope) {

    //Prendre depuis le local storage si dispo, sinon récupérer la liste de base
    var movies = [
        {
            "title": "Inception",
            "desc": "Un voleur habile vole des secrets précieux en pénétrant dans l'esprit de ses cibles lorsqu'elles sont le plus vulnérables : pendant leurs rêves.",
            "ratings": [5, 5, 4, 5, 4, 4, 5, 4, 4],
            "comments": [],
            "ref_movie": "inception"
        },
        {
            "title": "Catwoman",
            "desc": "Une femme timide et maladroite se transforme en une justicière dotée de pouvoirs de catégorie féline après avoir été impliquée dans un mystérieux complot.",
            "ratings": [1, 2, 1, 2, 1, 2, 1],
            "comments": [],
            "ref_movie": "catwoman"
        },
        {
            "title": "Le Parrain",
            "desc": "Le chef d'une famille criminelle américaine transfère progressivement le pouvoir à son fils.",
            "ratings": [5, 4, 5],
            "comments": [],
            "ref_movie": "parrain"
        },
        {
            "title": "Pulp Fiction",
            "desc": "Une série d'histoires entrelacées sur la violence et le crime à Los Angeles.",
            "ratings": [4, 5, 4, 5, 4, 5, 4, 5],
            "comments": [],
            "ref_movie": "pulp_fiction"
        },
        {
            "title": "Interstellar",
            "desc": "Un groupe d'explorateurs utilise un trou de ver découvert récemment pour dépasser les limites du voyage spatial humain et conquérir les vastes distances impliquées dans un voyage interstellaire.",
            "ratings": [5, 5, 4, 5, 4, 4, 5],
            "comments": [],
            "ref_movie": "interstellar"
        }
    ];
    
    return {
        getMoviesList: function() {
            return movies;
        },
        setMoviesList: function(new_movies) {
            movies = new_movies;
			$rootScope.$broadcast('dataChanged',movies);
            // Enregistrer localstorage
        }
    };
});