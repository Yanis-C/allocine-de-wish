angular
    .module('moviesApp')
    .controller('indexCtrl', function($scope, AuthService) {
    
        this.isUserLogged = AuthService.isUserLogged();

        let vm=this;
        $scope.$on('connectUserChanged', function(event, newConnectUser) {
            vm.isUserLogged = AuthService.isUserLogged();
		});

        this.logout = function() {
            AuthService.logout();
        }
    
    });