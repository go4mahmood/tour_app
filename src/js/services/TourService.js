'use strict';

angular.module('TourApp').service('TourService', ['$http',
    function ($http){
        var isTourSet = false;
        var tourSetting = {};

        return {
            isTourSet: function () {
                return isTourSet;
            },
            setTourData: function (tourData) {
                isTourSet = true;
                tourSetting = tourData;
            },
            getTourData: function () {
                return tourSetting;
            }
        };
    }]);