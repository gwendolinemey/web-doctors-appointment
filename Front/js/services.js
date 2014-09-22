appServices.factory('GetService', function ($http) {
    return {
        medecins: function() {
            return $http.post(options.api.base_url + '/user/signin');
        },

        specialites: function() {
            return $http.get(options.api.base_url + '/user/logout');
        },
    }
});