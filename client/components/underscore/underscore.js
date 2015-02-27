/**
 * Created by syzer on 5/12/2014.
 */
angular
    .module('_', [])
    .factory('_', function () {
        'use strict';

        var _ = window._;
        var isNumerical = function (string) {
            return !_.isNaN(_.parseInt(string));
        };
        // new Date will not interpolate
        var isISODate = function (string) {
            return !_.isNaN(Date.parse(string));
        };

        var extractProps = function (columns, name, p) {
            var e = {};
            _.forIn(p, function (value, key) {
                if (_.some(columns, {name: key})) {
                    e[key] = value;
                }
            });

            return e;
        };

        var extract = _.curry(extractProps);

        _.mixin({
            isNumerical: isNumerical,
            isISODate: isISODate,
            // extract(columns)('name')({'AgeUpper':44, 'notThat':'XXX'})
            // .map(_.extract(columns)('name')) => function(el)
            extract: extract
        });

        return _; // assumes underscore has already been loaded on the page
    });
