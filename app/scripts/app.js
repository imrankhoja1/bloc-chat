var app = angular.module('BlocChat', [
  'firebase',
  'ui.router',
  'ui.bootstrap'
  ])

  app.controller('HomeController', ['$scope', 'Room', function($scope, Room) {

    // get list of rooms from factory
    $scope.rooms = Room.all;

  }]);

// create two of these to allow for username.
app.controller('ModalCtrl', ['$scope', '$modal', '$log', 'Room', function($scope, $modal, $log, Room) {


    $scope.open = function (size) {

        var modalInstance = $modal.open({
            templateUrl: '/templates/new-chat.html',
            controller: 'ModalInstanceCtrl',
            size: size
        });

        modalInstance.result.then(function (roomName) { 
          Room.add(roomName);
        }, function () {
          $log.info('Modal dismissed at: ' + new Date());
        });
    };
}]);

app.controller('ModalInstanceCtrl', ['$scope', '$modalInstance', 'Room', function($scope, $modalInstance, Room) {

    $scope.ok = function (roomName) {
      $modalInstance.close(roomName);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss();
    };
}]);

  app.factory('Room', ['$firebaseArray', function($firebaseArray) {
    var firebaseRef = new Firebase("https://bloc-chat1.firebaseio.com/");
    var rooms = $firebaseArray(firebaseRef);

    return {
      all: rooms,

      add: function(roomName) {
        // create a new chatroom
        debugger;
        rooms.$add({ displayName: roomName }).then(function(firebaseRef) {
        var id = firebaseRef.key();
        console.log("Added record with id " + id);
        });
      },
      messages: function(roomId) {
        return rooms.orderByChild(roomId);
      }
    }
  }])
