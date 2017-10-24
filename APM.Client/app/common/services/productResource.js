(function () {
    "use strict";

    angular
        .module("common.services")
        .factory("productResource", ["$resource", "appSettings", "currentUser", ProductResourceFn]);

    function ProductResourceFn($resource, appSettings, currentUser) {

        return $resource(appSettings.serverPath + "/api/Products/:id", null,
            {
                //default action added here due to headers prop
                'get': {
                    headers: { 'Authorization': 'Bearer ' + currentUser.getProfile().token }
                },
                //default action added here due to headers prop
                'save': {
                    headers: { 'Authorization': 'Bearer ' + currentUser.getProfile().token }
                },
                //custom action
                'update': {
                    method: 'PUT',
                    headers: { 'Authorization': 'Bearer ' + currentUser.getProfile().token }
                }
            });
    }

}());