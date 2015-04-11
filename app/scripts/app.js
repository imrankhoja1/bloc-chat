var app = angular.module('BlocChat', [
  'firebase',
  'ui.router'
  ])

  app.controller('HomeController', ['$scope', 'Room', function($scope, Room) {
    console.log("Hello guys, I figured it out!");

    // get list of rooms from factory
    $scope.rooms = Room.all;

    $scope.createRoom = function() {
      // trigger modal
      Room.add();
    }
  }]);
/*
  app.service('Room', function($rootScope, $firebaseArray) {
    var ref = new Firebase("https://bloc-chat1.firebaseio.com/");
  })
*/

  app.factory('Room', ['$firebaseArray', function($firebaseArray) {
    var firebaseRef = new Firebase("https://bloc-chat1.firebaseio.com/");
    var rooms = $firebaseArray(firebaseRef);

    // // create a new chatroom
    // rooms.$add({ foo: "bar" }).then(function(firebaseRef) {
    //   var id = firebaseRef.key();
    //   console.log("Added record with id " + id);
    //   rooms.$indexFor(id);
    // });

    return {
      all: rooms,

      add: function(roomName) {
        // create a new chatroom
        rooms.$add({ foo: "bar" }).then(function(firebaseRef) {
        var id = firebaseRef.key();
        console.log("Added record with id " + id);
        });
      }
    }
  }])
