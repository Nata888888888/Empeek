var app = angular.module('myApp',["ngRoute"]);
app.config(function($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "template/home.html",
        })
        .when("/new", {
            templateUrl: "template/new-item.html"  
        })
        .when("/comments", {
            templateUrl: "template/comments.html"
//        })
//       .when("/basket", {
//            templateUrl: "basket.html",
//            controller: "flowerController"
        });
});