(function () {
    "use strict";

    angular
        .module("productManagement")
        .controller("mainCtrl", ["userAccount", "currentUser", MainCtrlFn]);

    function MainCtrlFn(userAccount, currentUser) {

        var vm = this;
        vm.message = '';
        vm.userData = {
            userName: '',
            email: '',
            password: '',
            confirmPassword: ''
        };

        vm.isLoggedIn = function () {
            return currentUser.getProfile().isLoggedIn;
        };

        vm.OnLoginClick = function () {

            vm.userData.grant_type = "password";
            vm.userData.userName = vm.userData.email;

            userAccount.login.loginUser(vm.userData, OnloginSuccess, OnLoginError);
        };

        vm.OnRegisterClick = function () {

            vm.userData.confirmPassword = vm.userData.password;

            userAccount.registration.registerUser(vm.userData, OnRegisterSuccess, OnRegisterError);
        };

        /*LOGIN START*/
        function OnloginSuccess(data) {
            vm.message = "";
            vm.password = "";
            vm.token = currentUser.setProfile(data.userName, data.access_token);
        }

        function OnLoginError(response) {
            vm.password = "";
            vm.message = response.statusText + "\r\n";

            if (response.data.exceptionMessage)
                vm.message += response.data.exceptionMessage;

            if (response.data.modelState) {
                for (var key in response.data.modelState) {
                    vm.message += response.data.modelState[key] + "\r\n";
                }
            }
        }
        /*LOGIN END*/

        /* REGISTRATION START*/

        function OnRegisterSuccess(data) {

            vm.confirmPassword = "";
            vm.message = "...Registration Successful";
            vm.OnLoginClick();
        }

        function OnRegisterError(response) {

            vm.isLoggedIn = false;
            vm.message = response.statusText + "\r\n";

            if (response.data.exceptionMessage)
                vm.message += response.data.exceptionMessage;

            if (response.data.modelState) {
                for (var key in response.data.modelState) {
                    vm.message += response.data.modelState[key] + "\r\n";
                }
            }
        }
        /* REGISTRATION END*/

    }
}());
