angular.module('moviesApp.controllers', [])
    .controller('moviesCtrl', function ($scope) {

        $scope.movies = [
            {
                "title": "Inception",
                "desc": "Un voleur habile vole des secrets précieux en pénétrant dans l'esprit de ses cibles lorsqu'elles sont le plus vulnérables : pendant leurs rêves.",
                "ratings": [5, 5, 4, 5, 4, 4, 5, 4, 4],
                "comments": []
            },
            {
                "title": "Catwoman",
                "desc": "Une femme timide et maladroite se transforme en une justicière dotée de pouvoirs de catégorie féline après avoir été impliquée dans un mystérieux complot.",
                "ratings": [1, 2, 1, 2, 1, 2, 1],
                "comments": []
            },
            {
                "title": "Le Parrain",
                "desc": "Le chef d'une famille criminelle américaine transfère progressivement le pouvoir à son fils.",
                "ratings": [5, 4, 5],
                "comments": []
            },
            {
                "title": "Pulp Fiction",
                "desc": "Une série d'histoires entrelacées sur la violence et le crime à Los Angeles.",
                "ratings": [4, 5, 4, 5, 4, 5, 4, 5],
                "comments": []
            },
            {
                "title": "Interstellar",
                "desc": "Un groupe d'explorateurs utilise un trou de ver découvert récemment pour dépasser les limites du voyage spatial humain et conquérir les vastes distances impliquées dans un voyage interstellaire.",
                "ratings": [5, 5, 4, 5, 4, 4, 5],
                "comments": []
            }
        ];


    });