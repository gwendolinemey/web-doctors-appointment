
	var app = angular.module('app', [/*'ngRoute',*/'ui.router', 'appControllers', 'appServices', 'appConfig', 'ui.bootstrap']);

	var appServices = angular.module('appServices', []);
	var appControllers = angular.module('appControllers', []);
	var appConfig = angular.module('appConfig', []);


	/*app.config(['$routeProvider',
		function($routeProvider) {
		$routeProvider

			// route for the home page
			.when('/', { 
				templateUrl : 'index.html',
				controller  : 'LandingController'
			})			

			.when('/fontenilles/dieteticien-guerri', { 
				templateUrl : 'partials/fontenilles/dieteticien-guerri.html',
				controller  : 'CabinetCtrl'
			})
				
			.when('/seysses/cabinet-medical-seysses', {
				templateUrl : 'app/views/seysses/medecin-generaliste.html',
				controller  : 'CabinetCtrl'
			})

			.when('/toulouse/osteopathe-bertucchi', {
				templateUrl : 'app/views/toulouse/osteopathe-bertucchi.html',
				controller  : 'CabinetCtrl'
			})

			.when('/confirmation-rendezvous', {
				templateUrl : 'app/views/confirmation-rendezvous.html',
				controller 	: 'ConfirmationRendezVous'

			})

			.otherwise({
            	redirectTo: '/'
        	});
	}]);*/

/*ui router test */
app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('guerri', {
        url: '/fontenilles/dieteticien-guerri',
        templateUrl: 'partials/fontenilles/dieteticien-guerri.html'
    })
    
});
	