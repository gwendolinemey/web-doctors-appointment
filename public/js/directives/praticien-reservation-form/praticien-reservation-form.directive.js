(function () {

    'use strict';

    angular.module('app').directive('praticienReservationForm', praticienReservationForm);

    function praticienReservationForm(GetService) {
        return {
            templateUrl: '/js/directives/praticien-reservation-form/praticien-reservation-form.html',
            restrict: 'EA',
            scope: {
                cabinet: '='
            },
            link: {
                pre: function preLink($scope, $element, $attrs) {

                    // local variables
                    var showLimitAppointments = 5;
                    var cabinet = {
                        idCabinet: 1,
                        adresse: ''
                    };

                    // scope attributes
                    $scope.quantityWeek = 7;

                    // scope methods
                    $scope.updateAvailableAppointments = updateAvailableAppointments;
                    $scope.seeNext = seeNext;
                    $scope.seePrevious = $scope.seePrevious;
                    $scope.showMore = showMore;
                    $scope.showLess = showLess;
                    $scope.submitRV = submitRV;

                    init();

                    function init() {
                        // TODO use reference form path

                        $scope.$watch('cabinet', function (scopeCabinet, old) {

                            if (scopeCabinet && scopeCabinet.idCabinet) {

                                cabinet.idCabinet = scopeCabinet.idCabinet;

                                console.log('Loading cabinet "%s" informations.', $scope.cabinetReference);
                                
                                GetService.getDoctorsByOffice(cabinet.idCabinet).success(function (data) {
                                    $scope.doctors = data.output;

                                    console.log('getDoctorsByOffice : ', $scope.doctors);

                                    // initialise select elements
                                    angular.forEach($scope.doctors, function (doctor) {
                                        doctor.selectedAct = doctor.acts[0];
                                        doctor.currentWeek = 0;
                                        doctor.previousDisabled = true;
                                        doctor.nextDisabled = false;

                                        console.log("doctor", doctor.idPraticien);

                                        if (doctor.selectedAct) {
                                            getAvailabilities(cabinet, doctor);
                                        } else {
                                            console.error('No act for doctor "%s %s".', doctor.prenom, doctor.nom);
                                        }

                                    });
                                }).error(function (data, status) {

                                    console.log(status);
                                    console.log(data);
                                });
                            }
                        });

                    }

                    function getAvailabilities(cabinet, doctor) {
                        GetService.getAvailableAppointements(cabinet.idCabinet, doctor.idPraticien, doctor.selectedAct, doctor.currentWeek).success(function (data) {
                            console.log('getAvailableAppointements : ', data);
                            doctor.availabilities = data.output.availabilities;
                            doctor.showLimit = showLimitAppointments;
                            doctor.showMoreVisible = false;
                            for (var i = 0; i < doctor.availabilities.length; i++) {
                                if (doctor.availabilities[i].appointments.length > doctor.showLimit) {
                                    doctor.showMoreVisible = true;
                                }
                            };
                            doctor.showLessVisible = false;
                            doctor.absences = data.output.absences;
                        }).error(function (data, status) {
                            console.log(status);
                            console.log(data);
                        });
                    }


                    function updateAvailableAppointments(doctor) {
                        getAvailabilities(cabinet, doctor);
                    };

                    function seeNext(doctor) {
                        console.log("NEXT", doctor.currentWeek);
                        if (doctor.currentWeek === 0) {
                            doctor.previousDisabled = false;
                        }
                        doctor.currentWeek++;
                        if (doctor.currentWeek == (doctor.semaines_ouvertes - 1)) {
                            doctor.nextDisabled = true;
                        }
                        getAvailabilities(cabinet, doctor);
                    };

                    function seePrevious(doctor) {
                        console.log("PREVIOUS", doctor.currentWeek);
                        doctor.currentWeek--;
                        if (doctor.currentWeek === 0) {
                            doctor.previousDisabled = true;
                        }
                        if (doctor.nextDisabled) {
                            doctor.nextDisabled = false;
                        }
                        getAvailabilities(cabinet, doctor);
                    };

                    function showMore(doctor) {
                        doctor.showLimit = 200;
                        doctor.showMoreVisible = false;
                        doctor.showLessVisible = true;
                    };

                    function showLess(doctor) {
                        doctor.showLimit = showLimitAppointments;
                        doctor.showMoreVisible = true;
                        doctor.showLessVisible = false;
                    };

                    function submitRV(doctor, day, appointmentTime) {

                        var appointment = {
                            doctor: doctor,
                            time: appointmentTime,
                            dayDate: day,
                            office: cabinet,
                            acte: doctor.selectedAct.labelActe
                        };

                        console.log("submitRV : ", appointment);

                        GetService.getIsAppointmentAvailable(appointment).success(function (data) {
                            console.log('getIsAppointmentAvailable : ', data);
                            if (data.output.isAvailable) {
                                $scope.appointment = appointment;
                            } else {
                                //TODO implement something more sexy (modal)
                                alert("Le rendez-vous n'est plus disponible");
                            }
                        }).error(function (data, status) {
                            console.log(status);
                            console.log(data);
                        });

                    };
                }
            }
        };
    };

})();