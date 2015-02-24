// angular js-data configuration

(function () {
    angular.module('app').run(function (DS) {

        return DS.defineResource({
            name: 'praticiens',
            idAttribute: 'reference'
        });

    });

})();