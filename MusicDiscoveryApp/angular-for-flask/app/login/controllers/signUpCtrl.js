(function(){
    'use strict';

    myApp.controller('signUpCtrl', signUpCtrl);

    signUpCtrl.$inject = ['$state', '$http', 'signUpService'];

    function signUpCtrl($state, $http, $signUpService)
    {

        var vm = this;
        vm.signUp = signUp;
        vm.user = user;
        vm.signIn = signIn;

        vm.userName;
        vm.userPass;
        vm.checkPass;


        function signUp(){

            if(user(vm.userName) && checkPasswords(vm.userPass, vm.checkPass)){
                $signUpService.adduser(vm.userName, vm.userPass)
                    .then(function(data){
                        if(data.data == "That user already exists"){
                            alert("That user already exists");
                        }else{
                            vm.userName = "";
                            vm.userPass = "";
                            vm.checkPass = "";
                            $state.go('login');
                        }
                    });
            }

        }

        function user(email){

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

        function checkPasswords(pass, confirmPass){

            if(pass == undefined || confirmPass == undefined){
                alert("Make sure to enter a pass and confirm pass");
                return 0;
            }
            else if((pass != confirmPass) || pass.length == 0 || confirmPass.length == 0){
                alert("Those passwords don't match");
                return 0;
            }
            return 1;
        }

        function signIn(){
            $state.go('login');
        }


    }

})();