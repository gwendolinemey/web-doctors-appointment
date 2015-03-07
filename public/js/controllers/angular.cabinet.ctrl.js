(function () {

    'use strict';

    angular.module('app').controller('cabinetCtrl', cabinetCtrl);

    function cabinetCtrl($scope) {

        $scope.cabinetReference = "test";
        
        var reference = window.location.pathname.substring('/cabinet/'.length);

        var index = reference.indexOf('/');
        if (index !== -1) {
            $scope.cabinetReference = reference.substr(0, index);
        }else{
            $scope.cabinetReference = reference;
        }
    }

})();