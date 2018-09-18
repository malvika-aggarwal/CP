angular.module('app.routes', ['ui.router', 'ui-notification'])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('home', {
        url: '/?lang',
        templateUrl: '/app/views/home.html'
      })
      .state('adminLogin', {
        url: '/admin/login',
        templateUrl: '/app/views/admin/login.html'
      })
      .state('adminDashboard', {
        url: '/admin/dashboard',
        templateUrl: '/app/views/admin/dashboard.html'
      })
      .state('adminGallery', {
        url: '/admin/gallery',
        templateUrl: '/app/views/admin/galleryMaintainance.html'
      })
      .state('adminUsers', {
        url: '/admin/users',
        templateUrl: '/app/views/admin/user.html'
      })
      .state('adminWhoWeAre', {
        url: '/admin/whoweare',
        templateUrl: '/app/views/admin/whoweare.html'
      })
      .state('adminWhatWeDo', {
        url: '/admin/whatwedo',
        templateUrl: '/app/views/admin/whatwedo.html'
      })
      .state('whatwedo', {
        url: '/whatwedo?lang',
        templateUrl: '/app/views/whatwedo.html'
      })
      .state('adminWhatWeDoGoals', {
        url: '/admin/whatwedo/goals',
        templateUrl: '/app/views/admin/whatwedogoals.html'
      })
      .state('adminWhatWeDoEntities', {
        url: '/admin/whatwedo/enities',
        templateUrl: '/app/views/admin/whatwedoentities.html'
      })
      .state('whoweare', {
        url: '/whoweare?lang',
        templateUrl: '/app/views/whoweare.html'
      })
      .state('sitemap', {
        url: '/sitemap?lang',
        templateUrl: '/app/views/sitemap.html'
      })
      .state('adminCareerSupport', {
        url: '/admin/careerSupport?lang',
        templateUrl: '/app/views/admin/careerSupport.html'
      })
    $locationProvider.html5Mode(true);
  })
  .config(function (NotificationProvider) {
    NotificationProvider.setOptions({
      delay: 5000,
      startTop: 20,
      startRight: 10,
      verticalSpacing: 20,
      horizontalSpacing: 20,
      positionX: 'center',
      positionY: 'top'
    });
  });