'use strict';

/**
 * Config for the router
 */
angular.module('TourApp')
  .run(
    [ '$rootScope', '$state', '$stateParams',
      function ($rootScope,   $state,   $stateParams) {
          $rootScope.$state = $state;
          $rootScope.$stateParams = $stateParams;        
      }
    ]
  )
  .config(
    [          '$stateProvider', '$urlRouterProvider', '$locationProvider',
      function ($stateProvider, $urlRouterProvider, $locationProvider) {

          $locationProvider.hashPrefix('');

          $urlRouterProvider
              .otherwise('/way-points');
          
          $stateProvider
              .state('way-points', {
                  url: '/way-points',
                  templateUrl: "src/tpl/views/way_points.html",
                  controller: 'WayPointsCtrl',
                  controllerAs: 'vm'
              })
              .state('view-tour', {
                  url: '/view-tour',
                  templateUrl: "src/tpl/views/view_tour.html",
                  controller: 'ViewTourCtrl',
                  controllerAs: 'vm'
              });
      }
    ]
  );
