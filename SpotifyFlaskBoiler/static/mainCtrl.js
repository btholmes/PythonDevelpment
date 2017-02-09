(function () {

    'use strict';

    angular.module('myApp', [])

        .controller('mainCtrl', ['$scope', '$log',
            function($scope, $log) {
                $scope.Title = "Playlists";
                alert("in main ctrl");

                // $scope.showTracks = function () {
                //     var id = event.target.getAttribute('data');
                //
                //     $("#" + id).toggleClass("hide");
                //     if(event.target.getAttribute('class').indexOf("hide") < 0){
                //         $.ajax({
                //             type: "GET",
                //             url: "/tracks",
                //             dataType: "html",
                //             success: function (msg) {
                //                 // alert("in show SUCCESS");
                //                 // console.log(JSON.stringify(msg));
                //                 msg = JSON.parse(msg);
                //                 $("#" + "spotify_netherlandstracks").html("Spotifynetherlandstracks");
                //             },
                //             error: function (xhr, status, error) {
                //                 console.log(error);
                //             }
                //         });
                //     }
                //
                //
                // }
            }

        ]);

}());
