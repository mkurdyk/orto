// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

//var app = angular.module('ionicApp', ['ionic', 'ngCordova'])

 
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ionic.contrib.ui.cards', 'cordovaVibrationModule','admobModule'])
 
 
.service("localStorageService", function(){
    this.setItem = function(key, value){
        return localStorage.setItem(key, JSON.stringify(value));
    };
    this.getItem = function(key){
        return JSON.parse(localStorage.getItem(key));
    };
})

 
.run(function($ionicPlatform,localStorageService) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
    
    if (typeof analytics !== 'undefined'){
      analytics.startTrackerWithId('UA-7679641-3');
      analytics.trackView($location.path());
    }
    
    /*
     if(window.plugins && window.plugins.AdMob) {
                var admob_key = device.platform == "Android" ? "pub-0736194863420846" : "IOS_PUBLISHER_KEY";
                var admob = window.plugins.AdMob;
                admob.createBannerView( 
                    {
                        'publisherId': ca-app-pub-0736194863420846/8081004438,
                        'adSize': admob.AD_SIZE.BANNER,
                        'bannerAtTop': false
                    }, 
                    function() {
                        admob.requestAd(
                            { 'isTesting': false }, 
                            function() {
                                admob.showAd(true);
                            }, 
                            function() { console.log('failed to request ad'); }
                        );
                    }, 
                    function() { console.log('failed to create banner view'); }
                );
            }
            
    */
  //q  navigator.splashscreen.hide()
  //$ionicConfigProvider.tabs.position('top');
  });
  
  localStorageService.setItem('points', {"last" : 0, "total": 0});
})


.directive('noScroll', function() {
    return {
        restrict: 'A',
        link: function($scope, $element, $attr) {
            $element.on('touchmove', function(e) {
                e.preventDefault();
            });
        }
    }
})


.config(['admobSvcProvider', function (admobSvcProvider) {
      // Optionally you can configure the options here:
      admobSvcProvider.setOptions({
        publisherId:          "pub-0736194863420846",  // Required
     
      });

      // Optionally configure the events prefix (by default set to 'admob:')
      admobSvcProvider.setPrefix('myTag~');
    }])

.run(['admobSvc', function (admobSvc) {
      // Also you could configure the options here (or in any controller):
      // admobSvcProvider.setOptions({ ... });
 var defaultOptions = {
    license: 'username@gmail.com/xxxxxxxxxxxxxxx',
    bannerId: 'ca-app-pub-0736194863420846/8081004438',
    interstitialId: 'ca-app-pub-0736194863420846/8081004438',
    adSize: 'SMART_BANNER',
    width: 360, // valid when set adSize 'CUSTOM'
    height: 90, // valid when set adSize 'CUSTOM'
//    position: admobSvc.AD_POSITION.BOTTOM_CENTER,
    x: 0,       // valid when set position to POS_XY
    y: 0,       // valid when set position to POS_XY
    isTesting: true,
    autoShow: true
};
      admobSvc.createBannerView();
      // You could also call admobSvc.createBannerView(options);


      // Handle events:
     // $rootScope.$on('myTag~' + admobSvc.events.onAdOpened, function onAdOpened(evt, e) {
   //    console.log('adOpened: type of ad:' + e.adType);
  //    });

      // The default prefix for events is 'admob:'
      // $rootScope.$on('admob:' + admobSvc.events...
    }])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: "/tab",
    abstract: true,
    templateUrl: "templates/tabs.html"
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-words.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/word-detail.html',
        //  controller: 'CardsCtrl'
        }
      }
    })

  .state('tab.friends', {
      url: '/friends',
      views: {
        'tab-friends': {
          templateUrl: 'templates/tab-friends.html',
          controller: 'FriendsCtrl'
        }
      }
    })
    .state('tab.friend-detail', {
      url: '/friend/:friendId',
      views: {
        'tab-friends': {
          templateUrl: 'templates/friend-detail.html',
          controller: 'FriendDetailCtrl'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');

})
