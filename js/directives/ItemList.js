storeApp.directive('itemList', function ($timeout) {
    return {
        require: "^ngController",
        restrict: "A",
        templateUrl: "templates/itemList.html",
        link: function (scope, element, attr, controller) {
            scope.itemList = [];
            scope.loaderShown = true;

            var detailsContainers = document.getElementsByClassName("details-container");
            var itemContainers = document.getElementsByClassName("item-container");

            scope.showLoader = function () {
                scope.loaderShown = true;
                scope.itemList = [];
            };

            scope.hideLoader = function () {
                scope.loaderShown = false;
            };

            scope.refreshItems = function (items) {
                _.forEach(items, function (item, i) {
                    item.showShowMoreLink = false;
                    item.detailsWidth = 370 - item.imageWidth;
                });

                scope.itemList = items;
            };

            scope.$watch('itemList', function (itemList) {
                $timeout(function (){

                    _.forEach(itemList, function (item, i) {
                        if(detailsContainers[i].scrollHeight > 160) {
                            item.showShowMoreLink = true;
                        }
                    });
                });
            });

            scope.showMore = function (index) {
                scope.itemList[index].showShowMoreLink = false;
                itemContainers[index].className += " expanded";
                console.log(index)
            };

            controller.setCartSiblingElement(element);
        }
    };
});