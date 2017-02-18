(function(){
    'use strict';

    myApp.controller('discoverCtrl', discoverCtrl);

    discoverCtrl.$inject = ['$state', '$scope', '$http', '$stateParams'];

    function discoverCtrl($state, $scope, $http, $stateParams)
    {

        $scope.name = "Discover Page";
        $scope.init = function() {

        }

        $scope.showLoading = function() {
            $(".loader").css("display", "block");
            $(".loader").fadeIn("slow");
        }


        $scope.discoverAllArtists = function() {

            $scope.showLoading();
            $http({
                method: 'GET',
                url: "http://127.0.0.1:5001/discover_all"
            }).then(function(data) {
                console.log(JSON.stringify(data.data));
                console.log("finished");
                $(".loader").fadeOut();
            });

        }

        $(".header.navStuff").removeClass("navStuff");
        $scope.init();



    }

})();