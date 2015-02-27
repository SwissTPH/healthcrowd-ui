/**
 * Created by syzer on 6/11/2014.
 */
angular
    .module('alert', [])
    .factory('alertService', function ($log, $timeout, toaster,_) {
        'use strict';

        var ANIMATION_TIMEOUT_FADE_IN = 100;     // ex: fade in
        var ANIMATION_TIMEOUT = 1000;           // ex: fade out
        var defTimeout = {
            error: 0,
            warn: 9000,
            info: 5000,
            success: 5000
        };

        return {

            alerts: [
                //{type: 'danger', msg: 'Oh snap! Change a few things up and try submitting again.', show: false  },
                //{type: 'success', msg: 'Well done! You successfully read this important alert message.', show: false }
            ],

            /**
             * @param message
             * @param typeInj danger|info|success
             * @param timeout timeout
             * @param ifShow default true
             */
            addAlert: function (message, typeInj, timeout, ifShow) {
                var show = ifShow || true;
                var type = typeInj || 'error';
                this.alerts.push({
                    msg: message,
                    type: type,
                    show: false
                });

                // animate
                var lastAlert = _.last(this.alerts);
                $timeout(function () {
                    lastAlert.show = show;
                }, ANIMATION_TIMEOUT_FADE_IN);

                if (timeout) {
                    var that = this;
                    $timeout(function () {
                        that.closeAlert(lastAlert);
                    }, timeout);
                }
                toaster.pop(typeInj, typeInj, message, timeout);
            },

            // usage: alertServxice.warn('Server error', 5000);
            // usage: alertService.warn('Server error');
            warn: function (message, timeoutInj, ifShow) {
                var timeout = timeoutInj || defTimeout.error;
                this.addAlert(message, 'error', timeout, ifShow);
            },

            // usage: alertService.info('Server server');
            info: function (message, timeoutInj, ifShow) {
                var timeout = timeoutInj || defTimeout.info;
                this.addAlert(message, 'info', timeout, ifShow);
            },

            success: function (message, timeoutInj, ifShow) {
                var timeout = timeoutInj || defTimeout.success;
                this.addAlert(message, 'success', timeout, ifShow);
            },

            error: function (message, timeoutInj, ifShow) {
                var timeout = timeoutInj || defTimeout.error;
                this.addAlert(message, 'error', timeout, ifShow);
            },

            // works with id
            closeAlertId: function (index) {
                var alerts = this.alerts;

                // animate
                alerts[index].show = false;
                $timeout(function () {
                    alerts.splice(index, 1);
                }, ANIMATION_TIMEOUT);
            },

            // first hide and after timeout remove
            closeAlert: function (alert) {
                var alerts = this.alerts;

                // animate
                alert.show = false;
                $timeout(function () {
                    return _.remove(alerts, alert);
                }, ANIMATION_TIMEOUT);
            },

            clearAlerts: function () {
                this.alerts.forEach(function (alert) {
                    this.closeAlert(alert);
                });
            }
        };
    });
