// angular js-data configuration

(function () {

    angular.module('app').run(function ($http, DS) {

        return DS.defineResource({
            name: 'praticiens',
            idAttribute: 'reference'
        });

    });

})();