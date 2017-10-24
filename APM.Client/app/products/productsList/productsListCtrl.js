(function () {
    'use strict';

    angular
        .module("productManagement")
        .controller("productsListCtrl", ["productResource", ProductsListCtrlFn]);

    //productResourceSrvc name of factory service module
    function ProductsListCtrlFn(productResource) {

        var vm = this;
        //vm.products = productResource.query();

        //productResource.get({ id: 5 }, OnGetSuccess, OnGetError);
        //productResource.get({ id: 5 }, function (data) {
        //    vm.products = data;
        //});

        productResource.query(function (data) {
            vm.products = data;
        });

        // { param:"test" } => /api/products?param=test
        //vm.searchCriteria = "GDN";
        //productResource.query({ search: vm.searchCriteria }, function (data) {
        //    vm.products = data;
        //});

        //    productResourceSrvc.query({ $filter: "contains(ProductCode, 'GDN')"}, function (data) {
        //        vm.products = data;
        //    });

    }
}());