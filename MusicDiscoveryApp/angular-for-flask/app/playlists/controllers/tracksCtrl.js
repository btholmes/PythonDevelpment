(function(){
    'use strict';

    myApp.controller('tracksCtrl', tracksCtrl);

    tracksCtrl.$inject = ['$state', '$scope', '$http', '$stateParams'];

    function tracksCtrl($state, $scope, $http, $stateParams)
    {
        // Passes the json data as urlParam string
        $scope.tracksData = [];
        $scope.index = 0;
        $scope.name = $stateParams.name;
        $scope.trackUrl = undefined;
        $scope.trackTotal = 0;
        $scope.startToEnd = "1 to 50";
        $scope.playlistImage = "";

        $scope.showLoading = function() {
            $(".loader").css("display", "block");
            $(".loader").fadeIn("slow");
        }

        $scope.init = function() {
            var data = JSON.parse($stateParams.urlParam);
            if($scope.trackUrl == undefined){
                $scope.playlistImage = $stateParams.imgUrl;
                $scope.trackUrl = $stateParams.thisUrl;
                $scope.trackTotal = data['total'];
                if($scope.trackTotal <= 50){
                    $scope.startToEnd = "1 to " + $scope.trackTotal;
                }
            }
            $scope.tracksData = data['items'];
            // $scope.playlistImage = data['items'][0]['track']['album']['images'][0]['url'];
            // console.log(JSON.stringify($scope.tracksData));
        }

        // var list = {"you": 100, "me": 75, "foo": 116, "bar": 15};
        // keysSorted = Object.keys(list).sort(function(a,b){return list[a]-list[b]})


        // $scope.sortByArtist = function(a, b) {
        //     return a-b;
        // }
        //
        // $scope.sortBySong = function() {
        //     alert("new sort song");
        //    Object.keys($scope.tracksData).sort(function(a,b){
        //        return $scope.tracksData[a]['track']['name'] - $scope.tracksData[b]['track']['name'];
        //    });
        // }


        $scope.prevPageTurn = function() {

            $scope.index -= 50;
            if($scope.index < 0){
                $scope.index = 0;
                if($scope.trackTotal <= 50){
                    $scope.startToEnd = "1 to " + $scope.trackTotal;
                }else{
                    $scope.startToEnd = ($scope.index+1) + " to 50";
                }
                return;
            }
            $scope.getTracks($scope.index);


        }

        $scope.nextPageTurn = function() {

            if(($scope.index + 50) < $scope.trackTotal ){
                $scope.index += 50;
                $scope.getTracks($scope.index);
            }

        }
        $scope.getTracks = function(offset){
            $scope.showLoading();
            $http({
                method: 'GET',
                url: "http://127.0.0.1:5001/tracks?url=" + $scope.trackUrl + "?offset=" + $scope.index
            }).then(function(data) {
                var data = data.data;
                $scope.tracksData = data['items'];
                if(($scope.index + 50) >= $scope.trackTotal){
                    $scope.startToEnd = $scope.index + " until end ..";
                }else{
                    $scope.startToEnd = ($scope.index + 1) + " to "+ ($scope.index + 50);
                }
                // $scope.playlists = data.data['items'];
                $(".loader").fadeOut();
            });
        }

        $scope.deleteTrack = function(event, index) {

            // This is the url of the playlist to delete from
            var urlValue = $stateParams.thisUrl;


            $scope.showLoading();

            $http({
                method: 'POST',
                url: "http://127.0.0.1:5001/delete_track?url=" + urlValue + "&uri=" + event.target.id + "&pos=" + index
            }).then(function(data) {
                // console.log(JSON.stringify(data.data));
                $(".loader").fadeOut();
                data = JSON.stringify(data.data);
                data = data.split('"');
                if(data[1] == "error"){
                    alert("Can't delete songs from playlist you don't own");
                }else{
                    $scope.tracksData.splice(index, 1);
                }
            });

        }

        $scope.init();

    }

})();