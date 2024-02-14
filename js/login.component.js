angular.module('moviesApp')
    .component('loginComponent', {
        templateUrl: './templates/login.component.html',
        controller: 'LoginComponentController',
        controllerAs: '$ctrl'
    })
    .controller('LoginComponentController', function(AuthService) {
        var $ctrl = this;

        $ctrl.user = {};
        $ctrl.loginError = '';

        $ctrl.login = function() {
            AuthService.login($ctrl.user)
                .then(function(response) {
                    console.log('Login successful');
                    alert('Login successful');
                })
                .catch(function(error) {
                    console.log('Login failed:', error);
                    $ctrl.loginError = 'Invalid username or password';
                });
        };
    });
