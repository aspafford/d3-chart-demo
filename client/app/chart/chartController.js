;
(function() {
  'use strict';
  angular.module('app.chart', ['ngMaterial'])
    .controller('ChartCtrl', function($scope, $rootScope, $routeParams, DataService) {

      $scope.showChartData = function() {
        DataService.getData($routeParams.id)
          .then(function(data) {
            $rootScope.$broadcast('dataLoaded', data.columns);
            $scope.data = data;
          })
          .catch(function(error) {
            console.error(error);
          });
      };
      $scope.showChartData();

    })
    .controller('ChartPickerCtrl', function($scope, $rootScope, $location, $q, DataService) {
      var self = this;
      $rootScope.$on('dataLoaded', function(event, columns) {
        self.columns = columns;
      })
      $scope.change = function(key) {
        DataService.selectedChart = parseInt(key);
        $location.path('/chart/' + key)
      }
      $scope.selected = function(key) {
        return key === DataService.selectedChart;
      }
    })
})();
