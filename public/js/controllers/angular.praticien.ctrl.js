(function () {

    'use strict';

    angular.module('app').controller('praticienCtrl', praticienCtrl);

    function praticienCtrl($scope, DS) {

        var reference = window.location.pathname.substring('/praticien/'.length);

        var index = reference.indexOf('/');
        if (index !== -1) {
            reference = reference.substr(0, index);
        }

        DS.find('praticiens', reference).then(function (praticien) {
            console.log('Praticen: ', praticien);
            console.log('Absences: ', praticien.Absences[0]);
            $scope.praticien = praticien;

          // TODO call  updateAvailableAppointments
        });

        var cabinet = {
            idCabinet: '',
            adresse: ''
        };
        var showLimitAppointments = 5;

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

        GetService.getDoctorsByOffice(cabinet.idCabinet).success(function (data) {
            console.log('getDoctorsByOffice : ', data);
            $scope.doctors = data.output;

            // initialise select elements
            angular.forEach($scope.doctors, function (doctor) {
                doctor.selectedAct = doctor.acts[0];
                doctor.currentWeek = 0;
                doctor.previousDisabled = true;
                doctor.nextDisabled = false;

                console.log("doctor", doctor.idPraticien);

                getAvailabilities(cabinet, doctor);
            });
        }).error(function (data, status) {

            console.log(status);
            console.log(data);
        });

        $scope.updateAvailableAppointments = function (doctor) {
            getAvailabilities(cabinet, doctor);
        };

        $scope.seeNext = function (doctor) {
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

        $scope.seePrevious = function (doctor) {
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

        $scope.showMore = function (doctor) {
            doctor.showLimit = 200;
            doctor.showMoreVisible = false;
            doctor.showLessVisible = true;
        };

        $scope.showLess = function (doctor) {
            doctor.showLimit = showLimitAppointments;
            doctor.showMoreVisible = true;
            doctor.showLessVisible = false;
        };

        $scope.submitRV = function (doctor, day, appointmentTime) {

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
                    AppointmentManager.setAppointment(appointment);
                    window.location.href = '#/confirmation-rendezvous';
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

})();