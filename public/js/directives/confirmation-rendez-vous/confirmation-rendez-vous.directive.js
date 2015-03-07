(function () {

    'use strict';

    angular.module('app').directive('confirmationRendezVous', confirmationRendezVous);

    function confirmationRendezVous(GetService, PostService) {
        return {
            templateUrl: '/js/directives/confirmation-rendez-vous/confirmation-rendez-vous.html',
            restrict: 'EA',
            scope: {
                appointment: '='
            },
            link: {
                pre: function preLink($scope, $element, $attrs) {

                    // scope attributes
                    $scope.user = {
                        firstName: '',
                        lastName: '',
                        email: '',
                        phone: ''
                    };

                    $scope.errorEmpty = false;
                    $scope.errorEmail = false;
                    $scope.errorPhone = false;

                    $scope.practicianLabel;

                    // scope methods
                    $scope.saveAppointment = saveAppointment;
                    $scope.hideErrors = hideErrors;
                    $scope.open = open;
                    $scope.doBack = doBack;

                    init();

                    function init() {

                        $scope.$watch('appointment', function (appointment, old) {
                            console.log('appointment: ', appointment);
                            if (appointment) {

                                $scope.practicianLabel = "le Docteur " + $scope.appointment.doctor.nom;

                                if (isNotDoctor($scope.appointment.doctor.specialities)) {
                                    $scope.practicianLabel = $scope.appointment.doctor.prenom + " " + $scope.appointment.doctor.nom;
                                }
                                console.log("recu appointment: ", $scope.appointment);
                            }
                        });

                    }

                    function isNotDoctor(specialities) {
                        for (var i = 0; i < specialities.length; i++) {
                            if (specialities[i].idSpecialite === 2 || specialities[i].idSpecialite === 7) {
                                return true;
                            }
                        }
                    }

                    function validateEmail(email) {
                        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                        return re.test(email);
                    }

                    function validatePhoneNumber(phoneNumber) {
                        var re = /^\d{10}$/;
                        return re.test(phoneNumber);
                    }

                    function finalConfirmation(appointment) {

                        $scope.finalConfirmationData = {
                            confirmationMethod: '',
                            practicianLabel: ''
                        };

                        if (appointment.office.idCabinet == 3 &&
                            (appointment.user.phone.substr(1, 1) == '6' || appointment.user.phone.substr(1, 1) == '7')) {
                            $scope.finalConfirmationData.confirmationMethod = 'Vous allez recevoir un SMS de confirmation.'
                        } else {
                            $scope.finalConfirmationData.confirmationMethod = 'Vous allez recevoir un e-mail de confirmation.'
                        }

                        if (isNotDoctor(appointment.doctor.specialities)) {
                            $scope.finalConfirmationData.practicianLabel = appointment.doctor.prenom + " " + appointment.doctor.nom;
                        } else {
                            $scope.finalConfirmationData.practicianLabel = "le Docteur " + $scope.appointment.doctor.nom;
                        }
                    }

                    function doBack() {
                        window.history.back();
                    }

                    function hideErrors(index) {
                        switch (index) {
                        case 1:
                            $scope.errorEmpty = false;
                            break;
                        case 2:
                            $scope.errorEmail = false;
                            break;
                        case 3:
                            $scope.errorPhone = false;
                            break;
                        }
                    }

                    function saveAppointment() {
                        if ($scope.user.lastName && $scope.user.firstName && $scope.user.email && $scope.user.phone) {
                            if ($scope.errorEmpty) {
                                $scope.errorEmpty = false;
                            }
                        } else {
                            $scope.errorEmpty = true;
                        }

                        if (!$scope.errorEmpty) {
                            if (!validateEmail($scope.user.email)) {
                                $scope.errorEmail = true;
                            } else {
                                if ($scope.errorEmail) {
                                    $scope.errorEmail = false;
                                }
                            }

                            if (!validatePhoneNumber($scope.user.phone) || ($scope.user.phone.substring(0, 1) != '0')) {
                                $scope.errorPhone = true;
                            } else {
                                if ($scope.errorPhone) {
                                    $scope.errorPhone = false;
                                }
                            }
                        }

                        if ((!$scope.errorEmpty) && (!$scope.errorEmail) && (!$scope.errorPhone)) {
                            console.log("saveRV appointment", $scope.appointment);

                            var appointment = $scope.appointment;
                            appointment.user = $scope.user;

                            GetService.getIsAppointmentAvailable(appointment).success(function (data) {
                                console.log('getIsAppointmentAvailable : ', data);
                                if (data.output.isAvailable) {

                                    PostService.saveAppointment(appointment).success(function (data) {
                                        console.log('saveAppointment res: ', data);
                                        if (data.status == "success") {
                                            console.log('Appointment saved.');
                                            finalConfirmation(appointment);
                                        } else {}
                                    }).error(function (data, status) {
                                        console.log(status);
                                        console.log(data);
                                    });
                                } else {
                                    //TODO implement something sexier (modal)
                                    alert("Le rendez-vous n'est plus disponible");
                                }
                            }).error(function (data, status) {
                                console.log(status);
                                console.log(data);
                            });
                        }
                    }

                }
            }
        };
    };

})();