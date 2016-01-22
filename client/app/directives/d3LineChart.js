;
(function() {
  'use strict';
  angular.module('app.d3LineChart', ['d3'])
    .directive('d3LineChart', ['d3Service', '$window', function(d3Service, $window) {
      return {
        restrict: 'E',
        scope: {
          data: '='
        },
        link: function($scope, element, attr) {
          d3Service.d3().then(function(d3) {

            $scope.$on('dataLoaded', function(event, data) {
              if (data) init(data.values);
            });

            function init(data) {

              var parseDate = d3.time.format("%Y-%m-%d %H:%M:%S").parse;

              var margin = {
                  top: 20,
                  right: 20,
                  bottom: 30,
                  left: 40
                },
                width = 900 - margin.left - margin.right,
                height = 550 - margin.top - margin.bottom;

              var x = d3.time.scale()
                .range([0, width]);

              var y = d3.scale.linear()
                .range([height, 0]);

              var xAxis = d3.svg.axis()
                .scale(x)
                .orient("bottom");

              var yAxis = d3.svg.axis()
                .scale(y)
                .orient("left");

              var line = d3.svg.line()
                .interpolate("basis")
                .x(function(d) {
                  return x(d.date)
                })
                .y(function(d) {
                  return y(d.yValue)
                });

              var svg = d3.select(element[0]).append('svg')
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

              data.forEach(function(d) {
                d.date = parseDate(d[0]);
                d.yValue = d[1];
              })

              // remove all previous items before render
              svg.selectAll('*').remove();

              x.domain(d3.extent(data, function(d) {
                return d.date;
              }));
              y.domain(d3.extent(data, function(d) {
                return d.yValue;
              }));

              svg.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + height + ")")
                .call(xAxis);

              svg.append("g")
                .attr("class", "y axis")
                .call(yAxis);

              svg.append("path")
                .datum(data)
                .attr("class", "line")
                .attr("d", line);

            }
          });
        }
      };
    }]);
})();
