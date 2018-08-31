angular.module('loginCtrl', [])
.controller('loginController', ['$scope', 'Notification', '$http', '$state', function ($scope,Notification, $http, $state) {
    // $scope.signup = function () {
    //     var userData = {
    //         email: $scope.email,
    //         username: $scope.username,
    //         password: $scope.password
    //     };
    //     $http.post('/signup', userData).then(function (res) {
    //         Notification.success('Success Signup');
    //         $state.go('adminDashboard');
    //     }).catch(function(error){
    //         Notification.error(error.data);
    //     });
    // };

    $scope.login = function() {
        var loginData = {
            emailOrUsername:$scope.emailOrUsername,
            password: $scope.password
        };
        $http.post('/login', loginData).then(function (res) {
            Notification.success('Success Login');
            $state.go('adminDashboard');
        }).catch(function(error){
            Notification.error(error.data);
        })
    }
}]);