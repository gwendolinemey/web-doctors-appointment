
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

            getAllSpecialities: function() {
                return $http.get(options.api.base_url + '/specialities');
            },
        }
    });

    ///////////////////////////////////////// Variables Objects


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