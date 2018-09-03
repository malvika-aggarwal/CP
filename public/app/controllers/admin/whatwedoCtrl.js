angular.module('whatwedoCtrl', [])
	.controller('WhatWeDoController', ['$scope', '$http', 'Notification', '$sce', '$location', function ($scope, $http, Notification, $sce, $location) {

        $scope.baseUrl = `${$location.protocol()}://${$location.host()}:${$location.port()}/`;
        $scope.createSection = function() {
            $('#sectionCreateModal').modal({backdrop: 'static'});
        }

        $scope.saveSection = function() {
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
                isDeleted: $scope.isDeleted
            }
            $http.post('/saveWhatWeDo',data).then((data) => {
                Notification.success('Section successfully created');
                $('#sectionCreateModal').modal('hide');
                $scope.whatwedoInit();
            }).catch((error) => {
                Notification.error(error.data);
            })
        };

        $scope.whatwedoInit = function(){
            $scope.showMediaChange = false;
            $http.get('/getSectionForWhatWeDo').then((sections)=>{
                $scope.allSection = sections.data;
            }).catch((error)=>{
                $scope.allSection = [];
                Notification.error(error.data);
            })
        };

        $scope.returnDescription = function(html) {
            return $sce.trustAsHtml(html);
        };

        $scope.editSection = function(section){
            $scope.sectionData = section;
            $('#sectionUpdateModal').modal({backdrop: 'static'});
        };

        $scope.changeMedia = function(){
            $scope.showMediaChange = true;
        }

        $scope.updateSection = function(){
            $http.put(`/updateSectionWhatWeDo/${$scope.sectionData._id}` , $scope.sectionData).then(()=>{
                $('#sectionUpdateModal').modal('hide');
                Notification.success('Section updated successfully');
                $scope.whatwedoInit();
            }).catch((error)=>{
                Notification.error(error.data);
            })
        }
    }])