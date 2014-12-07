
	var app = angular.module('app', ['ngRoute', 'appControllers', 'appServices', 'appConfig', 'ui.bootstrap']);

	var appServices = angular.module('appServices', []);
	var appControllers = angular.module('appControllers', []);
	var appConfig = angular.module('appConfig', []);

	app.config(['$routeProvider',
		function($routeProvider) {
		$routeProvider
			.when('/', { 
				templateUrl: 'app/partials/accueil.html',	
				controller: 'LandingController' 
			})
			.when('/confirmation-rendezvous', {
				templateUrl : 'app/partials/confirmation-rendezvous.html', 
				controller: 'ConfirmationRendezVous'
			})
			.when('/mentions-legales', {
				templateUrl : 'app/partials/mentions-legales.html'
			})

			//////////// PRATICIENS ///////////////

			.when('/fontenilles/dieteticien/guerri', {	
				templateUrl : 'app/partials/praticiens/fontenilles/dieteticien/guerri.html', 
				controller: 'CabinetCtrl'
			})			
			.when('/labege/dieteticien/bec', {
				templateUrl : 'app/partials/praticiens/labege/dieteticien/bec.html', 
				controller: 'CabinetCtrl'
			})
			.when('/labege/dentiste/louw', {
				templateUrl : 'app/partials/praticiens/labege/dentiste/louw.html', 
				controller: 'CabinetCtrl'
			})
			.when('/saint-alban/osteopathe/fragnier', {
				templateUrl : 'app/partials/praticiens/saint-alban/osteopathe/fragnier.html', 
				controller: 'CabinetCtrl'
			})
			.when('/seysses', {
				templateUrl : 'app/partials/praticiens/seysses/medecin-generaliste/tucol.html', 
				controller: 'CabinetCtrl'
			})	
			.when('/seysses/medecin-generaliste/tucol', {
				templateUrl : 'app/partials/praticiens/seysses/medecin-generaliste/tucol.html', 
				controller: 'CabinetCtrl'
			})	
			.when('/toulouse/osteopathe/augusseau', {
				templateUrl : 'app/partials/praticiens/toulouse/osteopathe/augusseau.html',
				controller: 'CabinetCtrl' 
			})
			.when('/toulouse/osteopathe/joulia', {
				templateUrl : 'app/partials/praticiens/toulouse/osteopathe/joulia.html',
				controller: 'CabinetCtrl' 
			});
			/*$locationProvider.html5Mode(true);*/
	}]);