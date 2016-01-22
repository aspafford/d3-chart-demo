;
(function() {
  'use strict';

  angular.module('app', [
    'd3',
    'ngRoute',
    'app.dataService',
    'app.d3LineChart',
    'app.chart'
  ])

  .config(function($routeProvider) {
    $routeProvider
      .when('/chart/:id', {
        templateUrl: 'app/chart/chart.html',
        controller: 'ChartCtrl'
      })
      .otherwise({
        redirectTo: '/chart/1'
      });
  });

})();
