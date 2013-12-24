storeApp.controller ('MasterController', function MasterController ($scope) {

    var addToCartMethod;

    $scope.addToCart = function(item) {
        addToCartMethod(item);
    };

    this.setAddToCartMethod = function (method) {
        addToCartMethod = method;
    };

    this.cartSiblingElement;
    this.setCartSiblingElement = function (element) {
        this.cartSiblingElement = element;
    };
});

