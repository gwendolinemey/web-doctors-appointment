(function () {

    'use strict';

    angular.module('app').factory('GetService', ['$http', function ($http) {
        
        var backendBaseUrl = '/api';
        
        return {
            getAllDoctors: function () {
                return $http.get(backendBaseUrl + '/doctors');
            },

            getDoctorsBySpecialities: function (speciality) {
                return $http({
                    url: backendBaseUrl + '/doctors/specialities',
                    method: "GET",
                    params: speciality
                });
            },

            getAvailableAppointements: function (idOffice, idDoctor, act, currentWeek) {
                console.log(idOffice, idDoctor, act);
                var stringifyAct = JSON.stringify(act);
                return $http({
                    url: backendBaseUrl + '/patients/side/doctors/availabilities',
                    method: "GET",
                    params: {
                        "idOffice": idOffice,
                        "idDoctor": idDoctor,
                        "act": stringifyAct,
                        "currentWeek": currentWeek
                    }
                });
            },

            getAllSpecialities: function () {
                return $http.get(backendBaseUrl + '/specialities');
            },

            getDoctorsByOffice: function (idOffice) {
                return $http({
                    url: backendBaseUrl + '/office/doctors',
                    method: "GET",
                    params: {
                        "idOffice": idOffice
                    }
                });
            },

            getActs: function (idOffice, idDoctor) {
                return $http({
                    url: backendBaseUrl + '/doctor/acts',
                    method: "GET",
                    params: {
                        "idOffice": idOffice,
                        "idDoctor": idDoctor
                    }
                });
            },

            getIsAppointmentAvailable: function (appointment) {
                var stringifyAppointment = JSON.stringify(appointment);
                console.log('GetService getIsAppointmentAvailable', stringifyAppointment);
                return $http({
                    url: backendBaseUrl + '/check/available/appointment',
                    method: "GET",
                    params: {
                        appointment: stringifyAppointment
                    }
                });
            },
        };
    }]);
}());