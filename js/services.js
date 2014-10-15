
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

            getAppointementsByDoctors: function(idDoctor) {
                return $http({
                    url: options.api.base_url + '/appointments/available',
                    method: "GET", 
                    params : idDoctor
                });
            },

            getAllSpecialities: function() {
                return $http.get(options.api.base_url + '/specialities');
            },

            getDoctorByOffice: function(idOffice) {
                return $http({
                    url: options.api.base_url + '/office/doctors',
                    method: "GET", 
                    params : {"idOffice" : idOffice}
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
        }
    });