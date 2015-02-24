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

                            var point = ol.proj.transform([longitude, latitude], /* WGS84 */ 'EPSG:4326', /* Google */ 'EPSG:3857');

                            // http://openlayers.org/en/v3.2.1/examples/data/icon.png

                            var point2 = new ol.geom.Point(point);


                            var iconFeature = new ol.Feature({
                                geometry: point2
                            });


                            var iconStyle = new ol.style.Style({
                                image: new ol.style.Icon(({
                                    anchor: [0.5, 46],
                                    anchorXUnits: 'fraction',
                                    anchorYUnits: 'pixels',
                                    opacity: 0.75,
                                    src: '/img/marker.png'
                                }))
                            });

                            iconFeature.setStyle(iconStyle);

                            var vectorSource = new ol.source.Vector({
                                features: [iconFeature]
                            });

                            var vectorLayer = new ol.layer.Vector({
                                source: vectorSource
                            });



                            var mainLayer = new ol.layer.Tile({
                                source: new ol.source.MapQuest({
                                    layer: 'osm'
                                })
                            });

                            var map = new ol.Map({
                                target: 'map',
                                layers: [mainLayer, vectorLayer],
                            });

                            map.setView(new ol.View({
                                center: point,
                                zoom: 10
                            }));

                        }

                    });
                }
            }
        };
    };

})();