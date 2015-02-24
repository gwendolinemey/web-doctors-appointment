(function () {

    'use strict';

    angular.module('app').directive('doctorMap', doctorMap);

    function doctorMap() {
        return {
            templateUrl: '/js/directives/doctor-map/doctor-map.html',
            restrict: 'EA',
            scope: {
                praticien: '='
            },
            link: {
                pre: function preLink($scope, $element, $attrs) {

                    $scope.$watch('praticien', function (praticien, old) {

                        if (praticien) {
                            console.log('Praticien: ', praticien);

                            var latitude = parseFloat(praticien.Cabinets[0].latitude);
                            var longitude = parseFloat(praticien.Cabinets[0].longitude);

                            console.log('Map center: %d, %d', latitude, longitude);

                            var map = new ol.Map({
                                target: 'map',
                                layers: [
      new ol.layer.Tile({
                                        source: new ol.source.MapQuest({
                                            layer: 'osm'
                                        })
                                    })
    ],
                            });

                            map.setView(new ol.View({
                                center: ol.proj.transform([longitude, latitude], 'EPSG:4326', 'EPSG:3857'),
                                zoom: 12
                            }));

                        }

                    });
                }
            }
        };
    };

})();