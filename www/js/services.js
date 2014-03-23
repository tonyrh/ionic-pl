angular.module('starter.services', [])

.factory('eventiService', function ($http) {

  return {
    getPoisAsync: function(callback) {
      $http.get('http://192.168.0.101/jsonEventi.php').success(callback);
    },
    getMoreEvents: function(after, callback) {
      $http.get('http://192.168.0.101/jsonEventi.php?limit=6&after=' + after).success(callback);
    }
  };

});
