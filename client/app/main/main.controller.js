'use strict';

angular.module('tphPricesApp')
    .controller('MainCtrl', function ($scope, $http, socket) {
        $scope.awesomeThings = [];
        $scope.drugs = [];

        $http.get('/api/drugs').success(function (drugs) {
            $scope.drugs = drugs;
            socket.syncUpdates('drugs', $scope.drugs);
        });

        $http.get('/api/things').success(function (awesomeThings) {
            $scope.awesomeThings = awesomeThings;
            socket.syncUpdates('thing', $scope.awesomeThings);
        });

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
