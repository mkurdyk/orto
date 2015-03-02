angular.module('starter.services', [])

.factory('Chats', function($ionicPlatform) {
  // Might use a resource here that returns a JSON array



  var src="";
  if ($ionicPlatform.is('android')) {
        src = '/android_asset/www';
      }
  var chats = [{
    id: 0,
    name: 'Słowa z U i Ó',
    lastText: '',
    face: src+'/img/uo.png'
  }, {
    id: 1,
    name: 'Słowa z Ż i RZ',
    lastText: '',
    face: src+'/img/rz.png'
  }, {
    id: 2,
    name: 'Słowa z H i CH',
    lastText: '',
    face: src+'/img/ch.png'
  
  }, 
  /*{
    id: 3,
    name: 'Słowa z Ą i OM',
    lastText: 'disabled',
    face: src+'/img/ch-.png'
  
  }, {
    id: 4,
    name: 'Słowa z Ę i EN',
    lastText: 'disabled',
    face: src+'/img/ch-.png'
  
  }
        */

  ];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  }
})

/**
 * A simple example service that returns some data.
 */
.factory('Friends', function($ionicPlatform) {

  var src="";
  if ($ionicPlatform.is('android')) {
        src = '/android_asset/www';
      }
      
  var friends = [{
    id: 0,
    name: 'Kiedy pisać U i Ó',
    notes: "<strong>U</strong> piszemy na początku wyrazu ulica, urodziny, umieć, na końcu wyrazu emu, sklepu, samolotu w czasownikach zakończonych na '-uję', '-ujesz' itp. pilnuję, kupuję, malujesz w zakończeniach rzeczowników typu '-unek', '-ulec', '-usz', '-uszek', '-uchna', '-un', '-unka' itp. podarunek, hamulec, kapelusz, dzbanuszek, babunia, biegun, opiekunka.<br><br><strong>Ó</strong> piszemy gdy w innych formach tego wyrazu lub w wyrazach pokrewnych wymienia się na: 'o', 'a' lub 'e' obóz - obozy,skrócić - skracać, szósty - sześć w wyrazach zakończonych na na '-ów', '-ówka', '-ówna' Kraków, główka, Krukówna wyjątki: skuwka, wsuwka, zasuwka na początku niektórych wyrazów ósmy, ów, ówczesny. ",
    face: src+'/img/uo.png'
  }, {
    id: 1,
    name: 'Kiedy pisać RZ i Ż',
    notes: "<strong>Rz</strong> piszemy w środku wyrazów, gdy wymienia się na r morze - morski, dworzec - dworca, wierzy - wiara w zakończeniach '-arz', '-erz' kalendarz, twarz, rycerz, pasterz w zakończeniach '-mistrz', '-mierz' zegarmistrz, harcmistrz, kątomierz, Sandomierz po spółgłoskach b, ch, d, g, j, k, p, t, w przysięga, brzuch, trzask, grzmot wyjątki: pszczoła, pszenica, bukszpan, kształt, wykształcenie. Reguła ta nie dotyczy wyrazów, w których zamiast 'w' słychać 'f' wszędzie, wszystko, pierwszy. W zakończeniach przymiotników w stopniu wyższym i najwyższym, a także w wyrazach od nich utworzonych piszemy zawsze 'sz' niezależnie od poprzedzającej spółgłoski lepszy - najlepszy, grubszy - najgrubszy. <br><br><strong>Ż</strong> piszemy w środku wyrazów, gdy wymienia się na g, dz, h, s, z, ź, zi książka - księga, boży - boski, wożą - wozić po spółgłoskach l, ł, r, n lżejszy, małżeństwo, drżeć, aranżacja",
   face: src+'/img/rz.png'
  }, {
    id: 2,
    name: 'Kiedy pisać CH i H',
    notes: "<strong>Ch</strong> piszemy gdy wymienia się na 'sz', 's', 'ś (si)' cicho - cisza, głuchy - głusi po spółgłosce 's' schronisko, schudnąć, schody na końcu wyrazu duch, strach, słuch, dach wyjątek: druh.<br><br> <strong>H</strong> piszemy gdy wymienia się na 'g', 'z', 'ż' wahać się - waga, błahy - błazen, druh - drużyna po spółgłosce 'z' zharmonizować, zharowany.",
    face: src+'/img/ch.png'
  }];


  return {
    all: function() {
      return friends;
    },
    get: function(friendId) {
      // Simple index lookup
      return friends[friendId];
    }
  }
})


 .factory('Cards',function($http,$ionicSwipeCardDelegate){
     
  
      
     
       return{
          all:function(){
            
         
              
        return $http.get('uo.json').then(function (response) {
     if (response.data.error) {
         return null;
     } else {
         //console.log(response.data);
         return response.data;
     }
 });
  
              
      },
        get: function(friendId) {
      // Simple index lookup
      return friends[friendId];
    }       
    }
 })
     
     
.factory('MediaSrv', function($q, $ionicPlatform, $window) {
  var service = {
    loadMedia: loadMedia,
    getStatusMessage: getStatusMessage,
    getErrorMessage: getErrorMessage
  };

  function loadMedia(src, onError, onStatus, onStop) {
    var defer = $q.defer();
    $ionicPlatform.ready(function() {
      var mediaSuccess = function() {
        if (onStop) {
          onStop();
        }
      };
      var mediaError = function(err) {
        _logError(src, err);
        if (onError) {
          onError(err);
        }
      };
      var mediaStatus = function(status) {
        if (onStatus) {
          onStatus(status);
        }
      };

      if ($ionicPlatform.is('android')) {
        src = '/android_asset/www/' + src;
      }
      defer.resolve(new $window.Media(src, mediaSuccess, mediaError, mediaStatus));
    });
    return defer.promise;
  }

  function _logError(src, err) {
    console.error('media error', {
      code: err.code,
      message: getErrorMessage(err.code)
    });
  }

  function getStatusMessage(status) {
    if (status === 0) {
      return 'Media.MEDIA_NONE';
    } else if (status === 1) {
      return 'Media.MEDIA_STARTING';
    } else if (status === 2) {
      return 'Media.MEDIA_RUNNING';
    } else if (status === 3) {
      return 'Media.MEDIA_PAUSED';
    } else if (status === 4) {
      return 'Media.MEDIA_STOPPED';
    } else {
      return 'Unknown status <' + status + '>';
    }
  }

  function getErrorMessage(code) {
    if (code === 1) {
      return 'MediaError.MEDIA_ERR_ABORTED';
    } else if (code === 2) {
      return 'MediaError.MEDIA_ERR_NETWORK';
    } else if (code === 3) {
      return 'MediaError.MEDIA_ERR_DECODE';
    } else if (code === 4) {
      return 'MediaError.MEDIA_ERR_NONE_SUPPORTED';
    } else {
      return 'Unknown code <' + code + '>';
    }
  }

  return service;
})

 .factory('Account',function(){
     
    $settings = {
        number: 10,
        sound: true,
        vibe: false
        };
      
     
       return{
        all: function() {
            return $settings;
          },
        get: function() {
      // Simple index lookup
      return $settings;
    }       
    }
 })
 

     /*
.factory('Cards', ['$http',
    function ($http) {

        var items_nota = [];
        var items_nota_array;


 
        return {

            all: function () {
                return  $http.json("http://localhost:8100/uo.json?callback=JSON_CALLBACK")
            .success(function(result) {
                  console.log("**** SUCCESS ****");
                
                })
                .error(function(result, status){
                  console.log("**** ERROR ****");
                  console.log(status);
                })
                .then(function(result){
                  console.log("**** THEN ****");

                        items_nota = result;
                        return items_nota;


                  }
                )
            },
            get: function (notaId) {
                // Simple index lookup
                var pepe = parseInt(notaId);

                var ESTO = 0;

                var addToArray = true;
                for (var i = 0; i < items_nota.length; i++) {
                    if (items_nota[i].id == pepe) {
                        addToArray = false;
                        ESTO = i;
                    }
                }


                return items_nota[ESTO];
            }

        }
}]);
*/