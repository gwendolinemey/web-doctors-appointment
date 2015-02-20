(function () {

    'use strict';

    angular.module('app').directive('searchDoctor', searchDoctor);

    function searchDoctor($http) {
        return {
            templateUrl: '/js/search-doctor/search-doctor.html',
            restrict: 'EA',
            scope: {
                current: '@'
            },
            link: {
                pre: function preLink($scope, $element, $attrs) {

                    // scope methods
                    $scope.searchPraticiens = searchPraticiens;
                    $scope.getLabel = getLabel;

                    // search doctor from string
                    function searchPraticiens(val) {
                        return $http.get('/api/praticiens/search', {
                            params: {
                                text: val
                            }
                        }).then(function (response) {
                            return response.data;
                        });
                    };

                    // return doctor label
                    function getLabel(praticien) {
                        if (praticien) {
                            return praticien.nom + ' ' + praticien.prenom;
                        }
                        return null;
                    }

                }
            }
        };
    };

})();