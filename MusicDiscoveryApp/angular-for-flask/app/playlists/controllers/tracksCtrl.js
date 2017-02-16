(function(){
    'use strict';

    myApp.controller('tracksCtrl', tracksCtrl);

    tracksCtrl.$inject = ['$state', '$scope', '$http', '$stateParams'];

    function tracksCtrl($state, $scope, $http, $stateParams)
    {
        // Passes the json data as urlParam string
        $scope.tracksData = [];
        $scope.name = $stateParams.name;

        $scope.init = function() {
            var data = JSON.parse($stateParams.urlParam);
            console.log($stateParams.urlParam);
            // $scope.tracksData = data['items'][0]['track']['album']['name'];
            $scope.tracksData = data['items'];
        }

        $scope.init();

    }

})();