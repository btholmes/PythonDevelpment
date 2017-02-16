(function(){
    'use strict';

    myApp.controller('discoverCtrl', discoverCtrl);

    discoverCtrl.$inject = ['$state', '$scope', '$http', '$stateParams'];

    function discoverCtrl($state, $scope, $http, $stateParams)
    {

        $scope.name = "Discover Page";
        $scope.init = function() {

        }

        $(".header.navStuff").removeClass("navStuff");
        $scope.init();

    }

})();