	var app = angular.module('app', ['ngRoute',  'appControllers', 'appServices', 'appConfig', 'ui.bootstrap']);

	var appServices = angular.module('appServices', []);
	var appControllers = angular.module('appControllers', []);
	var appConfig = angular.module('appConfig', []);

	// configure our routes
	/*app.config(['$routeProvider', '$locationProvider',
		function($routeProvider, $locationProvider) {*/
	app.config(['$routeProvider',
		function($routeProvider) {
		$routeProvider

			// route for the home page
			.when('/', {
				templateUrl : 'app/views/index-mvp.html',
				controller  : 'LandingController'
			})

			.when('/seysses/cabinet-medical-seysses', {
				templateUrl : 'app/views/seysses/medecin-generaliste.html',
				controller  : 'CabinetCtrl'
			})

			.when('/fontenilles/dieteticien-tachier', {
				templateUrl : 'app/views/fontenilles/dieteticien-tachier.html',
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

			// route for the about page
			.when('/about', {
				templateUrl : 'app/views/about.html',
				controller  : 'AboutController'
			})

			// route for the contact page
			.when('/contact', {
				templateUrl : 'app/views/contact.html',
				controller  : 'ContactController'
			})

			.otherwise({
            	redirectTo: '/'
        	});
        	/*$locationProvider.html5Mode(true);*/
	}]);
	;appControllers.controller('LandingController', 
	function($scope) {
		$scope.ps = 8;
		$scope.rv = 21;
	}
);

appControllers.controller('CabinetCtrl', ['$scope', '$location', 'GetService', 'AppointmentManager', 
	function($scope, $location, GetService, AppointmentManager){

		var idCabinet;
		switch ($location.path()) {
			case '/seysses/cabinet-medical-seysses' : idCabinet = 2; mixpanel.track("View Seysses");
			break;
			case '/fontenilles/dieteticien-tachier' : idCabinet = 4;
			break;
			case '/toulouse/osteopathe-bertucchi' : idCabinet = 5; mixpanel.track("View Bertucchi");
			break;
			default : window.location.href = '#/';
		}
		
		$scope.quantityWeek=7;
		$scope.quantityApp=5;

		console.log('Current route name: ' + $location.path());

		GetService.getDoctorsByOffice(idCabinet).success(function(data) {
			console.log('getDoctorsByOffice : ', data);
			$scope.doctors = data.output;

			// initialise select elements
			angular.forEach($scope.doctors, function(doctor){
				doctor.selectedAct = doctor.acts[0];
				doctor.currentWeek = 0;
				doctor.previousDisabled = true;
				doctor.nextDisabled = false;

				console.log("doctor", doctor.idPraticien);

				GetService.getAvailableAppointements(idCabinet, doctor.idPraticien, doctor.selectedAct.duree, doctor.currentWeek).success(function(data) {
					console.log('getAvailableAppointements : ', data);
					doctor.availabilities = data.output;
				}).error(function(data, status) {
					console.log(status);
					console.log(data);
				});

			});
		}).error(function(data, status) {

			console.log(status);
			console.log(data);
		});	

		$scope.updateAvailableAppointments = function(doctor){
			GetService.getAvailableAppointements(idCabinet, doctor.idPraticien, doctor.selectedAct.duree, doctor.currentWeek).success(function(data) {
				console.log('getAvailableAppointements : ', data);
				doctor.availabilities = data.output;
			}).error(function(data, status) {
				console.log(status);
				console.log(data);
			});
		};

		$scope.seeNext = function(doctor){
			console.log("NEXT", doctor.currentWeek);
			if (doctor.currentWeek === 0) {
				doctor.previousDisabled = false;
			}
			doctor.currentWeek++;
			if (doctor.currentWeek == (doctor.semaines_ouvertes - 1)) {
				doctor.nextDisabled = true;
			}
			GetService.getAvailableAppointements(idCabinet, doctor.idPraticien, doctor.selectedAct.duree, doctor.currentWeek).success(function(data) {
				console.log('getAvailableAppointements : ', data);
				doctor.availabilities = data.output;
			}).error(function(data, status) {
				console.log(status);
				console.log(data);
			});
		};

		$scope.seePrevious = function(doctor){
			console.log("PREVIOUS", doctor.currentWeek);
			doctor.currentWeek--;
			if (doctor.currentWeek === 0) {
				doctor.previousDisabled = true;
			} 
			if (doctor.nextDisabled) {
				doctor.nextDisabled = false;
			}
			GetService.getAvailableAppointements(idCabinet, doctor.idPraticien, doctor.selectedAct.duree, doctor.currentWeek).success(function(data) {
				console.log('getAvailableAppointements : ', data);
				doctor.availabilities = data.output;
			}).error(function(data, status) {
				console.log(status);
				console.log(data);
			});
		};

		$scope.submitRV = function(doctor, day, id){

			var labelActe = doctor.acts[0].labelActe;
			console.log("submitRV doc: ", doctor);
			console.log("submitRV day: ", day);
			console.log("submitRV app: ", id);
			console.log("submitRV acte: ", labelActe);
			console.log("submitRV idoff: ", idCabinet);

			AppointmentManager.setSelectedAppointment(id);
			AppointmentManager.setSelectedDay(day);
			AppointmentManager.setSelectedDoctor(doctor);
			AppointmentManager.setSelectedOffice(idCabinet);
			AppointmentManager.setSelectedActe(labelActe);

			mixpanel.track("Selection RV");
			window.location.href = '#/confirmation-rendezvous';
		};
	}	
]);

appControllers.controller('ConfirmationRendezVous', ['$scope', '$modal', 'AppointmentManager', 'PostService',
	function($scope, $modal, AppointmentManager, PostService) {
	$scope.appointment = {
		doctor: AppointmentManager.getSelectedDoctor(),
		time: AppointmentManager.getSelectedAppointment(),
		dayDate: AppointmentManager.getSelectedDay(),
		office: AppointmentManager.getSelectedOffice(),
		acte: AppointmentManager.getSelectedActe()
	};

	$scope.user = {
		firstName: '',
		lastName: '',
		email: '',
		phone: ''
	};

	$scope.errorEmpty = false;
	$scope.errorEmail = false;
	$scope.errorPhone = false;

	console.log("recu appointment: ", $scope.appointment);

	$scope.open = function (size) {
	    var modalInstance = $modal.open({
	      templateUrl: 'confirmationModal.html',
	      controller: 'ModalInstanceCtrl',
	      size: size,
	      resolve: {
	        appointment: function () {
	          return $scope.appointment;
	        }
	      }
	    });

	    modalInstance.result.then(function () {
	    	window.location.href = '#/';
	    });
	};

	$scope.doBack = function() {
		window.history.back();
	};

	$scope.hideErrors = function(index) {
		switch (index) {
			case 1 : $scope.errorEmpty = false;
			break;
			case 2 : $scope.errorEmail = false;
			break;
			case 3 : $scope.errorPhone = false;
			break;
		}
	};

	$scope.saveAppointment = function() {
		if ($scope.user.lastName && $scope.user.firstName && $scope.user.email && $scope.user.phone) {
			if ($scope.errorEmpty) {
				$scope.errorEmpty = false;
			}
		} else {
    		$scope.errorEmpty = true;
    	}

		if (!$scope.errorEmpty) {
			if (! validateEmail($scope.user.email)) {
				$scope.errorEmail = true;
			} else {
				if ($scope.errorEmail) {
					$scope.errorEmail = false;
				}
			}

			if (! validatePhoneNumber($scope.user.phone)) {
				$scope.errorPhone = true;
			} else {
				if ($scope.errorPhone) {
					$scope.errorPhone = false;
				}
			}
		}

		if ((!$scope.errorEmpty) && (!$scope.errorEmail) && (!$scope.errorPhone)) {
            console.log("saveRV appointment", $scope.appointment);

            var appointment = {};
            appointment.user = $scope.user;
            appointment.start = $scope.appointment.time.start;
            appointment.end = $scope.appointment.time.end;
            appointment.actLabel = $scope.appointment.acte;
            appointment.idDoctor = $scope.appointment.doctor.idPraticien;
            appointment.doctorName = $scope.appointment.doctor.nom;
            appointment.idOffice = $scope.appointment.office;

            PostService.saveAppointment(appointment).success(function(data) {
		        console.log(data);
		        if (data.status == "success") {
		        	mixpanel.track("Enregistre RV");
		        	$scope.open();
		        }
		    }).error(function(data, status) {
		        console.log(status);
		        console.log(data);
		    });
    	}
    };
}
]);

appControllers.controller('ModalInstanceCtrl', function ($scope, $modalInstance, appointment) {
	console.log('appointment', appointment);
	$scope.appointment = appointment;

	$scope.ok = function () {
		$modalInstance.close();
	};
});

function sendAppointment(PostService, appointment) {
    PostService.saveRV(appointment).success(function(data) {
        console.log(data);
    }).error(function(data, status) {
        console.log(status);
        console.log(data);
    });
}

function validateEmail(email) { 
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function validatePhoneNumber(phoneNumber) { 
	var re = /^\d{10,12}$/;
	return re.test(phoneNumber);
}
;
    appServices.factory('GetService', ['$http', 'Config', function($http, Config) {
        return {
            getAllDoctors: function() {
                return $http.get(Config.backend + '/doctors');
            },

            getDoctorsBySpecialities: function(speciality) {
                return $http({
                    url: Config.backend + '/doctors/specialities',
                    method: "GET", 
                    params : speciality
                });
            },

            getAvailableAppointements: function(idOffice, idDoctor, actDuration, currentWeek) {
                console.log(idOffice, idDoctor, actDuration);
                return $http({
                    url: Config.backend + '/office/doctors/appointments',
                    method: "GET", 
                    params : {"idOffice" : idOffice, "idDoctor" : idDoctor, "actDuration" : actDuration, "currentWeek" : currentWeek}
                });
            },

            getAllSpecialities: function() {
                return $http.get(Config.backend + '/specialities');
            },

            getDoctorsByOffice: function(idOffice) {
                return $http({
                    url: Config.backend + '/office/doctors',
                    method: "GET", 
                    params : {"idOffice" : idOffice}
                });
            },
            getActs: function(idOffice, idDoctor) {
            return $http({
                url: Config.backend + '/doctor/acts',
                method: "GET", 
                params : {"idOffice" : idOffice, "idDoctor" : idDoctor}
            });
        },
        };
    }]);


    appServices.factory('PostService', ['$http', 'Config', function($http, Config) {
        return {
            saveAppointment: function(appointment) {       
                var stringifyAppointment = JSON.stringify(appointment);
                console.log('PostService saveAppointment', stringifyAppointment);
                return $http({
                    url: Config.backend + '/patient/appointment/save',
                    method: "POST", 
                    params : {appointment : stringifyAppointment }
                });
            }            
        };
    }]);

    ///////////////////////////////////////// Variables Objects
    // TODO Refactor this in another js file as this is not web services
    // but services to share data across controllers.

    appServices.factory('SpecialityManager', function() {

        var selectedSpeciality;

        return {
            getSelectedSpeciality: function() {
                return selectedSpeciality;
            },

            setSelectedSpeciality: function(value) {
                selectedSpeciality = value;
            },
        };
    });

    appServices.factory('AppointmentManager', function() {

        var appointment;
        var doctor;
        var day;
        var idOffice;
        var acte;

        return {
            getSelectedAppointment: function() {
                return appointment;
            },

            setSelectedAppointment: function(value) {
                appointment = value;
            },

            getSelectedDoctor: function() {
                return doctor;
            },

            setSelectedDoctor: function(value) {
                doctor = value;
            },
            getSelectedDay: function(){
                return day;
            },
            setSelectedDay: function(value){
                day = value;
            },
            getSelectedOffice: function(){
                return idOffice;
            },
            setSelectedOffice: function(value){
                idOffice = value;
            },
            getSelectedActe: function(){
                return acte;
            },
            setSelectedActe: function(value){
                acte = value;
            }
        };
    });;angular.module('appConfig')
.constant('Config', {
  'backend': 'http://localhost:8080'
});;angular.module('templates-dist', ['../app/views/confirmation-rendezvous.html', '../app/views/contact.html', '../app/views/index-mvp.html', '../app/views/fontenilles/dieteticien-tachier.html', '../app/views/seysses/medecin-generaliste.html', '../app/views/toulouse/osteopathe-bertucchi.html']);

angular.module("../app/views/confirmation-rendezvous.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../app/views/confirmation-rendezvous.html",
    "<script type=\"text/ng-template\" id=\"confirmationModal.html\">\n" +
    "        <div class=\"modal-header\">\n" +
    "            <h3 class=\"modal-title\">Votre rendez-vous est confirmé !</h3>\n" +
    "        </div>\n" +
    "        <div class=\"modal-body\">\n" +
    "        	<p class=\"lead\">Vous avez rendez-vous le {{appointment.dayDate}} à {{appointment.time.prettyTime}} avec le Docteur {{appointment.doctor.nom}}. </p> \n" +
    "            <p class=\"lead\">Vous venez de recevoir un e-mail de confirmation. </p> \n" +
    "        </div>\n" +
    "        <div class=\"modal-footer\">\n" +
    "            <button class=\"btn btn-primary\" ng-click=\"ok()\">OK</button>\n" +
    "        </div>\n" +
    "</script>\n" +
    "\n" +
    "<p class=\"lead\">Dernier clic : confirmez !</p>  \n" +
    "\n" +
    "Pour confirmer votre rendez-vous avec le Docteur {{appointment.doctor.nom}} le {{appointment.dayDate}} à {{ appointment.time.prettyTime }} entrez vos coordonnées :\n" +
    "\n" +
    "\n" +
    "<form name=\"confirmation-rv\" id=\"confirmrv\" class=\"input-group\">\n" +
    "	<input type=\"text\" name=\"lastName\" placeholder=\"votre nom\" class=\"form-control input-md\" ng-model=\"user.lastName\" />\n" +
    "	<input type=\"text\" name=\"firstName\" placeholder=\"votre prénom\" class=\"form-control input-md\" ng-model=\"user.firstName\" />\n" +
    "	<input type=\"email\" name=\"email\" placeholder=\"votre e-mail\" class=\"form-control input-md\" ng-model=\"user.email\" />\n" +
    "	<input type=\"tel\" name=\"phone\" placeholder=\"votre numéro de téléphone\" class=\"form-control input-md\" ng-model=\"user.phone\" />\n" +
    "\n" +
    "	<button class=\"btn btn-lg btn-default\" ng-click=\"doBack()\" value=\"annuler\">Annuler</button>\n" +
    "	<button class=\"btn btn-lg btn-default\" ng-click=\"saveAppointment()\">Confirmer le rendez-vous</button>\n" +
    "</form>\n" +
    "<alert ng-show=\"errorEmpty\" type=\"danger\" close=\"hideErrors(1)\">Veuillez renseigner tous les champs pour confirmer votre rendez-vous</alert>\n" +
    "<alert ng-show=\"errorEmail\" type=\"danger\" close=\"hideErrors(2)\">Veuillez renseigner un e-mail valide pour confirmer votre rendez-vous</alert>\n" +
    "<alert ng-show=\"errorPhone\" type=\"danger\" close=\"hideErrors(3)\">Veuillez renseigner un numéro de téléphone valide pour confirmer votre rendez-vous</alert>\n" +
    "\n" +
    "\n" +
    "\n" +
    "");
}]);

angular.module("../app/views/contact.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../app/views/contact.html",
    "{{ message }}");
}]);

angular.module("../app/views/index-mvp.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../app/views/index-mvp.html",
    "<div class=\"row\">\n" +
    "    <h1 class=\"heading\">RapiDocteur</h1>\n" +
    "    <p class=\"lead\">Prenez un rendez-vous avec votre médecin en trois clics !</p>    \n" +
    "</div>\n" +
    "\n" +
    "\n" +
    "<div class=\"row\">\n" +
    "    <div class=\"box\">\n" +
    "        <div class=\"col-lg-12\">\n" +
    "            <hr>\n" +
    "            <h2 class=\"intro-text text-center\">Les \n" +
    "            <strong>médecins disponibles à Fontenilles, Labège, Seysses et Toulouse</strong>\n" +
    "            </h2>\n" +
    "            <hr>\n" +
    "        </div>\n" +
    "        <div class=\"col-sm-4 text-center presentation-doctor\">\n" +
    "            <img class=\"img-responsive\" src=\"img/cabinet1_o.jpg\" alt=\"médecin généraliste seysses\" />\n" +
    "            <h3>Cabinet médical à Seysses<br />\n" +
    "            <small>Dr BOUDOU-BATTISTI, Dr BOYES et Dr CALAS</small>\n" +
    "            </h3><br />\n" +
    "            <a href=\"#/seysses/cabinet-medical-seysses\" class=\"btn btn-lg btn-default\">Prendre rendez-vous</a>\n" +
    "        </div>\n" +
    "        <div class=\"box\">\n" +
    "        <div class=\"col-sm-4 text-center presentation-doctor\">\n" +
    "            <img class=\"img-responsive\" src=\"img/bertucchi_o.jpg\" alt=\"osteopathe toulouse bertucchi\" />\n" +
    "            <h3>Y. BERTUCCHI, ostéopathe<br />à Toulouse</h3><br />\n" +
    "            <a href=\"#/toulouse/osteopathe-bertucchi\" class=\"btn btn-lg btn-default\">Prendre rendez-vous</a>\n" +
    "        </div>\n" +
    "        </div>\n" +
    "        <div class=\"col-sm-4 text-center presentation-doctor\">\n" +
    "            <img class=\"img-responsive\" src=\"img/cabinet2_o.jpg\" alt=\"dentiste labège dr louw\" />\n" +
    "            <h3>Cabinet de Dentistes à Labège<br />\n" +
    "            <small>Dr LEONELLI et Dr LOUW</small>\n" +
    "            </h3><br />\n" +
    "            <a href=\"/\" class=\"btn btn-lg btn-default\" disabled>Prendre rendez-vous</a>\n" +
    "        </div>               \n" +
    "        <div class=\"clearfix\"></div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "<div class=\"row\">\n" +
    "    <div class=\"col-lg-4 text-center presentation-doctor\">\n" +
    "        <img class=\"img-responsive\" src=\"img/dieteticienne-tachier-fontenilles.jpg\" alt=\"diéteticienne fontenilles mélanie tachier\" />\n" +
    "        <h3>M. TACHIER, diététicienne<br />à Fontenilles</h3>\n" +
    "        <a href=\"#/fontenilles/dieteticien-tachier\" class=\"btn btn-lg btn-default\">Prendre rendez-vous</a>\n" +
    "    </div>\n" +
    "     \n" +
    "</div>\n" +
    "    \n" +
    "<section id=\"landing-chiffres\" class=\"col-lg-12 text-center v-center\">\n" +
    "    <span> Déjà <strong>{{ps}} professionnels de santé référencés sur RapiDocteur</strong></span><br />\n" +
    "    <span>& <strong>{{rv}}</strong> rendez-vous réservés !</span>\n" +
    "</section>\n" +
    "");
}]);

angular.module("../app/views/fontenilles/dieteticien-tachier.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../app/views/fontenilles/dieteticien-tachier.html",
    "<div class=\"container\">\n" +
    "    <div class=\"row\">\n" +
    "        <div class=\"col-md-6 presentation-doc\">\n" +
    "            <h1 class=\"heading\">Mélanie Tachier Montaut</h1>\n" +
    "            <p class=\"lead\">Diététicienne nutritionniste</p>\n" +
    "            <!-- <img class=\"img-responsive\" src=\"img/dieteticienne-tachier-fontenilles.jpg\" width=\"400px\" alt=\"diéteticienne nutritionniste fontenilles\" /> -->\n" +
    "            <h1 id=\"plus-medecin\">En savoir plus sur Mélanie Tachier</h1>\n" +
    "            <p>Diététicienne Nutritionniste, je vous accueille dans mon cabinet, situé à Fontenilles, au sein d'une structure pluridisciplinaire familiale.<br /><br />\n" +
    "            Vous cherchez à équilibrer votre alimentation ? <br />\n" +
    "            Je vous propose une prise en charge nutritionnelleadaptée et personnalisée, en tenant compte de votre alimentation, votre santé (stress, fatigue, pathologies avérées) et de votre rythme de vie (travail, vie quotidienne, activité physique).<br /><br />\n" +
    "            En tant que professionnelle de la santé mon objectif est d'équilibrer votre alimentation. Il ne s'agit pas de manger moins mais de manger mieux et de bien répartir l'apport énergétique quotidien. Vous consommez de tout, en quantités confortables et consciencieusement étudiées afin de perdre du poids progressivement.<br /><br />\n" +
    "            Rapidement, vous sentirez une nette amélioration de votre tonus, du sommeil, de votre transit ainsi qu'une diminution des fringales et des envies de sucre en fin de journée.</p>\n" +
    "        </div>\n" +
    "                \n" +
    "        <div class=\"col-md-6 info-doc\">\n" +
    "            <iframe src=\"https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d2891.7191192049468!2d1.1933424!3d43.5498966!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a94b5e06f386e1%3A0xe762b34a6bfe6235!2s9+Chemin+de+la+Poumayre%2C+31470+Fontenilles!5e0!3m2!1sfr!2sfr!4v1413542934721\" width=\"350\" height=\"200\" frameborder=\"0\" style=\"border:0\"></iframe>\n" +
    "            <p>9 Chemin de la Poumayre, 31470 Fontenilles</p>\n" +
    "            <p><span class=\"listpaiyment\">Moyens de paiement :<span></p>\n" +
    "                <ul class=\"paymentway\">\n" +
    "                    <li><img src=\"img/cash.png\" /> espèces acceptées</li>\n" +
    "                    <li><img src=\"img/check.png\" /> chèques acceptés</p></li>\n" +
    "                </ul>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div id=\"disponibilites\" class=\"row\" ng-repeat=\"doctor in doctors\">        \n" +
    "            <div id=\"act-choice\" class=\"col-md-3\">\n" +
    "                <p><strong> Dr {{ doctor.nom }} {{ doctor.prenom}} </strong></p>\n" +
    "                <p>Quel motif ?</p>\n" +
    "                <select class=\"motif-consult\" ng-change=\"updateAvailableAppointments(doctor)\" ng-model=\"doctor.selectedAct\" ng-options=\"act.labelActe for act in doctor.acts\"></select>\n" +
    "            </div>\n" +
    "            <table id=\"agenda-med\">\n" +
    "                <tr>\n" +
    "                    <th ng-repeat=\"day in doctor.availabilities| limitTo:quantityWeek\" ng-class=\"{ disabled: day.appointments.length == 0}\">{{ day.date }}</th>\n" +
    "                </tr>                \n" +
    "                <tr>\n" +
    "                    <td ng-repeat=\"day in doctor.availabilities | limitTo:quantityWeek\" ng-class=\"{ disabled: day.appointments.length == 0}\">\n" +
    "                        <div ng-repeat=\"c in day.appointments | limitTo:quantityApp\" ng-class=\"{ disabled: c.length == 0}\">\n" +
    "                            <a href=\"\" class=\"availableAppoint\" ng-click=\"submitRV(doctor, day.date, c)\">{{ c.prettyTime }}</a>\n" +
    "                        </div>                        \n" +
    "                    </td>                \n" +
    "                </tr>\n" +
    "            </table>\n" +
    "        \n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("../app/views/seysses/medecin-generaliste.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../app/views/seysses/medecin-generaliste.html",
    "<div class=\"container\">\n" +
    "    <div class=\"row\">               \n" +
    "        <div class=\"col-md-6 presentation-doc\">\n" +
    "            <h1 class=\"heading\">Cabinet médical de Seysses</h1>\n" +
    "            <!-- <img class=\"img-responsive\" src=\"img/cabinet1_o.jpg\" width=\"300px\" alt=\"médecin généraliste seysses\" /> -->\n" +
    "            <h1 id=\"plus-medecin\">En savoir plus sur cabinet de Seysses</h1>\n" +
    "            <p>Ac ne quis a nobis hoc ita dici forte miretur, quod alia quaedam in hoc facultas sit ingeni, neque haec dicendi ratio aut disciplina, ne nos quidem huic uni studio penitus umquam dediti fuimus. Etenim omnes artes, quae ad humanitatem pertinent, habent quoddam commune vinculum, et quasi cognatione quadam inter se continentur.</p>\n" +
    "\n" +
    "        </div>\n" +
    "        \n" +
    "        <div class=\"col-md-6 info-doc\">\n" +
    "            <iframe src=\"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2895.1763632183256!2d1.3042004000000038!3d43.47778970000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12aeb61e6def9d9d%3A0xbc18a5c1581f4e3b!2s60+Route+d&#39;Ox%2C+31600+Seysses!5e0!3m2!1sfr!2sfr!4v1413365325879\" width=\"350\" height=\"200\" frameborder=\"0\" style=\"border:0\"></iframe>\n" +
    "            <p>60 route d'Ox, 31600 Seysses</p>\n" +
    "            <p><span class=\"listpaiyment\">Moyens de paiement :<span></p>\n" +
    "                <ul class=\"paymentway\">\n" +
    "                    <li><img src=\"img/cardb.png\" />carte bleu acceptée</li>\n" +
    "                    <li><img src=\"img/cash.png\" /> espèces acceptées</li>\n" +
    "                    <li><img src=\"img/check.png\" /> chèques acceptés</p></li>\n" +
    "                </ul>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div id=\"disponibilites\" class=\"row\" ng-repeat=\"doctor in doctors\">        \n" +
    "            <div id=\"act-choice\" class=\"col-lg-3\">\n" +
    "                <p><strong> Dr {{ doctor.nom }} {{ doctor.prenom}} </strong></p>                \n" +
    "                <p>Quel motif ?</p>\n" +
    "\n" +
    "                <select class=\"motif-consult\" ng-change=\"updateAvailableAppointments(doctor)\" ng-model=\"doctor.selectedAct\" ng-options=\"act.labelActe for act in doctor.acts\"></select>\n" +
    "            </div>\n" +
    "            <button class=\"col-lg-1 navigationArrow\" ng-click=\"seePrevious(doctor)\" ng-disabled=\"doctor.previousDisabled\"> < </button>\n" +
    "            <table class=\"col-lg-6\" id=\"agenda-med\">\n" +
    "                <tr>\n" +
    "                    <th ng-repeat=\"day in doctor.availabilities| limitTo:quantityWeek\" ng-class=\"{ disabled: day.appointments.length == 0}\">{{ day.date }}</th>\n" +
    "                </tr>                \n" +
    "                <tr>\n" +
    "                    <td ng-repeat=\"day in doctor.availabilities | limitTo:quantityWeek\" ng-class=\"{ disabled: day.appointments.length == 0}\">\n" +
    "                        <div ng-repeat=\"c in day.appointments | limitTo:quantityApp\" ng-class=\"{ disabled: c.length == 0}\">\n" +
    "                            <a href=\"\" class=\"availableAppoint\" ng-click=\"submitRV(doctor, day.date, c)\">{{ c.prettyTime }}</a>\n" +
    "                        </div>                        \n" +
    "                    </td>                \n" +
    "                </tr>\n" +
    "            </table>       \n" +
    "            <button class=\"col-lg-1 navigationArrow\" ng-click=\"seeNext(doctor)\" ng-disabled=\"doctor.nextDisabled\"> > </button> \n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("../app/views/toulouse/osteopathe-bertucchi.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../app/views/toulouse/osteopathe-bertucchi.html",
    "<div class=\"container\">\n" +
    "    <div class=\"row\">        \n" +
    "        \n" +
    "        <div class=\"col-md-6 presentation-doc\">\n" +
    "            <h1 class=\"heading-doc\">Ostéopathe</h1>\n" +
    "            <p class=\"lead-doc\">M. Youri BERTUCCHI</p>\n" +
    "            <!-- <img class=\"img-responsive\" src=\"img/enseigne_o.jpg\" width=\"300px\" alt=\"osteopathe toulouse\" /> -->\n" +
    "            <h1 id=\"plus-medecin\">En savoir plus sur M. Youri Bertucchi</h1>\n" +
    "            <p>Youri Bertucchi, ostéopathe D.O. vous accueille dans son cabinet du centre ville de Toulouse.<br />Suite à une formation de 6 ans à l’Institut Toulousain d’Ostéopathie (école agréée par le ministère de la santé et des sports), il obtient son diplôme \"Ostéopathe DO\" ainsi que quatre para-diplômes en pédiatrie, posturologie, sport et nutrition, et sport de haut niveau.<br />Il pratique une ostéopathie traditionnelle visant tous les publics.</p>\n" +
    "            \n" +
    "        </div>\n" +
    "        \n" +
    "        <div class=\"col-md-6 info-doc\">\n" +
    "            <iframe src=\"https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d2889.690158310985!2d1.4435274871042763!3d43.59216972174021!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12aebc803654f409%3A0x1d77ca09b0f1664!2s11+Place+Lafourcade%2C+31400+Toulouse!5e0!3m2!1sfr!2sfr!4v1414069323921\" width=\"350\" height=\"200\" frameborder=\"0\" style=\"border:0\"></iframe>\n" +
    "            <p>11 place Lafourcade, 31400 Toulouse</p>\n" +
    "            <p><span class=\"listpaiyment\">Moyens de paiement :<span></p>\n" +
    "                <ul class=\"paymentway\">\n" +
    "                    <li><img src=\"img/cash.png\" /> espèces acceptées</li>\n" +
    "                    <li><img src=\"img/check.png\" /> chèques acceptés</p></li>\n" +
    "                </ul>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div id=\"disponibilites\" class=\"row\" ng-repeat=\"doctor in doctors\">        \n" +
    "            <div id=\"act-choice\" class=\"col-md-3\">\n" +
    "                <p><strong> Dr {{ doctor.nom }} {{ doctor.prenom}} </strong></p>                \n" +
    "                <p>Quel motif ?</p>\n" +
    "\n" +
    "                <select class=\"motif-consult\" ng-change=\"updateAvailableAppointments(doctor)\" ng-model=\"doctor.selectedAct\" ng-options=\"act.labelActe for act in doctor.acts\"></select>\n" +
    "            </div>\n" +
    "            <table id=\"agenda-med\">\n" +
    "                <tr>\n" +
    "                    <th ng-repeat=\"day in doctor.availabilities| limitTo:quantityWeek\" ng-class=\"{ disabled: day.appointments.length == 0}\">{{ day.date }}</th>\n" +
    "                </tr>                \n" +
    "                <tr>\n" +
    "                    <td ng-repeat=\"day in doctor.availabilities | limitTo:quantityWeek\" ng-class=\"{ disabled: day.appointments.length == 0}\">\n" +
    "                        <div ng-repeat=\"c in day.appointments | limitTo:quantityApp\" ng-class=\"{ disabled: c.length == 0}\">\n" +
    "                            <a href=\"\" class=\"availableAppoint\" ng-click=\"submitRV(doctor, day.date, c)\">{{ c.prettyTime }}</a>\n" +
    "                        </div>                        \n" +
    "                    </td>                \n" +
    "                </tr>\n" +
    "            </table>        \n" +
    "    </div>\n" +
    "</div>");
}]);
