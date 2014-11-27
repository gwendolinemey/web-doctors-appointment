
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

            getAvailableAppointements: function(idOffice, idDoctor, act, currentWeek) {
                console.log(idOffice, idDoctor, act);
                var stringifyAct = JSON.stringify(act);
                return $http({
                    url: Config.backend + '/office/doctors/appointments',
                    method: "GET", 
                    params : {"idOffice" : idOffice, "idDoctor" : idDoctor, "act" : stringifyAct, "currentWeek" : currentWeek}
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

            getIsAppointmentAvailable: function(appointment) {
                var stringifyAppointment = JSON.stringify(appointment);
                console.log('GetService getIsAppointmentAvailable', stringifyAppointment);
                return $http({
                    url: Config.backend + '/check/available/appointment',
                    method: "GET", 
                    params : {appointment : stringifyAppointment}
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
        
        return {
            getAppointment: function() {
                return appointment;
            },

            setAppointment: function(value) {
                appointment = value;
            }
        };
    });