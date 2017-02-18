(function(){
    'use strict';

    myApp.controller('tracksCtrl', tracksCtrl);

    tracksCtrl.$inject = ['$state', '$scope', '$http', '$stateParams'];

    function tracksCtrl($state, $scope, $http, $stateParams)
    {
        // Passes the json data as urlParam string
        $scope.tracksData = [];
        $scope.name = $stateParams.name;

        $scope.showLoading = function() {
            $(".loader").css("display", "block");
            $(".loader").fadeIn("slow");
        }

        $scope.init = function() {
            var data = JSON.parse($stateParams.urlParam);
            $scope.tracksData = data['items'];
            console.log(JSON.stringify($scope.tracksData));
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



        $scope.pageTurn = function() {

            alert("in page turn");
        }

        $scope.deleteTrack = function(event, index) {

            // This is the url of the playlist to delete from
            var urlValue = $stateParams.thisUrl;


            $scope.showLoading();

            $http({
                method: 'POST',
                url: "http://127.0.0.1:5001/delete_track?url=" + urlValue + "&uri=" + event.target.id + "&pos=" + index
            }).then(function(data) {
                console.log(JSON.stringify(data.data));
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