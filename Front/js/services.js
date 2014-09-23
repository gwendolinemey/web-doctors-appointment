
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

    // Variables Objects

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