angular.module('userCtrl', [])
	.controller('userController', ['$scope', '$http', 'Notification', function ($scope, $http, Notification) {
        $scope.showRoleList = false;

        $scope.userInit = function() {
            $http.get('/users').then((user) => {
                $scope.userList = user.data;
            }).catch((error) => {
                Notification.error(error.data);
            })
            $http.get('/roles').then(roles => {
                $scope.roles = roles.data;
            }).catch(() => {
                $scope.roles = [];
            })
        };

        $scope.changeRole = function(){
            $scope.showRoleList = true;
        };

        $scope.editUser = function(user) {
            $scope.showRoleList = false;
            $scope.updatedData = user;
            $scope.userRoles = user.roles
            $('#userEditModal').modal('show');
        };

        $scope.updateUser = function(user,selectedRole){
            if($scope.showRoleList){
                var role = JSON.parse(selectedRole);
                delete user.roles;
                user.roles = role._id;
            }

            $http.put(`/updateUser/${user._id}`, user).then((user) => {
                $('#userEditModal').modal('hide');
                Notification.success('Successfully updated the user');
                $scope.userInit();
            }).catch((error) => {
                Notification.error(error.data);
            })
        };

        $scope.deleteUser = function(user){
            var deleteUser = confirm("Are you sure you want to delete user");
            if(deleteUser){
                $http.put(`/updateUser/${user._id}`, {is_deleted:true}).then((user) => {
                    $('#userEditModal').modal('hide');
                    Notification.success('Successfully deleted the user');
                    $scope.userInit();
                }).catch((error) => {
                    Notification.error(error.data);
                })
            }
        };

        $scope.createUser = function() {
            $('#userCreateModal').modal('show');
        };

        $scope.saveUser = function(role) {
            var role = JSON.parse(role);
            var userData = {
                email: $scope.email,
                username: $scope.username,
                password: $scope.password,
                displayName: $scope.displayName,
            };
            if(role && role._id){
                userData.roles = role._id;
                $http.post('/signup', userData).then(function (res) {
                    Notification.success('Successfully created the user');
                    $('#userCreateModal').modal('hide');
                    $scope.userInit();
                }).catch(function(error){
                    Notification.error(error.data);
                });
            }else{
                Notification.error('Please select role to proceed')
            }
        }
    }])