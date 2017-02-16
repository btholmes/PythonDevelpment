(function(){
    'use strict';

    myApp.controller('callCtrl', callCtrl);

    callCtrl.$inject = ['$state', '$scope', '$http'];

    function callCtrl($state, $scope, $http)
    {
        $scope.userData = [];


        $scope.showLoading = function() {
            $(".loader").css("display", "block");
            $(".loader").fadeIn("slow");
        }

        $scope.getTracks = function() {
            $scope.showLoading();
            $http({
                method: 'GET',
                url: "http://127.0.0.1:5001/tracks"
            }).then(function(data) {
                console.log(JSON.stringify(data));
                $(".loader").fadeOut();
            });
        }

        $scope.refreshToken = function() {
            $scope.showLoading();
            $http({
                method: 'GET',
                url: "http://127.0.0.1:5001/refresh_token"
            }).then(function(data) {
                data = data.data;
                $("#newAccess").html(JSON.stringify(data))
                console.log(JSON.stringify(data));
                $(".loader").fadeOut();
            });
        }



        $scope.init = function(){
            console.log("Init");
            $http({
                method: 'GET',
                url: "http://127.0.0.1:63342/AngularFlaskSpotifyBoiler/base-flask-app/angular-for-flask/php/getInfo.php"
            }).then(function(data) {
                console.log(data);
                // data = JSON.parse(data);
                // alert(JSON.stringify(data.data[0].images[0].url));
                // $("#userInfo").html(JSON.stringify(data));
                $scope.userData = data.data;
            });
        }

        $(".header.navStuff").removeClass("navStuff");


        $scope.init();




    }

})();