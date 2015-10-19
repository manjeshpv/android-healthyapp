(function() {
  'use strict';
  angular.module('starter').config(function($stateProvider) {
    console.log('Products routing')
    $stateProvider

      .state('app.products', {
        url: '/products/:cateid',
        views: {
          'menuContent': {
            templateUrl: 'app/views/products/products.html',
            controller: 'ProductsCtrl'
          }
        }
      });

  });



  'use strict';

  angular.module('starter').controller('ProductsCtrl', function($scope, $rootScope, $location,$state, $stateParams,$http, LS ) {
    console.log('Products controller')

    $scope.products = [];
    $scope.product = null;

    var cart =LS.getObject("cart");
    //for(var i = 0; i < cart.length; i++) {
    //  if(cart[i] == objectValue) {
    //    cart.splice(i, 1); localStorage[key]= JSON.stringify(data);
    //    break;
    //  }
    //}
    //var cartItemIDList = []
    //cart.forEach(function(item){
    //  cartItemIDList.push()
    //})
    $scope.increaseProductCount = function(item) {
      item.quantity++;
    };
    $scope.decreaseProductCount = function(item) {
      if (item.quantity > 0) {
        item.quantity--;
      }

    };
    $scope.sumCalc = function() {
      var sum = 0;
      angular.forEach($scope.itemList, function(item, index) {
        sum += parseInt(item.quantity,10);
      });
      return sum;
    };
    $rootScope.cartFlag = 0
    $rootScope.checkAnythingInCart = function(){
      var sum = 0, total = 0;
      angular.forEach($scope.products, function(item, index) {
        total += parseInt(item.quantity,10) * parseInt(item.price,10)
        sum += parseInt(item.quantity,10);
      });
      console.log("sum",sum)
      $rootScope.cartFlag = sum
      return sum
    }

    $rootScope.checkOut = function(){
      //#/app/cart-items
      var cart = []
      angular.forEach($scope.products, function(item, index) {
        if(item.quantity > 0){
          LS.push("cart",item);
        }
      });
      $state.transitionTo('app.cart-items', null, {reload: true, notify:true});


    }
    $rootScope.getCartValue = function(){
      var newPriceTotal = 0, total = 0;
      angular.forEach($scope.products, function(item, index) {
        newPriceTotal += parseInt(item.quantity,10) * parseInt(item.newprice,10)
        total += parseInt(item.quantity,10) * parseInt(item.price,10)

      });
      console.log("total",total, newPriceTotal)
      return newPriceTotal? ("Rs."+newPriceTotal+" (You save "+(total-newPriceTotal)+")") : ""
    }

    $http.get("http://android.par-ken.com/healthyalsi/getProducts.php?catid="+$stateParams.cateid)
      .success(function(response) {
        if(response){
          response.forEach(function(item, index){
            console.log(index,item)
            item.quantity = 0
            return item
          })
        }
        console.log(response)
        $scope.products = response;
      });
    $scope.addproduct=function(id){
      alert("product Added : "+id);
    }
  });

}).call(this);
