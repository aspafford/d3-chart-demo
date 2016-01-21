angular.module('app.dataService', [])

.factory('DataService', function($http) {

  var getData = function() {
    return $http({
        method: 'GET',
        url: '/data/data_test.csv'
      })
      .then(function successCallback(response) {
        return CSVToArray(response.data);
      }, function errorCallback(response) {
        console.log('error fetching .csv file', response)
      });
  };

  function CSVToArray(strData) {

    var result, lines, keys;

    result = [];

    lines = strData.match(/[^\r\n]+/g);

    if (Array.isArray(lines)) {
      keys = lines.shift();
      // console.log(keys, 'keys');

      lines.forEach(function(l) {
        var data = l.split(/,/);
        result.push(data);
      });
    } else {
      console.log('CSV File is empty');
    }

    return result;
  }

  return {
    getData: getData
  };
});
