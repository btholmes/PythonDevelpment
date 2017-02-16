(function(){
  'use strict';

  myApp.controller('homeCtrl', homeCtrl);

  homeCtrl.$inject = ['$state', '$scope', '$http'];

  function homeCtrl($state, $scope, $http)
  {
    // $scope.me = "Home Page";

    var vm = this;
    $scope.me = "homepage";


    $scope.headersTest = function() {
      $http({
        method: 'GET',
        url: "http://127.0.0.1:5001/testInfo"
      }).then(function(data) {
        console.log(JSON.stringify(data));
      });
    }


  }

})();