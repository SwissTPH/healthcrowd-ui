'use strict';

angular.module('tphPricesApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('price', {
                url: '/price',
                templateUrl: 'app/price/price.html',
                controller: 'PriceCtrl'
            });
    });
