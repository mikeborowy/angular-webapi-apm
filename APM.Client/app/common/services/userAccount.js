(function () {
    "use strict";

    angular
        .module("common.services")
        .factory("userAccount", ["$resource", "appSettings", UserAccountFn]);

    function UserAccountFn($resource, appSettings) {

        return {
            registration: $resource(appSettings.serverPath + "/api/Account/Register", null,
                {
                    'registerUser': { method: 'POST' }, //custom actions
                }),
            login: $resource(appSettings.serverPath + "/Token", null,
            {
                'loginUser': {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    transformRequest: TransformRequest
                } //custom actions
            })
        }
    }

    function TransformRequest(data, headersGetter){
    
        var str = []
        for (var dataItem in data) {
            str.push(encodeURIComponent(dataItem) + "=" + encodeURIComponent(data[dataItem]))
        }
        return str.join("&");
    }

}());