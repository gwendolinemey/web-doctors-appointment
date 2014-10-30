
	var app = angular.module('app', ['ngRoute', 'appControllers', 'appServices', 'appConfig', 'ui.bootstrap']);

	var appServices = angular.module('appServices', []);
	var appControllers = angular.module('appControllers', []);
	var appConfig = angular.module('appConfig', []);

	
	/*app.config(['$routeProvider', '$locationProvider',
		function($routeProvider,$locationProvider) {
		$routeProvider
			// route for the home
			.when('/', { templateUrl: 'partials/accueil.html', controller: 'LandingController' })	
			.when('/test', { templateUrl: 'test.html' })
			.when('/fontenilles/dieteticien-guerri', { templateUrl: 'partials/fontenilles/dieteticien-guerri.html', controller: 'CabinetCtrl'})				
			.otherwise({ redirectTo: '/' });
        	$locationProvider.html5Mode(true);
	}]);*/	

	app.config(['$routeProvider',
		function($routeProvider) {
		$routeProvider
			.when('/', { 
				templateUrl: 'partials/accueil.html',	
				controller: 'LandingController' 
			})
			.when('/fontenilles/dieteticien-guerri', {	
				templateUrl : 'partials/fontenilles/dieteticien-guerri.html', 
				controller: 'CabinetCtrl'
			})
			.when('/toulouse/osteopathe-bertucchi', {
				templateUrl : 'partials/toulouse/osteopathe-bertucchi.html', 
				controller: 'CabinetCtrl'
			})
			/*$locationProvider.html5Mode(true);*/
	}]);