(function () {

    'use strict';

    angular.module('app').directive('cabinetMap', doctorMap);

    function doctorMap(DS) {
        return {
            templateUrl: '/js/directives/cabinet-map/cabinet-map.html',
            restrict: 'EA',
            scope: {
                cabinetReference: '='
            },
            link: {
                pre: function preLink($scope, $element, $attrs) {

                    console.log('#########""""');

                    $scope.$watch('cabinetReference', function (cabinetReference, old) {

                        if (cabinetReference) {

                            DS.find('cabinets', cabinetReference).then(function (cabinet) {

                                if (cabinet && cabinet.latitude && cabinet.longitude) {

                                    console.log('Cabinet: ', cabinet);

                                    var iconStyle = new ol.style.Style({
                                        image: new ol.style.Icon(({
                                            anchor: [0.5, 46],
                                            anchorXUnits: 'fraction',
                                            anchorYUnits: 'pixels',
                                            opacity: 0.75,
                                            src: '/img/marker.png'
                                        }))
                                    });

                                    var latitude = parseFloat(cabinet.latitude);
                                    var longitude = parseFloat(cabinet.longitude);

                                    var point = ol.proj.transform([longitude, latitude], 'EPSG:4326', 'EPSG:3857');

                                    var iconFeature = new ol.Feature({
                                        geometry: new ol.geom.Point(point)
                                    });

                                    iconFeature.setStyle(iconStyle);


                                    var iconsLayer = new ol.layer.Vector({
                                        source: new ol.source.Vector({
                                            features: [iconFeature]
                                        })
                                    });

                                    var mainLayer = new ol.layer.Tile({
                                        source: new ol.source.MapQuest({
                                            layer: 'osm'
                                        })
                                    });

                                    var map = new ol.Map({
                                        target: 'map',
                                        layers: [mainLayer, iconsLayer],
                                    });


                                    map.setView(new ol.View({
                                        center: point,
                                        zoom: 15
                                    }));

                                }

                            });
                        }
                    });

                }
            }
        };
    };

})();