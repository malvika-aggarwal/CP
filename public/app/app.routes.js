angular.module('app.routes', ['ui.router', 'ui-notification'])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: '/app/views/home.html'
      })
      .state('adminLogin', {
        url: '/admin/login',
        templateUrl: '/app/views/admin/login.html'
      })
      .state('adminSignup', {
        url: '/admin/signup',
        templateUrl: '/app/views/admin/signup.html'
      })
      .state('adminDashboard', {
        url: '/admin/dashboard',
        templateUrl: '/app/views/admin/dashboard.html'
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
    $locationProvider.html5Mode(true);
  })
  .config(function (NotificationProvider) {
    NotificationProvider.setOptions({
      delay: 3000,
      startTop: 20,
      startRight: 10,
      verticalSpacing: 20,
      horizontalSpacing: 20,
      positionX: 'left',
      positionY: 'bottom'
    });
  });