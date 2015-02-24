(function () {

    'use strict';

    angular.module('app').controller('praticienCtrl', praticienCtrl);

    function praticienCtrl($scope, DS) {

        var reference = window.location.pathname.substring('/praticien/'.length);

        var index = reference.indexOf('/');
        if (index !== -1) {
            reference = reference.substr(0, index);
        }

        DS.find('praticiens', reference).then(function (praticien) {
            console.log('Praticen fount: ', praticien);
            $scope.praticien = praticien;
        });
    }

})();