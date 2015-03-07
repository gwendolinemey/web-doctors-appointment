// angular js-data configuration

(function () {

    angular.module('app').run(function ($http, DS) {

        DS.defineResource({
            name: 'praticiens',
            idAttribute: 'reference'
        });

        DS.defineResource({
            name: 'cabinets',
            idAttribute: 'reference'
        });

        return {};

    });

})();