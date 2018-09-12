angular.module('galleryCtrl', [])
	.controller('galleryController', ['$scope', '$location', '$rootScope', '$http', function ($scope, $location, $rootScope, $http) {
        $scope.galleryInit = function(){
            $http.get('/fetchGallery').then((data)=>{
                $scope.allMedia = data.data;
            }).catch((error)=>{
                Notification.error(error.data);
            })
        };

        $scope.createGallery = function() {
            $('#createGalleryModal').modal('show');
        };

        $scope.addGallery = function() {
            var data = {
                language: $scope.language,
                description: $scope.description,
                fileType: $scope.fileType,
                file: $scope.file,
                isDeleted: $scope.isDeleted
            };
            $http.post('/saveGallery',data).then((data)=>{
                $('#createGalleryModal').modal('hide');
                $scope.galleryInit();
                $scope.clearValues();
            }).catch((err)=>{
                Notification.error(error.data);
            })
        };

        $scope.clearValues = function(){
            $scope.language = '';
            $scope.description = '';
            $scope.filetype ='';
            $scope.file = '';
        };

        $scope.editGallery = function(data){
            $scope.galleryData = data;
            $('#updateGalleryModal').modal('show')
        };

        $scope.updateGallery = function(){
            $http.put(`/updateGallery/${$scope.galleryData._id}`, $scope.galleryData).then((data)=>{
                $('#updateGalleryModal').modal('hide');
                $scope.galleryInit();
                $scope.clearValues();
            }).catch((err)=>{
                Notification.error(err.data);
            })
        }
    }])