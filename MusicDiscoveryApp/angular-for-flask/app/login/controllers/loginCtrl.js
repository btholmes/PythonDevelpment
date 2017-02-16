(function(){
    'use strict';

    myApp.controller('loginCtrl', loginCtrl);

    loginCtrl.$inject = ['$http', '$state', 'loginService', 'ionicLoadbar'];

    function loginCtrl($http, $state, $loginService, $ionicLoadbar)
    {

        var date = new Date();
        var thisMonth = date.getMonth() + 1;
        var thisYear = date.getFullYear();
        var thisDate = date.getDate();

        var vm = this;
        vm.signIn = signIn;
        vm.signUp = signUp;
        vm.checkEmail = checkEmail;
        vm.checkpass = checkPass;
        vm.user;
        vm.pass;


        function signIn(){

            if(checkEmail(vm.user) && checkPass(vm.pass)){
                $ionicLoadbar.show();
                $loginService.checkLogin(vm.user, vm.pass)
                    .then(function(data) {
                        $ionicLoadbar.hide();
                        var users = data.data;
                        var found = 0;
                        for(var i = 0; i < users.length; i++){
                            if(users[i].email == vm.user && users[i].pass == vm.pass){
                                found = 1;
                            }
                        }
                        if(found){
                            localStorage.setItem("user", vm.user);
                            vm.user = "";
                            vm.pass = "";
                            $state.go("menu.home");
                        }else{
                            alert("Incorrect user or password");
                        }

                    });
            }

        }

        function checkPass(password){

            if(password != undefined && password.length > 0){
                return 1;
            }else{
                alert("Please enter a password");
            }
        }

        function checkEmail(email){

            if( email == undefined ){
                alert("Please enter an email");
                return 0;
            }
            else if(email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)){
                return 1;
            }
            alert("That email is not in correct form");
            return 0;
        }

        function signUp(){
            $state.go('signUp');
        }

    }

})();

