(function(){
    'use strict';

    myApp.controller('playlistsCtrl', playlistsCtrl);

    playlistsCtrl.$inject = ['$state', '$scope', '$http'];

    function playlistsCtrl($state, $scope, $http)
    {
        $scope.playlists = [];

        $scope.showLoading = function() {
            $(".loader").css("display", "block");
            $(".loader").fadeIn("slow");
        }

        $scope.init = function(){

            $scope.showLoading();
            $http({
                method: 'GET',
                url: "http://127.0.0.1:5001/playlists"
            }).then(function(data) {
                // console.log(JSON.stringify(data.data));

                $scope.playlists = data.data['items'];
                $(".loader").fadeOut();
            });
        }

        $scope.goToPlaylist = function(event) {
            var tracksUrl = event.target.id;

            $scope.showLoading();
            $http({
                method: 'GET',
                url: "http://127.0.0.1:5001/tracks?url=" + tracksUrl
            }).then(function(data) {
                // console.log(JSON.stringify(data.data));

                // $scope.playlists = data.data['items'];
                $(".loader").fadeOut();
                $state.go("tracks", {urlParam: JSON.stringify(data.data), name: $scope.playlists[0]['name']});
            });
        }


        $(".header.navStuff").removeClass("navStuff");
        $scope.init();

    }

})();