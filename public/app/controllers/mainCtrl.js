angular.module('mainCtrl', [])
	.controller('mainController', ['$scope', '$location', '$state','$stateParams', function ($scope, $location, $state,$stateParams) {
		if($location.search().lang=='FR'){
			$scope.currentLanguage='French';
		}else{
			$scope.currentLanguage='English';
		}
		$scope.showHeaderFooter = true;
		$scope.$on('$locationChangeStart', function($event, next, current) {
			var res = next.match(/admin/g);
			if(res && res.length){
				$scope.showHeaderFooter = false;
			}else{
				$scope.showHeaderFooter = true;
			}
		});

		$scope.changeLanguage = function(){
            if($scope.currentLanguage=='English'){
				$scope.currentLanguage='French';
				$stateParams.lang = 'FR'
            }else{
				$scope.currentLanguage='English';
				$stateParams.lang = 'EN'
            }
            $state.reload();
		}

	}]);