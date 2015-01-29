angular.module('starter.controllers', [])

        .controller('DashCtrl', function($scope) {
})

        .controller('ChatsCtrl', function($scope, Chats) {
    $scope.chats = Chats.all();
    //$scope.remove = function(chat) {
    //   Chats.remove(chat);
    // }
})

        .controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
})

        .controller('CardsCtrl', function($scope, $stateParams, $ionicSlideBoxDelegate, Chats) {

    $scope.chat = Chats.get($stateParams.chatId);
    //     var cardTypes = $resource('uo.json', 
//      { format: 'json', jsoncallback: 'JSON_CALLBACK' }, 
    //     { 'load': { 'method': 'JSONP' } });

    /*
     $scope.$storage = $localStorage.$default({
     c6: 1,
     });
     */

    var cardTypesU =
            [{image: 'img/pic2.png', title: 'MRÓWKA'},
                {image: 'img/pic3.png', title: 'KUJON'},
                {image: 'img/pic4.png', title: 'KUPA'},
                {image: 'img/pic3.png', title: 'KRÓL'}, ];

    var cardTypesZ =
            [{image: 'img/pic2.png', title: 'ŻOŁĄDŹ'},
                {image: 'img/pic3.png', title: 'GARAŻ'}, ];


    var cardTypesH =
            [{image: 'img/pic2.png', title: 'MOHER'},
            ];


    $scope.cards = [];
    $scope.cardscopy = [];





    if ($stateParams.chatId == 0)
        var cardTypes = cardTypesU;
    else if ($stateParams.chatId == 1)
        var cardTypes = cardTypesZ;
    else if ($stateParams.chatId == 2)
        var cardTypes = cardTypesH;


    var cardTypes2 = [];


    // $ionicSlideBoxDelegate.update();

    /*
     Cards.all().then(function (data) {
     //var cardTypes2 = data;
     
     var jsonData = data;
     var jsonKeys = Object.keys(jsonData);
     
     for (var i = 0; i < jsonKeys.length; i++) {
     var jsonSingle = jsonData[jsonKeys[i]];
     cardTypes2.push(jsonSingle);
     }
     
     
     })
     */

    $scope.addCard = function(i) {

        //$scope.points = 0;

        var newCard = cardTypes[Math.floor(Math.random() * cardTypes.length)];

        newCard.id = Math.random();


        var str = newCard.title;

        newCard.origtitle = newCard.title;


        if ($stateParams.chatId == 0) {
            if (str.indexOf("Ó") >= 0)
                newCard.title = str.replace("Ó", "_");
            else
                newCard.title = str.replace("U", "_");

            var str2 = newCard.title;
            newCard.word1 = str2.replace("_", "Ó");
            newCard.word2 = str2.replace("_", "U");
        }
        else if ($stateParams.chatId == 1) {
            if (str.indexOf("RZ") >= 0)
                newCard.title = str.replace("RZ", "_");
            else
                newCard.title = str.replace("Ż", "_");
            var str2 = newCard.title;
            newCard.word1 = str2.replace("_", "RZ");
            newCard.word2 = str2.replace("_", "Ż");
        }
        else if ($stateParams.chatId == 2) {
            if (str.indexOf("CH") >= 0)
                newCard.title = str.replace("CH", "_");
            else
                newCard.title = str.replace("H", "_");
            var str2 = newCard.title;
            newCard.word1 = str2.replace("_", "CH");
            newCard.word2 = str2.replace("_", "H");
        }

        $scope.cards.push(angular.extend({}, newCard));

    }
    //$scope.cardscopy=$scope.cards;

    for (var i = 0; i < (cardTypes.length); i++)
        $scope.addCard();


    $scope.refreshCards = function() {
        setTimeout(function() {
            $scope.$apply(function() {
                window.location.reload(true);
            });
        }, 1);
    }

    $scope.endGame = function() {
        setTimeout(function() {
            $scope.$apply(function() {
                window.location = "#tab/chats";
            });
        }, 1);
    }

    $scope.cardSwipedLeft = function(index) {

      //  var word = $scope.cards[index].title;

     //   if ($scope.cards[index].origtitle == word.replace("_", "Ó"))
     //       $scope.points++;
//if ( $scope.cards[index].origtitle == word.replace("_", "Ó") )
       //      $scope.points++;
         
         console.log('Left swipe: ');
          return true;
    }

    $scope.cardSwipedRight = function(index) {

      //  var word = $scope.cards[index].title;

       // if ($scope.cards[index].origtitle == word.replace("_", "U"))
        //    $scope.points++;

        console.log('Right swipe: ');
          return true;
    }

    $scope.cardDestroyed = function(index) {

         var word = $scope.cards[index].title;
         
        if ($scope.cardSwipedLeft() && $scope.cards[index].origtitle == word.replace("_", "Ó") )
             $scope.points++;
            
        
        if ($scope.cardSwipedRight() && $scope.cards[index].origtitle == word.replace("_", "U"))
             $scope.points++;
            console.log("Card removed:  p:" + word.replace("_", "Ó")+$scope.points+$scope.cards[index].origtitle);


        $scope.cards.splice(index, 1);
        //$ionicSlideBoxDelegate.update();
        //    $scope.cards[index][leftCards]=$scope.cards[index][leftCards]-1;

    }



    $scope.cardPartialSwipe = function(index) {

        console.log('Card partial  swipe');
    }

})


        .controller('FriendsCtrl', function($scope, Friends) {
    $scope.friends = Friends.all();
})

        .controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
    $scope.friend = Friends.get($stateParams.friendId);
})

        .controller('AccountCtrl', function($scope) {
    $scope.settings = {
        sound: false,
        vibe: false
    };
});
