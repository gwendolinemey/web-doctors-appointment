(function () {

    'use strict';

    angular.module('app').factory('PostService', ['$http', function ($http) {

        var backendBaseUrl = '/api';

        return {
            saveAppointment: function (appointment) {
                var stringifyAppointment = JSON.stringify(appointment);
                console.log('PostService saveAppointment', stringifyAppointment);
                return $http({
                    url: backendBaseUrl + '/patient/appointment/save',
                    method: "POST",
                    params: {
                        appointment: stringifyAppointment
                    }
                });
            }
        };
    }]);
}());