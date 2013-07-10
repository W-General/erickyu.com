	'use strict';


// Declare app level module which depends on filters, and services
angular.module('blog', ['blog.controllers']).
  config(function ($routeProvider, $locationProvider) {
    $routeProvider.
    	when('/empty', {templateUrl: 'partials/empty', controller: 'EmptyCtrl'}).
    	when('/add', {templateUrl: 'partials/add', controller: 'AddCtrl'}).
    	otherwise({redirectTo: '/empty'});

    $locationProvider.html5Mode(true);
  });
