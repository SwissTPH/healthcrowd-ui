'use strict';

angular.module('tphPricesApp')
    .controller('PriceCtrl', function ($scope, $http, $upload, config, socket) {
        $scope.drugs = [];
        $scope.drug = {};
        $scope.errors = {};

        $scope.addPrice = function (form) {
            $scope.submitted = true;

            if (form.$valid) {
                Auth.login({
                    email: $scope.user.email,
                    password: $scope.user.password
                })
                    .then(function () {
                        // Logged in, redirect to home
                        $location.path('/');
                    })
                    .catch(function (err) {
                        $scope.errors.other = err.message;
                    });
            }
        };

        $http.get(config.REST_URL).success(function (response) {
            console.log('response', response);
            //socket.syncUpdates('thing', $scope.products);
        });

        $http.get(config.REST_URL + 'projects/healthcrowd').success(function (response) {
            console.log('response', response);
            //socket.syncUpdates('thing', $scope.products);
        });

        //TODO chart refactor
        // TODO move to chartService, not important
        var daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
        var chartOptions = {
            labels: daysOfWeek,
            datasets: [{
                label: "Forecast",
                fillColor: "rgba(220,220,220,0.2)",
                strokeColor: "rgba(220,220,220,1)",
                pointColor: "rgba(220,220,220,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(220,220,220,1)",
                data: new Array(7)
            }]
        };

        // tracked by meteor tracker :)
        var prices = new ReactiveArray([25, 31, 30.2, 32.4, 31.1, 27.9, 19.2]);
        var ctx = document.getElementById("chartjs-mount").getContext("2d");
        var temperatureChart;

        Tracker.autorun(function () {
            // Initialize the chart if it is first time rendering
            if (!temperatureChart)
                temperatureChart = new Chart(ctx).Line(chartOptions);

            // Set the data for the chart
            for (var i = 0; i < prices.length(); i++)
                temperatureChart.datasets[0].points[i].value = prices.get(i);
            temperatureChart.update();
        });

        var maxDelta = 20;
        var randomlyUpdateForecast = function () {
            console.log('updated');
            var day = Math.floor(Math.random() * 7);
            var delta = Math.floor(Math.random() * (maxDelta * 2 + 1)) - maxDelta + 0.3;
            prices.set(day, prices.get(day) + delta);
        };

        setTimeout(randomlyUpdateForecast, 25000);
        //end of chart refactor


        //TODO cleanup file upload
        //$scope.usingFlash = FileAPI && FileAPI.upload != null;
        //$scope.fileReaderSupported = window.FileReader != null && (window.FileAPI == null || FileAPI.html5 != false);

        $scope.$watch('files', function (files) {
            $scope.formUpload = false;
            if (files != null) {
                for (var i = 0; i < files.length; i++) {
                    $scope.errorMsg = null;
                    (function (file) {
                        generateThumbAndUpload(file);
                    })(files[i]);
                }
            }
        });
        $scope.uploadPic = function (files) {
            $scope.formUpload = true;
            if (files != null) {
                generateThumbAndUpload(files[0])
            }
        };
        function generateThumbAndUpload(file) {
            $scope.errorMsg = null;
            $scope.generateThumb(file);
            if ($scope.howToSend == 1) {
                uploadUsing$upload(file);
            } else if ($scope.howToSend == 2) {
                uploadUsing$http(file);
            } else {
                uploadS3(file);
            }
        }

        // who does that?
        $scope.generateThumb = function (file) {
            if (file != null) {
                if ($scope.fileReaderSupported && file.type.indexOf('image') > -1) {
                    $timeout(function () {
                        var fileReader = new FileReader();
                        fileReader.readAsDataURL(file);
                        fileReader.onload = function (e) {
                            $timeout(function () {
                                file.dataUrl = e.target.result;
                            });
                        }
                    });
                }
            }
        };
        //end of clenup

        $http.get('/api/drugs').success(function (drugs) {
            $scope.drugs = drugs;
            socket.syncUpdates('drug', $scope.drugs);
        });

        $scope.addDrug = function () {
            if ($scope.drug === {}) {
                return;
            }
            $http.post('/api/drugs', $scope.drug);
            $scope.drug = {};
        };

        $scope.delete = function (drug) {
            $http.delete('/api/drugs/' + drug._id);
        };

        $scope.$on('$destroy', function () {
            socket.unsyncUpdates('drug');
        });

    });
