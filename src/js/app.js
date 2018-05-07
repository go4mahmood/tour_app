'use strict';

angular.module('TourApp', [ 'ui.router', 'ngMap', 'ui.bootstrap', 'toaster']);

angular.module('TourApp').config(function($qProvider) {
    $qProvider.errorOnUnhandledRejections(false);
});