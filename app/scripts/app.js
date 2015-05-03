var app = angular.module('BlocChat', [
  'firebase',
  'ui.router',
  'ui.bootstrap'
  //'ngCookies'
  ])
  
  //TODO modal
  // app.run(['$cookies', '$modal', function($cookies, $modal) {
  //   if (!cookies.blocChatCurrentUser || $cookies.blocChatCurrentUser === '' ) {

  //   }
  // }])

  app.controller('HomeController', ['$scope', 'Room', function($scope, Room) {

    var currentRoom = null;
    // get list of rooms from factory
    $scope.rooms = Room.all;

    $scope.selectRoom = function(roomId) {
      currentRoom = Room.getRoomById(roomId);
      Room.parseMessages(currentRoom, function (messages) {
        // attach messages to a scope variable so they can be accessed in view
        $scope.displayMessages = messages.val();
      });
    }

    $scope.sendMsg = function(msg) {
      Room.sendMsg(currentRoom, msg);
    }
  }]);

// first modal for NewRoom.
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

// second modal for Username.
app.controller('UserCtrl', ['$scope', '$modal', '$log', 'Room', function($scope, $modal, $log, Room) {


    $scope.setUsername = function (size) {

        var modalInstance = $modal.open({
            templateUrl: '/templates/set-username.html',
            controller: 'UserInstanceCtrl',
            size: size
        });

        modalInstance.result.then(function (username) { 
          Room.setUsername(username);
        }, function () {
          $log.info('Modal dismissed at: ' + new Date());
        });
    };
}]);

app.controller('UserInstanceCtrl', ['$scope', '$modalInstance', function($scope, $modalInstance) {

    $scope.ok = function (username) {
      $modalInstance.close(username);
    };
}]);

  app.service('Room', ['$firebaseArray', function($firebaseArray) {
    var firebaseRef = new Firebase("https://bloc-chat1.firebaseio.com/");
    var rooms = $firebaseArray(firebaseRef);
    var currentRoom = undefined;
    var user = null;

    return {
      all: rooms,
      currentRoom: currentRoom,

      add: function(roomName) {
        // create a new chatroom
        debugger;
        rooms.$add({ displayName: roomName }).then(function(firebaseRef) {
        var id = firebaseRef.key();
        console.log("Added record with id " + id);
        // seems like you'd ideally want a prompt here to capture the username
        });
      },
      getRoomById: function(roomId) {
        console.log("https://bloc-chat1.firebaseio.com/" + roomId);
        return new Firebase("https://bloc-chat1.firebaseio.com/" + roomId);
      },
      setUsername: function(username) {
        user = username;
        console.log(user);
      },
      parseMessages: function(room, callback) {
        room.child("messages").on("value", callback);
      },
      sendMsg: function(currentRoom, msg) {
        console.log(currentRoom);
        var messageListRef = new Firebase(currentRoom + "/messages");
        var newMessageRef = messageListRef.push();
        var timestamp = new Date();
        // update this with the correct timestamp code
        newMessageRef.set({'content': msg, 'sentAt': timestamp, 'username': user});
      }
    }
  }])
