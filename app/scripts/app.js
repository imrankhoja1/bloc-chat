var app = angular.module('BlocChat', [
  'firebase',
  'ui.router'
  ])

  app.controller('HomeController', ['$scope', function($scope) {
    console.log("Hello fuckers, I figured it out!");
  }]);