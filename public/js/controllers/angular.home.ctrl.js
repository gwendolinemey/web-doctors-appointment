(function () {

    'use strict';

    angular.module('app').controller('homeCtrl', homeCtrl);

    function homeCtrl($scope) {

        $scope.$watch('praticien', function (praticien, old) {
            if (praticien && praticien.reference) {
                window.location.href = '/praticien/' + praticien.reference;
            }
        });
    }

})();