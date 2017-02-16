(function(){
    'use strict';

        myApp.service("loginService", loginService);

    loginService.$inject = ['$http','CONSTANTS'];

    function loginService($http, CONSTANTS) {

        var sv = this;
        sv.checkLogin = checkLogin;


        function checkLogin(username, password) {
            return $http({
                method: 'POST',
                url: CONSTANTS.check_login_url,
                data: {
                    'email' : username,
                    'pass'  : password
                }
            });
        }


    }
})(); 