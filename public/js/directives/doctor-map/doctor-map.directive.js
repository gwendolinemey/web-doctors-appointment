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

                        if (praticien && praticien.Cabinets && praticien.Cabinets.length > 0) {
                            console.log('Praticien: ', praticien);

                            var iconStyle = new ol.style.Style({
                                image: new ol.style.Icon(({
                                    anchor: [0.5, 46],
                                    anchorXUnits: 'fraction',
                                    anchorYUnits: 'pixels',
                                    opacity: 0.75,
                                    src: '/img/marker.png'
                                }))
                            });

                            var coordinates = praticien.Cabinets.reduce(function (coordinates, cabinet) {

                                if (cabinet.latitude && cabinet.longitude) {
                                    var latitude = parseFloat(cabinet.latitude);
                                    var longitude = parseFloat(cabinet.longitude);

                                    var point = ol.proj.transform([longitude, latitude], 'EPSG:4326', 'EPSG:3857');

                                    coordinates.push(point);
                                }

                                return coordinates;
                            }, []);


                            if (coordinates && coordinates.length > 0) {
                                var iconFeatures = coordinates.reduce(function (iconFeatures, point) {
                                    var iconFeature = new ol.Feature({
                                        geometry: new ol.geom.Point(point)
                                    });

                                    iconFeature.setStyle(iconStyle);

                                    iconFeatures.push(iconFeature);
                                    return iconFeatures;
                                }, []);


                                var iconsLayer = new ol.layer.Vector({
                                    source: new ol.source.Vector({
                                        features: iconFeatures
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


                                var pointsExtremities = coordinates.reduce(function (pointsExtremities, point) {
                                    console.log(point);
                                    if (!pointsExtremities.xMin || pointsExtremities.xMin > point[0]) {
                                        pointsExtremities.xMin = point[0];
                                    }
                                    if (!pointsExtremities.xMax || pointsExtremities.xMax < point[0]) {
                                        pointsExtremities.xMax = point[0];
                                    }
                                    if (!pointsExtremities.yMin || pointsExtremities.yMin > point[1]) {
                                        pointsExtremities.yMin = point[1];
                                    }
                                    if (!pointsExtremities.yMax || pointsExtremities.yMax < point[1]) {
                                        pointsExtremities.yMax = point[1];
                                    }
                                    return pointsExtremities;
                                }, {});

                                var xCenter = (pointsExtremities.xMax + pointsExtremities.xMin) / 2;
                                var yCenter = (pointsExtremities.yMax + pointsExtremities.yMin) / 2;

                                var centerPoint = [xCenter, yCenter];

                                map.setView(new ol.View({
                                    center: centerPoint,
                                    zoom: 15
                                }));

                            }

                        }

                    });
                }
            }
        };
    };

})();