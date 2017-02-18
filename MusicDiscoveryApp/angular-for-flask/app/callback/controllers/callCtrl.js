(function(){
    'use strict';

    myApp.controller('callCtrl', callCtrl);

    callCtrl.$inject = ['$state', '$scope', '$http'];

    function callCtrl($state, $scope, $http)
    {
        $scope.userData = [];
        $scope.name = "";
        $scope.imgUrl = "";
        $scope.country = "";
        $scope.email = "";



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
            $scope.showLoading();
            $http({
                method: 'GET',
                url: "http://127.0.0.1:5001/user_info"
            }).then(function(data) {
                $(".loader").fadeOut();
                data = data.data;

                $scope.name = data['display_name'];
                $scope.imgUrl = data['images'][0]['url'];
                $scope.country = data['country'];
                $scope.email = data['email'];

                localStorage.setItem("name", data['display_name']);
                localStorage.setItem("id", data['id']);
                localStorage.setItem("userHref",data['href']);
            });
        }

        $(".header.navStuff").removeClass("navStuff");


        $scope.init();




    }

})();