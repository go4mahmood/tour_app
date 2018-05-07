'use strict';

/* Controller*/
angular.module('TourApp').controller('ViewTourCtrl', ['TourService', function(TourService) {

  var vm = this;
  var tourData = TourService.getTourData();
  vm.route = tourData.route;
  vm.directionsSetting = tourData.directions

}]);