angular.module('whatwedoCtrl', [])
	.controller('WhatWeDoController', ['$scope', '$http', 'Notification', '$sce', '$location', '$window', function ($scope, $http, Notification, $sce, $location, $window) {

        $scope.baseUrl = `${$location.protocol()}://${$location.host()}:${$location.port()}/`;
        $scope.createSection = function() {
            $('#sectionCreateModal').modal({backdrop: 'static'});
        }

        $scope.saveSection = function() {
            if($scope.descriptionType=='Image' || $scope.descriptionType=='Video'){
                $scope.selectedFile = JSON.parse($scope.selectedFile);
                $scope.description = $scope.selectedFile.fileUrl;
            }
            if(!$scope.description){
                Notification.error('Please upload description')
                return false;
            }
            
            var data = {
                heading: $scope.heading,
                description: $scope.description,
                sequence: $scope.sequence,
                alignment: $scope.alignment,
                descriptionType: $scope.descriptionType,
                language: $scope.language,
                isDeleted: $scope.isDeleted
            }

            $http.post('/saveWhatWeDo',data).then((data) => {
                Notification.success('Section successfully created');
                $('#sectionCreateModal').modal('hide');
                $scope.clearValues();
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

        $scope.updateSection = function(){
            if(($scope.sectionData.descriptionType=='Image' || $scope.sectionData.descriptionType=='Video') && $scope.sectionData.selectedFile){
                $scope.selectedFile = JSON.parse($scope.sectionData.selectedFile);
                $scope.sectionData.description = $scope.selectedFile.fileUrl;
            }
            
            $http.put(`/updateSectionWhatWeDo/${$scope.sectionData._id}` , $scope.sectionData).then(()=>{
                $('#sectionUpdateModal').modal('hide');
                Notification.success('Section updated successfully');
                $scope.whatwedoInit();
            }).catch((error)=>{
                Notification.error(error.data);
            })
        }

        $scope.whatwedoGoalsInit = function(){
            $http.get('/getWhatWeDoGoals').then((goals)=>{
                $scope.allGoals = goals.data;
            }).catch((error)=>{
                $scope.allGoals = [];
                Notification.error(error.data);
            })
        }

        $scope.createGoals = function() {
            $('#goalCreateModal').modal('show');
        }

        $scope.saveGoal = function() {
            var goalData = {
                title: $scope.title,
                description: $scope.description,
                sequence: $scope.sequence,
                language: $scope.language,
            }
            $http.post('/saveWhatWeDoGoals',goalData).then((data) => {
                Notification.success('Goal successfully created');
                $('#goalCreateModal').modal('hide');
                $scope.clearValues();
                $scope.whatwedoGoalsInit();
            }).catch((error) => {
                Notification.error(error.data);
            })
        }

        $scope.editGoal = function (data) {
            $scope.goalData = data;
            $('#goalUpdateModal').modal('show')
        }

        $scope.updateGoal = function () {
            $http.put(`/updateWhatWeDoGoal/${$scope.goalData._id}` , $scope.goalData).then(()=>{
                $('#goalUpdateModal').modal('hide');
                Notification.success('Goal updated successfully');
                $scope.whatwedoGoalsInit();
            }).catch((error)=>{
                Notification.error(error.data);
            })
        }
        
        $scope.whatwedoUserInit = function(){
            $http.get(`/getWhatWeDoList?lang=${$scope.currentLanguage}`).then((data)=>{
                $scope.bannerData  = _.findWhere(data.data, {sequence : 1, descriptionType: "Image"});
                $scope.leftData = _.filter(data.data, function(obj){ return  obj.alignment=='Left'});
                $scope.leftBottomData  = _.filter(data.data, function(obj){ 
                    if(obj.alignment=='LeftBottom' && (obj.descriptionType=='Image' || obj.descriptionType=='Video')){
                        return obj;
                    }
                });
                $scope.topData = _.filter(data.data, function(obj){
                    if(obj.sequence!==1 && obj.alignment=='Top'){
                        return obj;
                    }
                });
                $scope.bottomData = _.filter(data.data, function(obj){ return obj.alignment=='Bottom'});
            }).catch((error)=>{
                Notification.error(error.data);
            })

            $http.get(`/getGoals?lang=${$scope.currentLanguage}`).then((data)=>{
                $scope.goals = data.data;
            }).catch((error)=>{
                Notification.error(error.data);
            })
        }

        $scope.openEntities = function(){
            $('#entitiesModal').modal('show')
        }

        $scope.clearValues = function(){
            $scope.title = '';
            $scope.heading = '';
            $scope.description = '';
            $scope.file = '';
            $scope.sequence = '';
            $scope.alignment = '';
            $scope.descriptionType = '';
            $scope.language = '';
        };

        $scope.changeMedia = function(){
            if($scope.language){
                if($scope.descriptionType=='Image' || $scope.descriptionType=='Video'){
                    $http.get('/getParticularGallery/'+$scope.descriptionType+'/'+$scope.language).then((data)=>{
                        $scope.allMedia = data.data;
                    }).catch((err)=>{
                        Notification.error(err);
                    })
                }
            }else{
                Notification.error('Please choose language to proceed');
            }
        }

        $scope.changeMediaUpdate = function(){
            $scope.showMediaChange = true;
            if($scope.sectionData.language){
                if($scope.sectionData.descriptionType=='Image' || $scope.sectionData.descriptionType=='Video'){
                    $http.get('/getParticularGallery/'+$scope.sectionData.descriptionType+'/'+$scope.sectionData.language).then((data)=>{
                        $scope.allMedia = data.data;
                    }).catch((err)=>{
                        Notification.error(err);
                    })
                }
            }else{
                Notification.error('Please choose language to proceed');
            }
        }
    }])