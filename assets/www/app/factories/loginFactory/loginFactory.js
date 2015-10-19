(function() {
  'use strict';
  angular.module('starter').factory('loginFactory', function($http, $q, APP_CONFIG) {
    var dataFactory, urlBase;
    urlBase = APP_CONFIG.baseApiUrl ;
    dataFactory = {};
    dataFactory.requestOTP = function(mobile) {
      var deferred;
      deferred = $q.defer();

      $http({
        method: "POST",
        url: urlBase + "/sendOtp.php",
        data: {mobile: mobile},
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        transformRequest: function(obj) {
          var str = [];
          for(var p in obj)
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
          return str.join("&");
        },
      }).success(function(data, status, headers, config) {
        deferred.resolve(data);
        return
        return
      }).error(function(data, status) {
        return deferred.reject(data);
      });

      return deferred.promise;
    };

    dataFactory.verifyOTP = function(mobile,code) {
      var deferred;
      deferred = $q.defer();
      $http({
        method: 'POST',
        url: urlBase + "/checkOtp.php",
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        transformRequest: function(obj) {
          var str = [];
          for(var p in obj)
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
          return str.join("&");
        },
        data: {mobile: mobile,code:code},

      }).success(function(data, status, headers, config) {
        deferred.resolve(data);

      }).error(function(data, status) {
        return deferred.reject(data);
      });

      return deferred.promise;
    };

    return dataFactory;
  });

}).call(this);

//# sourceMappingURL=categoryFactory.js.map
