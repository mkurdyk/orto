angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope,$http, localStorageService, $ionicSwipeCardDelegate) {
     $scope.$watch(function(){
            return localStorageService.getItem("points");
        }, function(newStyle, oldStyle){
            console.log(newStyle);
            $scope.points = newStyle;
        }, true)
        
    $scope.loadGame = function() {
        setTimeout(function() {
            $scope.$apply(function() {
                localStorageService.setItem('points', {"last" : 0, "total": 0});
                window.location = "#tab/chats";
              
               
            });
        }, 1);
    }
    
     $scope.resetPoints = function(index) {
        localStorageService.setItem('points', {"last" : 0, "total": 0});
       // $scope.cards = [];
     }
     
     var wynik = (Math.floor(Math.random() * 9) % 2)+(Math.floor(Math.random() * 9) % 2);
     
     if (wynik == 0)
        var words="uo.json";
    else if (wynik == 1)
        var words="zrz.json";
    else if (wynik == 2)
        var words="hch.json";
    
    
    $scope.cards = [];
    
    
     $http.get(words).then(function (response) {
     if (response.data.error) {
         return null;
     } 
     else 
     {
         
         cardTypes = response.data;
      
         //    console.log(cardTypes);

         
         var newCard = cardTypes[Math.floor(Math.random() * cardTypes.length)];

        
       // console.log(">>"+newCard.title);

      //   localStorageService.setItem('wordDay', {"title" : newCard.title, "total": newCard.image});
      var str = newCard.title;
      
        if (str.indexOf("Ó") >= 0)
                newCard.title = str.replace("Ó", "<b>Ó</b>");
        if (str.indexOf("U") >= 0)
                newCard.title = str.replace("U", "<b>U</b>");
        if (str.indexOf("CH") >= 0)
                newCard.title = str.replace("CH", "<b>H</b>");
        if (str.indexOf("H") >= 0)
                newCard.title = str.replace("H", "<b>H</b>");
        if (str.indexOf("Ż") >= 0)
                newCard.title = str.replace("Ż", "<b>Ż</b>");
        if (str.indexOf("RZ") >= 0)
                newCard.title = str.replace("RZ", "<b>RZ</b>");
            
        $scope.wordDay=newCard.title;
         $scope.wordImageDay=newCard.image;
       // return  newCard.title;
        
         
         
      }
      
     //  newCard =[];

 });
 

 
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



.controller('CardsCtrl', function($scope, $http, $stateParams, $ionicPopup, localStorageService, Cards, Chats, $ionicSwipeCardDelegate, MediaSrv, Account) {

    $scope.chat = Chats.get($stateParams.chatId);
    
            
       $scope.$watch(function(){
            return localStorageService.getItem("points");
        }, function(newStyle, oldStyle){
           // console.log(newStyle);
            $scope.points = newStyle;
        }, true)
        
        
      
         

   
    if ($stateParams.chatId == 0)
        var words="uo.json";
    else if ($stateParams.chatId == 1)
        var words="zrz.json";
    else if ($stateParams.chatId == 2)
        var words="hch.json";
    else if ($stateParams.chatId == 3)
        var words="all.json";


    
    
    //if($scope.points.total != 0)  $scope.addCard();
    
     $scope.cards = [];
     
  var cardTypes =[];
 
    
    /*
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}


   
window.Media = function(src, mediaSuccess, mediaError, mediaStatus){
  // src: A URI containing the audio content. (DOMString)
  // mediaSuccess: (Optional) The callback that executes after a Media object has completed the current play, record, or stop action. (Function)
  // mediaError: (Optional) The callback that executes if an error occurs. (Function)
  // mediaStatus: (Optional) The callback that executes to indicate status changes. (Function)

  if (typeof Audio !== "function" && typeof Audio !== "object") {
    console.warn("HTML5 Audio is not supported in this browser");
  }
  var sound = new Audio();
  sound.src = src;
  sound.addEventListener("ended", mediaSuccess, false);
  sound.load();

  return {
    // Returns the current position within an audio file (in seconds).
    getCurrentPosition: function(mediaSuccess, mediaError){ mediaSuccess(sound.currentTime); },
    // Returns the duration of an audio file (in seconds) or -1.
    getDuration: function(){ return isNaN(sound.duration) ? -1 : sound.duration; },
    // Start or resume playing an audio file.
    play: function(){ sound.play(); },
    // Pause playback of an audio file.
    pause: function(){ sound.pause(); },
    // Releases the underlying operating system's audio resources. Should be called on a ressource when it's no longer needed !
    release: function(){},
    // Moves the position within the audio file.
    seekTo: function(milliseconds){}, // TODO
    // Set the volume for audio playback (between 0.0 and 1.0).
    setVolume: function(volume){ sound.volume = volume; },
    // Start recording an audio file.
    startRecord: function(){},
    // Stop recording an audio file.
    stopRecord: function(){},
    // Stop playing an audio file.
    stop: function(){ sound.pause(); if(mediaSuccess){mediaSuccess();} } // TODO
  };
}
    
    */
    
    
       $http.get(words).then(function (response) {
     if (response.data.error) {
         return null;
     } else {
         
        
         //console.log(response.data);
         cardTypes = response.data;
       //  console.log(myObj);
        $scope.cards = Array.prototype.slice.call(cardTypes, 0, 0);
       
         
         // alert($scope.cards);
          
        //  if(cardId ==  $scope.cards.newCard.id)
       //      cardId = Math.floor(Math.random() * cardTypes.length);
         
      $scope.addCard = function(cardId) {

       // var cardId=Math.floor(Math.random() * cardTypes.length);
           
            
     //   if(cardId ==  newCard.id)
       //      cardId=Math.floor(Math.random() * cardTypes.length);
         
        var newCard = cardTypes[cardId];

        newCard.id = cardId;


        var str = newCard.title;

        if(!newCard.origtitle)
            newCard.origtitle = newCard.title;


        if ($stateParams.chatId == 0) {
            if (str.indexOf("Ó") >= 0)
                newCard.title = str.replace("Ó", "_");
            else
                newCard.title = str.replace("U", "_");

            var str2 = newCard.title;
            
            if((Math.floor(Math.random() * 9) % 2) == 0){
                newCard.word1 = str2.replace("_", "<b>Ó</b>");
                newCard.word2 = str2.replace("_", "<b>U</b>");
            }
            else
            {
                newCard.word1 = str2.replace("_", "<b>U</b>");
                newCard.word2 = str2.replace("_", "<b>Ó</b>");
            }
                
            
        }
        else if ($stateParams.chatId == 1) {
            if (str.indexOf("RZ") >= 0)
                newCard.title = str.replace("RZ", "_");
            else
                newCard.title = str.replace("Ż", "_");
            
            var str2 = newCard.title;
            
            if((Math.floor(Math.random() * 9) % 2) == 0){
                newCard.word1 = str2.replace("_", "<b>RZ</b>");
                newCard.word2 = str2.replace("_", "<b>Ż</b>");
            }
            else
            {
                newCard.word1 = str2.replace("_", "<b>Ż</b>");
                newCard.word2 = str2.replace("_", "<b>RZ</b>");
            }            
        }
        else if ($stateParams.chatId == 2) {
            if (str.indexOf("CH") >= 0)
                newCard.title = str.replace("CH", "_");
            else
                newCard.title = str.replace("H", "_");
            
            var str2 = newCard.title;
            
            if((Math.floor(Math.random() * 9) % 2) == 0){
                newCard.word1 = str2.replace("_", "<b>CH</b>");
                newCard.word2 = str2.replace("_", "<b>H</b>");
            }
            else
            {
                newCard.word1 = str2.replace("_", "<b>H</b>");
                newCard.word2 = str2.replace("_", "<b>CH</b>");
            }            
        }

        $scope.cards.push(angular.extend({}, newCard));
        
        newCard =[];

    }
    
    
    
    //$scope.cardscopy=$scope.cards;

    //for (var i = 0; i < (cardTypes.length); i++){$scope.addCard(i);}
 
    
    

     }
 });
 
      
  //var lastpoint =$scope.points.last;
  //localStorageService.setItem("points", {"best": 123, "last": 0}); 
  
   

  $scope.cardSwiped = function(index) {
   
   
     var last3 =  $scope.points.last;
   var total3 = $scope.points.total;
   
   
   $scope.settings = Account.get();
   var number = $scope.settings.number;
       
   if(total3 == (number-1))
   {
     var percent = Math.floor((last3 / (total3+1)) * 100);
     
     if (percent>75) percent = 'Super! '+percent;
     if(percent>=51 && percent<=75) percent = 'Nieźle. '+percent;
     if (percent<51) percent = 'Słabo.. '+percent;
            $ionicPopup.alert({
              title: 'Twój wynik',
              content: percent+'% poprawnie'
            }).then(function(res) {
              localStorageService.setItem('points', {"last" : 0, "total": 0});
       $scope.endGame();
            });
          
          
       
       
   }
       else{
            var cardId;
          //  cardId2=Math.floor(Math.random() * cardTypes.length);
            cardId=Math.floor(Math.random() * cardTypes.length);
        //     if(cardId === $scope.cards[index].id)
          //        cardId = Math.floor(Math.random() * cardTypes.length);
          var cardId2 = Math.floor(Math.random() * cardTypes.length);
           if(cardId != cardId2)
            $scope.addCard(cardId2);
        else 
            {
            if(cardTypes.length != (cardId+1) ) 
                
           $scope.addCard(cardId+1);
               else
                   $scope.addCard(cardId-1);
           
            }
       }
       
    
       
      
  };

  $scope.cardDestroyed = function(index) {
    $scope.cards.splice(index, 1);
    
     $scope.points.total++;
    
    var total3 = $scope.points.total;
    var last3 =  $scope.points.last;
    localStorageService.setItem('points', {"last" : last3, "total": total3});
    
  };


  


    $scope.refreshCards = function() {
      
      //  $scope.cards.splice(0, 1);
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
    
})

.controller('CardCtrl', function($scope, $ionicSwipeCardDelegate, localStorageService, MediaSrv, Account, cordovaVibrationService) {
  $scope.cardSwipedLeft = function(index) {
    console.log('LEFT SWIPE');
   // $scope.addCard();
  };
  $scope.cardSwipedRight = function(index) {
    console.log('RIGHT SWIPE');
   // $scope.addCard();
  };
  

                    
  $scope.goAway = function(index, w) {
    
     //console.log(w+$scope.cards[index].origtitle);
      var card = $ionicSwipeCardDelegate.getSwipeableCard($scope);
      var strword = w.replace("</b>","");
    if($scope.cards[index].origtitle == strword.replace("<b>","") ) {
        
                $scope.points.last++;
               
                 var last = $scope.points.last;
                var total = $scope.points.total;
               localStorageService.setItem('points', {"last" : last, "total": total});
      
     
     }
     else
     {
         $scope.settings = Account.get();
         
         if($scope.settings.sound)
              navigator.notification.beep(1);
             /*
            MediaSrv.loadMedia('www/sounds/beep7.mp3').then(function(media) {
                media.play();
            });
              */
        if($scope.settings.vibe)  
            cordovaVibrationService.vibrate(100);
     }    
     
     
     $scope.settings = Account.get();
   var number = $scope.settings.number;
    var total3 = $scope.points.total;
    //if(total3 < (number-1))
        card.swipe();
   
  };
})
/*
$scope.playAudio = function() {
    MediaSrv.loadMedia('sounds/beep7.mp3').then(function(media) {
      media.play();
    });
  }
*/

.controller('VibrationDemoCtrl', function ($scope, $stateParams, cordovaVibrationService) {

        $scope.demoIndex = $stateParams.itemId;

        // API demonstration

        $scope.apiVersion = cordovaVibrationService.apiVersion();
        $scope.cordovaVersion = cordovaVibrationService.cordovaVersion();

        $scope.vibrate = function (ms) {
            cordovaVibrationService.vibrate(ms);
        };
    })
    
.controller('FriendsCtrl', function($scope, Friends) {
    $scope.friends = Friends.all();
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
    $scope.friend = Friends.get($stateParams.friendId);
})

.controller('AccountCtrl', function($scope, Account) {
  
    $scope.$watch(
                    "settings",
                    function( newValue, oldValue ) {

                        // Ignore initial setup.
                        if ( newValue === oldValue ) {

                            return;

                        }

                        console.log( "$watch: form.quality changed." );

                        if ( $scope.settings === newValue.value ) {

                            return;

                        }
                      $scope.settings =  newValue.value;

                    }
                );
    $scope.settings = Account.all();
    
    $scope.redirectLandingPage = function() {
        setTimeout(function() {
            $scope.$apply(function() {
                window.open('http://upperapps.pl/index.html#apps', '_system', 'location=yes');
               // window.location = "http://upperapps.pl/index.html#apps";
               
            });
        }, 1);
    }
    
    
});
