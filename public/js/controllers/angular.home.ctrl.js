(function () {

    'use strict';

    angular.module('app').controller('homeCtrl', homeCtrl);

    function homeCtrl($scope) {

        $scope.$watch('praticien', function (praticien, old) {
            if (praticien && praticien.Cabinets && praticien.Cabinets.length > 0) {
                var cabinet = praticien.Cabinets[0];
                console.log('Redirect to cabinet "%s".', cabinet.reference);
                window.location.href = '/cabinet/' + cabinet.reference;
            }
        });
    }

})();