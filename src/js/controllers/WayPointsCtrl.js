'use strict';

/* Controller*/
angular.module('TourApp').controller('WayPointsCtrl', ['$scope', 'NgMap', 'TourService', function($scope, NgMap, TourService) {

  var vm = this;
  NgMap.getMap().then(function(map) {
    vm.map = map;
  });

  initTourSettings();

  var uniqueId = 1;
  function initTourSettings() {
    vm.route = [];

    vm.directionsSetting = {
      allPoints: [],
      start: {},
      theWaypoints: [],
      end: {}
    };

    if (TourService.isTourSet()){
      var tourData = TourService.getTourData();
      vm.route = tourData.route;
      vm.directionsSetting = tourData.directions;
    }
  }

  function setTour() {
    if(vm.directionsSetting.allPoints.length > 1 ){
      vm.directionsSetting.start = vm.directionsSetting.allPoints[0];
      vm.directionsSetting.theWaypoints = [];
      if(vm.directionsSetting.allPoints.length > 1 ){
        for (var i = 0; i < vm.directionsSetting.allPoints.length; i++ ){
          var obj = {
            location:{
              lat: vm.directionsSetting.allPoints[i].pos[0],
              lng: vm.directionsSetting.allPoints[i].pos[1]
            },
            stopover: true
          };
          vm.directionsSetting.theWaypoints.push(obj);
        }
      }
      vm.directionsSetting.end = vm.directionsSetting.allPoints[vm.directionsSetting.allPoints.length-1];
    }else{
      vm.directionsSetting.start = {};
      vm.directionsSetting.end = {};
    }

    TourService.setTourData({route: vm.route, directions: vm.directionsSetting});
  }

  $scope.$watchCollection('vm.directionsSetting.allPoints', function () {
    setTour();
  });

  vm.placeMarker = function(e) {
    var point = {
      pos: [e.latLng.lat(), e.latLng.lng()],
      title: 'Point No: '+ uniqueId,
      id: uniqueId,
      isTourPoint: true
    };
    vm.route.push(point);
    vm.directionsSetting.allPoints.push(point);
    uniqueId++;
  };

  vm.dragEnd = function(e, point) {
    var route_point = getPointById(point.id, vm.route);
    route_point.pos = [e.latLng.lat(), e.latLng.lng()];

    if(point.isTourPoint){
      var tour_point = getPointById(point.id, vm.directionsSetting.allPoints);
      tour_point.pos = [e.latLng.lat(), e.latLng.lng()];
      setTour();
    }
  };

  vm.showInfo = function(e, point) {
    vm.point = point;
    vm.map.showInfoWindow('info_window', this);
  };

  function getPointById(id, arr) {
    for (var i = 0; i < arr.length; i++){
      if (id == arr[i].id){
        return arr[i];
      }
    }
  }

  function removeMarkerFromMap(point) {
    for (var j = 0; j < vm.route.length; j++){
      if (point.id == vm.route[j].id){
        vm.route.splice(j,1);
        break;
      }
    }
  }

  function removePointFromTour(point) {
    point.isTourPoint = false;
    for (var k = 0; k < vm.directionsSetting.allPoints.length; k++){
      if (point.id == vm.directionsSetting.allPoints[k].id){
        vm.directionsSetting.allPoints.splice(k,1);
        break;
      }
    }
  }

  vm.removePoint = function(point, removeFrom) {
    if(removeFrom == 'map'){
      removeMarkerFromMap(point);
      removePointFromTour(point);
    }
    else if (removeFrom == 'tour'){
      removePointFromTour(point);
    }
  };

}]);