angular
    .module('moviesApp')
    .controller('indexCtrl', function($scope, AuthService) {
    
        console.log(AuthService);

        this.test = "test";

        this.isUserLogged = AuthService.isUserLogged();
        this.logout = function() {
            AuthService.logout();
        }
        console.log(this.isUserLogged);
    
    });