'use strict';

/* Controllers */


angular.module('blog.controllers', []).
  controller('IndexCtrl', function ($scope, $http, $location, $window) {
  	$http.get('/db/posts').
  		success(function(data, status, headers, config) {
        $scope.posts = data.posts;
        if(data.posts.length===0) {
          $location.path('/blog/empty');
        }
  	});
    $scope.logout = function () {
      $http.get('/logout').success(function(){
        $window.location.href ='/';
      });
    };
  }).
  controller('LoginCtrl', function ($scope, $http, $routeParams, $location, $window) {
    $scope.form = {};
    $scope.login = function () { 
      $http.post('/db/user/' + $routeParams.username, $scope.form).
        success(function(data) {
          $window.location.href ='/';
      });
    };
  }).
  controller('SignupCtrl', function ($scope, $http, $location) {
    $scope.form = {};
    $scope.signup = function () {
      $http.post('/db/user', $scope.form).
        success(function(data) {
          $location.path('/');
      });
    };
  }).
  controller('EmptyCtrl', function ($scope, $window, $http) {
    $scope.logout = function () {
      $http.get('/logout').success(function(){
        $window.location.href ='/';
      });
    };
  }).
  controller('AddCtrl', function ($scope, $http, $location) {
    $scope.form = {};
    $scope.submitPost = function () {
      $http.post('/db/post', $scope.form).
        success(function(data) {
          $location.path('/');
      });
    };
  }).

  controller('EditCtrl', function ($scope, $http, $routeParams, $location) {
    $scope.form = {};
    $http.get('/db/post/' + $routeParams.year + '/' + $routeParams.month + '/' + $routeParams.day + '/' + $routeParams.title).success(function(data) {
      $scope.form = data.post;
    });

    $scope.edit = function () {
      $http.put('/db/post/' + $routeParams.year + '/' + $routeParams.month + '/' + $routeParams.day + '/' + $routeParams.title, $scope.form).
        success(function(data) {
          $location.path('/');
        });
    }
  }).
  controller('DeleteCtrl', function ($scope, $http, $routeParams, $location) {
    $scope.delete = function () {
      $http.delete('/db/post/' + $routeParams.year + '/' + $routeParams.month + '/' + $routeParams.day + '/' + $routeParams.title).
        success(function(data) {
          $location.path('/');
        });
    }

    $scope.noDelete = function () {
      $location.path('/');
    }
  });