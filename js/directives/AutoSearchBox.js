storeApp .directive('autoSearchBox', function (ASWECommerceRepository, $timeout) {
    return {
        restrict: 'A',
        replace: true,
        scope: {
            refreshResults: '&',
            hideLoader: '&',
            showLoader: '&'
        },
        template: '<input type="text" ng-model="searchParam" placeholder="search" class="form-control" />',
        link: function (scope, element) {
            var refreshResults = function (){
                scope.showLoader()

                ASWECommerceRepository.itemSearch(scope.searchParam).then (function (itemList) {
                    scope.hideLoader();
                    scope.refreshResults({items: itemList});
                });
            };

            scope.searchParam = "Movies";

            refreshResults();

            var currentSearch;
            element.on('keyup', function () {
                if (currentSearch) {
                    $timeout.cancel(currentSearch);
                }

                currentSearch = $timeout(function () {
                    refreshResults();
                }, 700);
            });
        }
    };
});