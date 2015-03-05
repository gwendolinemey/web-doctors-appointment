(function () {

    'use strict';

    angular.module('app').directive('praticienReservationForm', praticienReservationForm);

    function praticienReservationForm() {
        return {
            templateUrl: '/js/directives/praticien-reservation-form/praticien-reservation-form.html',
            restrict: 'EA',
            scope: {
                praticien: '='
            },
            link: {
                pre: function preLink($scope, $element, $attrs) {
                }
            }
        };
    };

})();