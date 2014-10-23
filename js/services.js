
    appServices.factory('GetService', function($http) {
        return {
            getAllDoctors: function() {
                return $http.get(options.api.base_url + '/doctors');
            },

            getDoctorsBySpecialities: function(speciality) {
                return $http({
                    url: options.api.base_url + '/doctors/specialities',
                    method: "GET", 
                    params : speciality
                });
            },

            getAvailableAppointements: function(idOffice, idDoctor, actDuration) {
                console.log(idOffice, idDoctor, actDuration);
                return $http({
                    url: options.api.base_url + '/office/doctors/appointments',
                    method: "GET", 
                    params : {"idOffice" : idOffice, "idDoctor" : idDoctor, "actDuration" : actDuration}
                })
            },

            getAllSpecialities: function() {
                return $http.get(options.api.base_url + '/specialities');
            },

            getDoctorsByOffice: function(idOffice) {
                return $http({
                    url: options.api.base_url + '/office/doctors',
                    method: "GET", 
                    params : {"idOffice" : idOffice}
                });
            },
            getActs: function(idOffice, idDoctor) {
            return $http({
                url: options.api.base_url + '/doctor/acts',
                method: "GET", 
                params : {"idOffice" : idOffice, "idDoctor" : idDoctor}
            });
        },
        }
    });


    appServices.factory('PostService', function($http) {
        return {
            saveRV: function(appointment) {                
                var stringifyAppointment = JSON.stringify(appointment);
                console.log('PostService saveRV', stringifyAppointment);
                return $http({
                    url: options.api.base_url + '/patient/appointment/save',
                    method: "POST", 
                    params : { appointment : stringifyAppointment }
                });
            }            
        }
    });

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
        }
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
        }
    });