
    appServices.factory('GetService', function($http) {
        return {
            getAllDoctors: function() {
                return $http.get(options.api.base_url + '/medecins');
            },

            getAllSpecialities: function() {
                return $http.get(options.api.base_url + '/specialites');
            },
        }
    });