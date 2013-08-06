	'use strict';


// Declare app level module which depends on filters, and services
angular.module('blog', ['blog.controllers', 'blog.filters']).
  config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.
    	when('/', {templateUrl: 'partials/index', controller: 'IndexCtrl'}).
      when('/login', {templateUrl: 'partials/login', controller: 'LoginCtrl'}).
      when('/signup', {templateUrl: 'partials/signup', controller: 'SignupCtrl'}).
    	when('/empty', {templateUrl: 'partials/empty', controller: 'EmptyCtrl'}).
    	when('/add', {templateUrl: 'partials/add', controller: 'AddCtrl'}).
    	when('/edit/:id', {templateUrl: 'partials/edit', controller: 'EditCtrl'}).
      when('/delete/:id', {templateUrl: 'partials/delete', controller: 'DeleteCtrl'}).
    	otherwise({redirectTo: '/'});
    $locationProvider.html5Mode(true);
  }]);