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
            var playlistName = event.target.name;

            $scope.showLoading();
            $http({
                method: 'GET',
                url: "http://127.0.0.1:5001/tracks?url=" + tracksUrl
            }).then(function(data) {
                // console.log(JSON.stringify(data.data));

                // $scope.playlists = data.data['items'];
                $(".loader").fadeOut();
                $state.go("tracks", {thisUrl : tracksUrl  , urlParam: JSON.stringify(data.data), name: playlistName});
            });
        }

        $scope.addPlaylist = function() {
            var name = $("#playlistName").val();
            var userHref = localStorage.getItem("userHref");

            $scope.showLoading();
            $http({
                method: 'POST',
                url: "http://127.0.0.1:5001/add_playlist?name=" + name + "&href=" + userHref + "&public=True" + "&collaborative=True"
            }).then(function(data) {
                console.log(JSON.stringify(data));


                $(".loader").fadeOut();
            });

        }

        $scope.deletePlaylist = function() {
            alert("in delete");
        }


        $(".header.navStuff").removeClass("navStuff");
        $scope.init();

    }

})();