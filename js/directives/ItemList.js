storeApp.directive('itemList', function () {
    return {
        require: "^ngController",
        restrict: "A",
        template: '<div ng-include src="\'item-list-template\'"></div>',
        link: function (scope, element, attr, controller) {
            scope.itemList = [];
            scope.loaderShown = true;

            scope.showLoader = function () {
                scope.loaderShown = true;
                scope.itemList = [];
            };

            scope.hideLoader = function () {
                scope.loaderShown = false;
            };

            scope.refreshItems = function (items) {
                scope.itemList = items;
            };

            controller.setCartSiblingElement(element);
        }
    };
});