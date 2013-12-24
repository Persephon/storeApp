storeApp .directive('cart', function () {
    return {
        require: "^ngController",
        restrict: "A",
        template: '<div class="cart-template" ng-include src="\'cart-template\'"></div>',
        scope: {},
        link: function (scope, element, attr, controller) {
            scope.cartShown = false;
            scope.cartItems = [];
            scope.cartTotal = 0;

            scope.toggleCart = function () {
                scope.cartShown = scope.cartShown ? false: true;

                if (scope.cartShown) {
                    showCart();
                } else {
                    hideCart();
                }
            };

            scope.removeFromCart = function (item) {
                _.remove(scope.cartItems, function (i){
                    return i.asin == item.asin;
                });

                updateCartTotal();
            };

            var showCart = function (){
                element.addClass("open")
                controller.cartSiblingElement.addClass ("cart-open");
            };

            var hideCart = function (){
                element.removeClass("open")
                controller.cartSiblingElement.removeClass ("cart-open");
            };

            var updateCartTotal = function () {
                scope.cartTotal = 0;
                _.forEach(scope.cartItems, function (item) {
                    if (item.price) {
                        scope.cartTotal += item.price;
                    }
                });
            };

            var addToCart = function (item) {
                if (!_.contains(_.pluck(scope.cartItems, 'asin'), item.asin)) {
                    scope.cartItems.push(item);

                    updateCartTotal();
                }
            };
            controller.setAddToCartMethod(addToCart);
        }
    };
})
