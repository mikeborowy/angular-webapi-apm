(function () {
    "use strict";

    angular
        .module("productManagement")
        .factory("currentUser", CurrentUserFn);

    function CurrentUserFn() {

        var profile = {
            isLoggedIn: false,
            userName: "",
            token: ""
        };

        function setProfile(userName, token) {
            profile.isLoggedIn = true;
            profile.userName = userName;
            profile.token = token;
        }

        function getProfile() {
            return profile;
        }


        return {
            setProfile: setProfile,
            getProfile: getProfile
        }
    }


})();