
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
				templateUrl: 'app/partials/accueil.html',	
				controller: 'LandingController' 
			})
			.when('/fontenilles/dieteticien-guerri', {	
				templateUrl : 'app/partials/fontenilles/dieteticien-guerri.html', 
				controller: 'CabinetCtrl'
			})			
			.when('/labege/dieteticienne-bec', {
				templateUrl : 'app/partials/labege/dieteticienne-bec.html', 
				controller: 'CabinetCtrl'
			})
			.when('/labege/dentiste', {
				templateUrl : 'app/partials/labege/dentiste-louw-leonelli.html', 
				controller: 'CabinetCtrl'
			})
			.when('/toulouse/osteopathe-augusseau', {
				templateUrl : 'app/partials/toulouse/osteopathe-augusseau.html',
				controller: 'CabinetCtrl' 
			})
			.when('/saint-alban/osteopathe-fragnier', {
				templateUrl : 'app/partials/saint-alban/osteopathe-fragnier.html', 
				controller: 'CabinetCtrl'
			})
			.when('/seysses/medecins-generalistes', {
				templateUrl : 'app/partials/seysses/cabinet-medical.html', 
				controller: 'CabinetCtrl'
			})			
			.when('/confirmation-rendezvous', {
				templateUrl : 'app/partials/confirmation-rendezvous.html', 
				controller: 'ConfirmationRendezVous'
			})
			.when('/mentions-legales', {
				templateUrl : 'app/partials/mentions-legales.html'
			});
			/*$locationProvider.html5Mode(true);*/
	}]);