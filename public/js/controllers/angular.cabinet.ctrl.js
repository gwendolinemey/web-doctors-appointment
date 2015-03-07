(function () {

    'use strict';

    angular.module('app').controller('cabinetCtrl', cabinetCtrl);

    function cabinetCtrl($scope, DS) {

        var reference = window.location.pathname.substring('/cabinet/'.length);

        var index = reference.indexOf('/');
        if (index !== -1) {
            reference = reference.substr(0, index);
        } 

        DS.find('cabinets', reference).then(function (cabinet) {
            $scope.cabinet = cabinet;
        });
    }

})();