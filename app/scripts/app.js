var app = angular.module('BlocChat', [
  'firebase',
  'ui.router',
  'ui.bootstrap'
  ])

  app.controller('HomeController', ['$scope', 'Room', function($scope, Room) {

    // get list of rooms from factory
    $scope.rooms = Room.all;

    $scope.createRoom = function() {
      // trigger modal
      $scope.open();
      Room.add();
    }
  }]);

  app.controller('ModalController', function($scope, $modal){
    console.log("Hello guys, I figured it out!");

    $scope.items = ["item1"];
    $scope.open = function() {

      var modalInstance = $modal.open({
        
        templateUrl: 'templates/new-chat.html',
        controller: 'ModalController',
        resolve: {
          items: function() {
            return $scope.items;
          }
        }
      });

      $scope.ok = function() {
        $modalInstance.close();
      };

      $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
      };
  }
  });

  app.factory('Room', ['$firebaseArray', function($firebaseArray) {
    var firebaseRef = new Firebase("https://bloc-chat1.firebaseio.com/");
    var rooms = $firebaseArray(firebaseRef);

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
