var app = angular.module('app', ['ui.router'])

app.config([
  '$httpProvider',
  '$locationProvider',
  '$urlRouterProvider',
  '$stateProvider',
  function($httpProvider, $locationProvider, $urlRouterProvider, $stateProvider){
  	  $locationProvider.html5Mode(true).hashPrefix('!');

  	  $stateProvider
		.state('home', {
			title: "首页",
			url: '/',
			templateUrl: require('../tpls/home.html'),
			// controller: 'HomeCtrl',
			resolve: {
			  // loadCtrl: ['$q', function($q) {
			  //   var defer = $q.defer();
			  //   require.ensure([], function(require) {
			  //     defer.resolve(require('../js/controller/home.js'));
			  //   }, 'home');
			  //   return defer.promise;
			  // }]
			}
		})

      	// 运费特惠路由
	    .state('about', {
			title: "关于我们",
			url: '/about',
			templateUrl: require('../tpls/about.html'),
	    })
  }
])