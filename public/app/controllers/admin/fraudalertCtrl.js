angular.module('fraudalertCtrl', [])
    .controller('fraudAlertController', ['$scope', '$http', 'Notification', '$sce', '$location', function ($scope, $http, Notification, $sce, $location) {

        $scope.baseUrl = `${$location.protocol()}://${$location.host()}:${$location.port()}/`;

        $scope.createSection = function () {
            $('#sectionCreateModal').modal({
                backdrop: 'static'
            });
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
        };


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
                description: $scope.description,
                sequence: $scope.sequence,
                alignment: $scope.alignment,
                descriptionType: $scope.descriptionType,
                language: $scope.language,
                isActive: $scope.isActive
            }

            $http.post('/saveFraudAlert', data).then((data) => {
                Notification.success('Section successfully created');
                $('#sectionCreateModal').modal('hide');
                $scope.clearValues();
                $scope.fraudAlertInit();
            }).catch((error) => {
                Notification.error(error.data);
            })
        };

        $scope.fraudAlertInit = function () {
            $scope.showMediaChange = false;
            $http.get('/getSectionsForFraudAlert').then((sections) => {
                $scope.allSection = sections.data;
            }).catch((error) => {
                $scope.allSection = [];
                Notification.error(error.data);
            })
        };

        $scope.editSection = function (section) {
            $scope.showMediaChange = false;
            $scope.sectionData = section;
            $('#sectionUpdateModal').modal({
                backdrop: 'static'
            });
        };

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
        };

        $scope.updateSection = function () {
            if (($scope.sectionData.descriptionType == 'Image' || $scope.sectionData.descriptionType == 'Video') && $scope.selectedFile) {
                $scope.selectedFile = JSON.parse($scope.selectedFile);
                $scope.sectionData.description = $scope.selectedFile.fileUrl;
            }
            $http.put(`/updateSectionFraudAlert/${$scope.sectionData._id}`, $scope.sectionData).then(() => {
                $('#sectionUpdateModal').modal('hide');
                Notification.success('Section updated successfully');
                $scope.fraudAlertInit();
            }).catch((error) => {
                Notification.error(error.data);
            })
        };

        $scope.clearValues = function () {
            $scope.description = '';
            $scope.sequence = '';
            $scope.alignment = '';
            $scope.descriptionType = '';
            $scope.language = '';
            $scope.selectedFile = '';
            $scope.sectionData = {};
        };

        $scope.returnDescription = function (html) {
            return $sce.trustAsHtml(html);
        };

        $scope.fraudalertUserInit = function () {
            $http.get(`/getFraudAlertListing?lang=${$scope.currentLanguage}`).then((data) => {
                $scope.bannerData = _.findWhere(data.data, {
                    sequence: 1,
                    descriptionType: "Image"
                });
                $scope.leftData = _.filter(data.data, function (obj) {
                    return obj.alignment == 'Left'
                });
                $scope.topData = _.filter(data.data, function (obj) {
                    if ((obj.sequence !== 1 || obj.descriptionType == 'Text') && obj.alignment == 'Top') {
                        return obj;
                    }
                });
                $scope.bottomData = _.filter(data.data, function (obj) {
                    return obj.alignment == 'Bottom'
                });
            }).catch((error) => {
                Notification.error(error.data);
            })
        }

    }])