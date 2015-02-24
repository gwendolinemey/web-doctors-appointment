(function () {

    var app = angular.module('app', ['ui.bootstrap', 'js-data']).config(function (DSProvider) {
        DSProvider.defaults.basePath = '/api';
        DSProvider.defaults.idAttribute = '_id';
    });

})();