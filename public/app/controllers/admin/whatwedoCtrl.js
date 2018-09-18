angular.module('whatwedoCtrl', [])
  .controller('WhatWeDoController', ['$scope', '$http', 'Notification', '$sce', '$location', '$window', function ($scope, $http, Notification, $sce, $location, $window) {

    $scope.baseUrl = `${$location.protocol()}://${$location.host()}:${$location.port()}/`;
    $scope.createSection = function () {
      $('#sectionCreateModal').modal({
        backdrop: 'static'
      });
    }

    $scope.saveSection = function () {
      if ($scope.descriptionType == 'Image' || $scope.descriptionType == 'Video') {
        $scope.selectedFile = JSON.parse($scope.selectedFile);
        $scope.description = $scope.selectedFile.fileUrl;
      }
      if (!$scope.description) {
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

      $http.post('/saveWhatWeDo', data).then((data) => {
        Notification.success('Section successfully created');
        $('#sectionCreateModal').modal('hide');
        $scope.clearValues();
        $scope.whatwedoInit();
      }).catch((error) => {
        Notification.error(error.data);
      })
    };

    $scope.whatwedoInit = function () {
      $scope.showMediaChange = false;
      $http.get('/getSectionForWhatWeDo').then((sections) => {
        $scope.allSection = sections.data;
      }).catch((error) => {
        $scope.allSection = [];
        Notification.error(error.data);
      })
    };

    $scope.returnDescription = function (html) {
      return $sce.trustAsHtml(html);
    };

    $scope.editSection = function (section) {
      $scope.sectionData = section;
      $('#sectionUpdateModal').modal({
        backdrop: 'static'
      });
    };

    $scope.updateSection = function () {
      if (($scope.sectionData.descriptionType == 'Image' || $scope.sectionData.descriptionType == 'Video') && $scope.selectedFile) {
        $scope.selectedFile = JSON.parse($scope.selectedFile);
        $scope.sectionData.description = $scope.selectedFile.fileUrl;
      }

      $http.put(`/updateSectionWhatWeDo/${$scope.sectionData._id}`, $scope.sectionData).then(() => {
        $('#sectionUpdateModal').modal('hide');
        Notification.success('Section updated successfully');
        $scope.whatwedoInit();
      }).catch((error) => {
        Notification.error(error.data);
      })
    }

    $scope.whatwedoGoalsInit = function () {
      $http.get('/getWhatWeDoGoals').then((goals) => {
        $scope.allGoals = goals.data;
      }).catch((error) => {
        $scope.allGoals = [];
        Notification.error(error.data);
      })
    }

    $scope.createGoals = function () {
      $('#goalCreateModal').modal('show');
    }

    $scope.saveGoal = function () {
      var goalData = {
        title: $scope.title,
        description: $scope.description,
        sequence: $scope.sequence,
        language: $scope.language,
      }
      $http.post('/saveWhatWeDoGoals', goalData).then((data) => {
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
      $http.put(`/updateWhatWeDoGoal/${$scope.goalData._id}`, $scope.goalData).then(() => {
        $('#goalUpdateModal').modal('hide');
        Notification.success('Goal updated successfully');
        $scope.whatwedoGoalsInit();
      }).catch((error) => {
        Notification.error(error.data);
      })
    }

    $scope.whatwedoUserInit = function () {
      $http.get(`/getWhatWeDoList?lang=${$scope.currentLanguage}`).then((data) => {
        $scope.bannerData = _.findWhere(data.data, {
          sequence: 1,
          descriptionType: "Image"
        });
        $scope.leftData = _.filter(data.data, function (obj) {
          return obj.alignment == 'Left'
        });
        $scope.leftBottomData = _.filter(data.data, function (obj) {
          if (obj.alignment == 'LeftBottom' && (obj.descriptionType == 'Image' || obj.descriptionType == 'Video')) {
            return obj;
          }
        });
        $scope.topData = _.filter(data.data, function (obj) {
          if (obj.sequence !== 1 && obj.alignment == 'Top') {
            return obj;
          }
        });
        $scope.bottomData = _.filter(data.data, function (obj) {
          return obj.alignment == 'Bottom'
        });
      }).catch((error) => {
        Notification.error(error.data);
      })

      $http.get(`/getGoals?lang=${$scope.currentLanguage}`).then((data) => {
        $scope.goals = data.data;
      }).catch((error) => {
        Notification.error(error.data);
      })

      $http.get(`/getEntities?lang=${$scope.currentLanguage}`).then((data) => {
        $scope.entityLength = data.data.length;
        $scope.entityArr1 = [];
        $scope.entityArr2 = [];
        $scope.entityArr3 = [];
        for (var i = 0; i < $scope.entityLength; i += 3) {
          var count1 = i + 0;
          var count2 = i + 1;
          var count3 = i + 2;
          if (count1 <= $scope.entityLength && data.data[count1])
            $scope.entityArr1.push(data.data[count1]);
          if (count2 <= $scope.entityLength && data.data[count2])
            $scope.entityArr2.push(data.data[count2])
          if (count3 <= $scope.entityLength && data.data[count3])
            $scope.entityArr3.push(data.data[count3])
        }
      }).catch((error) => {
        Notification.error(error.data);
      })
    }

    $scope.openEntities = function () {
      $('#entitiesModal').modal('show')
    }

    $scope.clearValues = function () {
      $scope.title = '';
      $scope.heading = '';
      $scope.description = '';
      $scope.file = '';
      $scope.sequence = '';
      $scope.alignment = '';
      $scope.descriptionType = '';
      $scope.language = '';
      $scope.link = '';
      $scope.selectedFile = '';
      $scope.entityData = {};
      $scope.sectionData = {};
      $scope.goalData = {};
    };

    $scope.changeMedia = function () {
      if ($scope.language) {
        if ($scope.descriptionType == 'Image' || $scope.descriptionType == 'Video') {
          $http.get('/getParticularGallery/' + $scope.descriptionType + '/' + $scope.language).then((data) => {
            $scope.allMedia = data.data;
          }).catch((err) => {
            Notification.error(err.data);
          })
        }
      } else {
        Notification.error('Please choose language to proceed');
      }
    }

    $scope.changeMediaUpdate = function () {
      $scope.showMediaChange = true;
      if ($scope.sectionData.language) {
        if ($scope.sectionData.descriptionType == 'Image' || $scope.sectionData.descriptionType == 'Video') {
          $http.get('/getParticularGallery/' + $scope.sectionData.descriptionType + '/' + $scope.sectionData.language).then((data) => {
            $scope.allMedia = data.data;
          }).catch((err) => {
            Notification.error(err.data);
          })
        }
      } else {
        Notification.error('Please choose language to proceed');
      }
    }

    $scope.whatwedoEntitiesInit = function () {
      $http.get('/getAllEntities').then((data) => {
        $scope.allEntities = data.data;
      }).catch((error) => {
        Notification.error(error.data)
      })
    }

    $scope.createEntity = function () {
      $('#createEntityModal').modal('show');
    }

    $scope.saveEntity = function () {
      if ($scope.descriptionType == 'Image' || $scope.descriptionType == 'Video') {
        $scope.selectedFile = JSON.parse($scope.selectedFile);
        $scope.file = $scope.selectedFile.fileUrl;
      }
      if (!$scope.file) {
        Notification.error('Please select files')
        return false;
      }
      var data = {};
      data.language = $scope.language;
      data.fileType = $scope.descriptionType;
      data.fileUrl = $scope.file;
      data.link = $scope.link;
      data.description = $scope.description;
      data.isDeleted = $scope.isDeleted;
      $http.post('/saveEntities', data).then((data) => {
        $scope.whatwedoEntitiesInit();
        Notification.success('Entity created successfully');
        $('#createEntityModal').modal('hide');
        $scope.clearValues();
      }).catch((err) => {
        Notification.error(err.data);
      });
    };

    $scope.editEntity = function (data) {
      $('#updateEntityModal').modal('show');
      $scope.entityData = data;
    };

    $scope.changeEntityMediaUpdate = function () {
      $scope.showMediaChange = true;
      if ($scope.entityData.language) {
        if ($scope.entityData.fileType == 'Image' || $scope.entityData.fileType == 'Video') {
          $http.get('/getParticularGallery/' + $scope.entityData.fileType + '/' + $scope.entityData.language).then((data) => {
            $scope.allMedia = data.data;
          }).catch((err) => {
            Notification.error(err.data);
          })
        }
      } else {
        Notification.error('Please choose language to proceed');
      }
    };

    $scope.updateEntity = function () {
      $http.put(`/updateEntities/${$scope.entityData._id}`, $scope.entityData).then((data) => {
        $scope.whatwedoEntitiesInit();
        Notification.success('Entity updated successfully');
        $('#updateEntityModal').modal('hide');
        $scope.clearValues();
      }).catch((error) => {
        Notification.error(error.data);
      })
    }
  }])