'use strict';

angular.module('tphPricesApp')
    .controller('PriceCtrl', function ($scope, $http, $upload, config, countryService, socket) {
        console.log('a', config.REST_URL);
        $scope.products = [];
        $scope.product = {};
        $scope.errors = {};
        $scope.country = {};
        $scope.countries = countryService.countries;

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

        $http.get(config.REST_URL+'projects/healthcrowd').success(function (response) {
            console.log('response', response);
            //socket.syncUpdates('thing', $scope.products);
        });

        //TODO

        $scope.addThing = function () {
            if ($scope.newThing === '') {
                return;
            }
            $http.post('/api/things', {name: $scope.newThing});
            $scope.newThing = '';
        };

        $scope.deleteThing = function (thing) {
            $http.delete('/api/things/' + thing._id);
        };

        $scope.$on('$destroy', function () {
            socket.unsyncUpdates('thing');
        });
    });
