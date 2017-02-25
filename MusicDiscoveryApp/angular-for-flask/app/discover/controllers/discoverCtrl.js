(function(){
    'use strict';

    myApp.controller('discoverCtrl', discoverCtrl);

    discoverCtrl.$inject = ['$state', '$scope', '$http', '$stateParams', '$window'];

    function discoverCtrl($state, $scope, $http, $stateParams, $window)
    {

        $scope.playlists = [];
        $scope.name = "Discover Page";
        $scope.startToEnd = "";
        $scope.tracksData = [];

        $scope.init = function() {

            $scope.showLoading();
            $scope.getPlaylists();


        }

        $scope.getPlaylists = function() {
            $http({
                method: 'GET',
                url: "http://127.0.0.1:5001/playlists"
            }).then(function(data) {
                // console.log(JSON.stringify(data.data));
                $scope.playlists = data.data['items'];
                // console.log(JSON.stringify($scope.playlists));
                $(".loader").fadeOut();
            });
        }

        $scope.showLoading = function() {
            $(".loader").css("display", "block");
            $(".loader").fadeIn("slow");
        }


        $scope.addToPlaylist = function(event){
            var uri = event.target.id;
            var playlistUrl = document.getElementById(uri).value;
            // alert("in add to playlist " + playlistUrl);

            $scope.showLoading();
            $http({
                method: 'POST',
                url: "http://127.0.0.1:5001/add_track?url=" + playlistUrl + "&uris="+uri
            }).then(function(data) {
                console.log(JSON.stringify(data));
                // $scope.tracksData = data.data;
                // console.log(JSON.stringify($scope.tracksData));
                $(".loader").fadeOut();
            });

        }

        $scope.playSong = function(event){
            var url = event.target.id;

            $window.open(url, this.target,    'width=300,height=300,resizable,scrollbars=yes');

        }

        $scope.discoverAllArtists = function() {

            $scope.showLoading();
            $http({
                method: 'GET',
                url: "http://127.0.0.1:5001/discover_all"
            }).then(function(data) {
                console.log("finished");
                $scope.tracksData = data.data;
                console.log(JSON.stringify($scope.tracksData));
                $(".loader").fadeOut();
            });

        }


        $scope.prevPageTurn = function(){
            alert("in previous");
        }

        $scope.nextPageTurn = function() {
            alert("In next");
        }


        $(".header.navStuff").removeClass("navStuff");
        $scope.init();



    }

})();