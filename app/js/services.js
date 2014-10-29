
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
    });