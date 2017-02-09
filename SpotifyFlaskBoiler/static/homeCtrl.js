(function(){
    'use strict';

    myApp.controller('homeCtrl', homeCtrl);

    homeCtrl.$inject = ['$state', '$scope', '$http'];

    function homeCtrl($state, $scope, $http)
    {
        $scope.me = "Home Page";


        $scope.showTracks = function () {
            console.log("in show class");
            var id = event.target.getAttribute('data');

            $("#" + id).toggleClass("hide");
            if(event.target.getAttribute('class').indexOf("hide") < 0){
                $.ajax({
                    type: "GET",
                    url: "/tracks",
                    dataType: "html",
                    success: function (msg) {
                        // alert("in show SUCCESS");
                        // console.log(JSON.stringify(msg));
                        msg = JSON.parse(msg);
                        $("#" + "spotify_netherlandstracks").html("Spotifynetherlandstracks");
                    },
                    error: function (xhr, status, error) {
                        console.log(error);
                    }
                });
            }


        }



    }

})();