;
(function() {
  'use strict';
  angular.module('app.chart', ['ngMaterial'])
    .controller('ChartCtrl', function($scope, DataService) {

      $scope.title = "Chart 1";

      $scope.showChartData = function() {
        DataService.getData()
          .then(function(data) {
            $scope.data = data;
          })
          .catch(function(error) {
            console.error(error);
          });
      };
      $scope.showChartData();

    })
})();
