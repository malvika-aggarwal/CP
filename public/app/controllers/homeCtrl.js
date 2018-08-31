angular.module('homeCtrl', [])
	.controller('homeController', ['$scope', '$location', '$rootScope', '$http', function ($scope, $location, $rootScope, $http) {
		$('.slider-for').slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			arrows: false,
			fade: true,
			asNavFor: '.slider-nav'
		});

		$('.slider-nav').slick({
			slidesToShow: 3,
			slidesToScroll: 1,
			asNavFor: '.slider-for',
			dots: false,
			focusOnSelect: true
		});

		$('.banner-bottom-slider').slick({
			dots: false,
			infinite: true,
			speed: 300,
			slidesToShow: 4,
			slidesToScroll: 4,
			responsive: [{
					breakpoint: 1024,
					settings: {
						slidesToShow: 3,
						slidesToScroll: 3,
						infinite: true,
						dots: false
					}
				},
				{
					breakpoint: 600,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 2
					}
				},
				{
					breakpoint: 480,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1
					}
				}
			]
		});

		$scope.showHeaderFooter = true;
		$scope.$on('$locationChangeStart', function($event, next, current) {
			var res = next.match(/admin/g);
			if(res && res.length){
				$scope.showHeaderFooter = false;
			}else{
				$scope.showHeaderFooter = true;
			}
			// ... you could trigger something here ...
		});

	}]);