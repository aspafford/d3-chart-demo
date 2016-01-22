angular.module('app.dataService', [])

.factory('DataService', function($http) {

  // load default chart selection
  selectedChart = 1;

  var getData = function(id) {
    return $http({
        method: 'GET',
        url: '/data/data_test.csv'
      })
      .then(function successCallback(response) {
        return CSVToArray(response.data, id);
      }, function errorCallback(response) {
        console.log('error fetching .csv file', response)
      });
  };

  function CSVToArray(strData, id) {
    var result = { values: [] };
    // parse lines of csv file
    var lines = strData.match(/[^\r\n]+/g);

    if (Array.isArray(lines)) {
      // store first line of csv file as an array of column names
      var columns = lines.shift();
      result.columns = columns.split(/,/);
      // store remaining lines as values array
      lines.forEach(function(l) {
        var data = l.split(/,/);
        // push date (x-axis) and selected column (y-axis)
        result.values.push([ data[0], data[id] ]);
      });
    } else {
      console.log('CSV File is empty');
    }

    return result;
  }

  return {
    getData: getData,
    selectedChart: selectedChart
  };
});
