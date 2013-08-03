'use strict';

/* Controllers */


angular.module('blog.controllers', []).
  controller('IndexCtrl', function ($scope, $http, $location) {
  	$http.get('/db/posts').
  		success(function(data, status, headers, config) {
        $scope.posts = data.posts;
        if(data.posts.length===0) {
          $location.path('/empty');
        }
  		});
  }).
  controller('EmptyCtrl', function ($scope) {
    // write Ctrl here

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
    $http.get('/db/post/' + $routeParams.title).success(function(data) {
      $scope.form = data.post;
    });

    $scope.edit = function () {
      $http.put('/db/post/' + $routeParams.title, $scope.form).
        success(function(data) {
          $location.path('/');
        });
    }
  }).
  controller('DeleteCtrl', function ($scope, $http, $routeParams, $location) {
    $scope.delete = function () {
      $http.delete('/db/post/' + $routeParams.title).
        success(function(data) {
          $location.path('/');
        });
    }

    $scope.noDelete = function () {
      $location.path('/');
    }
  });