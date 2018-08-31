angular.module('whatwedoCtrl', [])
	.controller('WhatWeDoController', ['$scope', '$http', 'Notification', function ($scope, $http, Notification) {

        $scope.createSection = function() {
            $('#sectionCreateModal').modal('show');
        }

        $scope.saveSection = function() {
            console.log("**********heading*************",$scope.heading);
            console.log("***********descriptionType************",$scope.descriptionType);
            console.log("*******description****************",$scope.description)
            console.log("*********bannerImage**************",$scope.file)
            console.log("**********sequence*************",$scope.sequence)
            console.log("*************alignment**********",$scope.alignment)
            console.log("*************language**********",$scope.language)
            console.log("***********isDeleted************",$scope.isDeleted)
            if($scope.descriptionType=='Image' || $scope.descriptionType=='Video'){
                if(!$scope.file){
                    Notification.error('Please upload file')
                }
            }else{
                if(!$scope.description){
                    Notification.error('Please upload description')
                }
            }
            var data = {
                heading: $scope.heading,
                description: $scope.description,
                file: $scope.file,
                sequence: $scope.sequence,
                alignment: $scope.alignment,
                descriptionType: $scope.descriptionType,
                language: $scope.language,
                isDeleted: $scope.language
            }
            $http.post('/saveWhatWeDo',data).then((data) => {

            }).catch((error) => {
                Notification.error(error.data);
            })
        }

        // $scope.getBaseUrl = function()  {
        //     var file    = document.querySelector('input[type=file]')['files'][0];
        //     var reader  = new FileReader();
        //     var baseString;
        //     reader.onloadend = function () {
        //         baseString = reader.result;
        //     };
        //     console.log(baseString); 
        //     $scope.bannerImage = baseString;
        // }
    }])