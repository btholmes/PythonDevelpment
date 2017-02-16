(function(){
    'use strict';

    myApp.service("signUpService", signUpService);

    signUpService.$inject = ['$http','CONSTANTS'];

    function signUpService($http, CONSTANTS) {

        var sv = this;
        sv.adduser = addUser;


        function addUser(user, password) {
            //alert("in add service");
            return $http({
                method: 'POST',
                url: CONSTANTS.add_user_url,
                data: {
                    'email' : user,
                    'pass'  : password
                }
            });
        }


    }
})();