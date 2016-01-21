angular.module('app.dataService', [])

.factory('DataService', function($http) {

  var getData = function() {
    return $http({
        method: 'GET',
        url: 'data/data_test.csv'
      })
      .then(function(resp) {
        return CSVToArray(resp.data);
      });
  };

  function CSVToArray(strData) {

    var result = [];

    var lines = strData.match(/[^\r\n]+/g);

    var keys = lines.shift();
    // console.log(keys, 'keys');

    lines.forEach(function(l) {
      var data = l.split(/,/);
      result.push(data);
    });

    return result;
  }

  return {
    getData: getData
  };
});
