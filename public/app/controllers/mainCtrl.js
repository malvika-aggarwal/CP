angular.module('mainCtrl', [])
	.controller('mainController', ['$scope', '$location', '$state', '$stateParams', function ($scope, $location, $state, $stateParams) {
		if ($location.search().lang == 'FR') {
			$scope.currentLanguage = 'French';
			$scope.langVar = 'FR';
		} else {
			$scope.currentLanguage = 'English';
			$scope.langVar = 'EN';
		}
		$scope.showHeaderFooter = true;
		$scope.$on('$locationChangeStart', function ($event, next, current) {
			var res = next.match(/admin/g);
			if (res && res.length) {
				$scope.showHeaderFooter = false;
			} else {
				$scope.showHeaderFooter = true;
			}
		});

		$scope.changeLanguage = function () {
			if ($scope.currentLanguage == 'English') {
				$scope.currentLanguage = 'French';
				$stateParams.lang = 'FR';
				$scope.langVar = 'FR';
			} else {
				$scope.currentLanguage = 'English';
				$stateParams.lang = 'EN';
				$scope.langVar = 'EN';
			}
			$state.reload();
		}

	}]);