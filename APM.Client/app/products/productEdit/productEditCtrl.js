(function () {
    "use strict";

    angular
        .module("productManagement")
        .controller("productEditCtrl", ProductEditCtrlFn);

    function ProductEditCtrlFn(productResource) {

        var vm = this;
        vm.product = {};
        vm.message = '';

        //HTTP GET "class" actions: Resource.action([parameters], [success], [error])
        productResource.get({ id: 5 }, OnGetSuccess, OnGetError);

        if (vm.product && vm.product.productId) {
            vm.title = "Edit: " + vm.product.productName;
        }
        else {
            vm.title = "New Product";
        }

        vm.submit = function () {

            vm.message = '';

            //if product has id then it is update
            if (vm.product.productId) {
                //we call custom upadte method passing id of product as parameter
                //and pass product data as the body of requests
                //instance.$action([parameters], [success], [error])
                vm.product.$update({ id: vm.product.productId }, OnUpdateSuccess, OnUpdateError);
            }
                //else we create a new product
            else {
                //we call save action
                //instance.$action([parameters], [success], [error])
                vm.product.$save(OnSaveSuccess, OnSaveError);
            }
        };

        vm.cancel = function(editForm) {
            editForm.$setPristine();
            vm.product = angular.copy(vm.originalProduct);
            vm.message = "";
        };

        /* GET METHODS START */
        function OnGetSuccess(data) {

            vm.product = data;
            vm.originalProduct = angular.copy(data)
        }

        function OnGetError(response) {

            vm.message = response.statusText + "\r\n";
            if (response.data.exceptionMessage)
                vm.message += response.data.exceptionMessage;
        }
        /* GET METHODS END */

        /* UPDATE METHODS START */
        function OnUpdateSuccess(data) {
            vm.message = "... Save Complete";
        }

        function OnUpdateError(response) {

            vm.message = response.statusText + "\r\n";

            if (response.data.modelState) {
                for (var key in response.data.modelState) {
                    vm.message += response.data.modelState[key] + "\r\n";
                }
            }
            if (response.data.exceptionMessage)
                vm.message += response.data.exceptionMessage;
        }
        /* UPDATE METHODS END */

        /* SAVE METHODS START */
        function OnSaveSuccess(data) {

            vm.originalProduct = angular.copy(data);
            vm.message = "... Save Complete";
        }

        function OnSaveError(response) {

            vm.message = response.statusText + "\r\n";
            if (response.data.modelState) {
                for (var key in response.data.modelState) {
                    vm.message += response.data.modelState[key] + "\r\n";
                }
            }
            if (response.data.exceptionMessage)
                vm.message += response.data.exceptionMessage;
        }
        /* SAVE METHODS END */

    }
}());
