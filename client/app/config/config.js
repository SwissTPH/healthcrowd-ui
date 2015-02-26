'use strict';
//TODO .config()
angular.module('tphPricesApp')
    .factory('config', function () {
        return {
            REST_URL: 'http://kumbo.tph.unibas.ch:8261/'
        }
    });
