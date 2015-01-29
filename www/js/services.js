angular.module('starter.services', [])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array




  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'U czy Ó',
    lastText: 'Słowa z literami U i Ó',
    face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
  }, {
    id: 1,
    name: 'RZ czy Ż',
    lastText: 'Słowa z literami Ż i RZ',
    face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
  }, {
    id: 2,
    name: 'H czy CH',
    lastText: '',
    face: 'https://pbs.twimg.com/profile_images/491274378181488640/Tti0fFVJ.jpeg'
  
  }];

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
.factory('Friends', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  // Some fake testing data
  var friends = [{
    id: 0,
    name: 'Kiedy piszemy U i Ó',
    notes: "U piszemy na początku wyrazu ulica, urodziny, umieć, na końcu wyrazu emu, sklepu, samolotu w czasownikach zakończonych na '-uję', '-ujesz' itp. pilnuję, kupuję, malujesz w zakończeniach rzeczowników typu '-unek', '-ulec', '-usz', '-uszek', '-uchna', '-un', '-unka' itp. podarunek, hamulec, kapelusz, dzbanuszek, babunia, biegun, opiekunka. Ó piszemy gdy w innych formach tego wyrazu lub w wyrazach pokrewnych wymienia się na: 'o', 'a' lub 'e' obóz - obozy,skrócić - skracać, szósty - sześć w wyrazach zakończonych na na '-ów', '-ówka', '-ówna' Kraków, główka, Krukówna wyjątki: skuwka, wsuwka, zasuwka na początku niektórych wyrazów ósmy, ów, ówczesny. ",
    face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
  }, {
    id: 1,
    name: 'Kiedy piszemy RZ i Ż',
    notes: '...',
    face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
  }, {
    id: 2,
    name: 'Kiedy piszemy H i CH',
    notes: '...',
    face: 'https://pbs.twimg.com/profile_images/491274378181488640/Tti0fFVJ.jpeg'
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



.factory('Cards', ['$http',
    function ($http) {

        var items_nota = [];
        var items_nota_array;

        return {

            all: function () {
                return $http.get('http://localhost:8100/uo.json')
                .success(function(data, status, headers, config){
                  console.log("**** SUCCESS ****");
                  console.log(status);
                })
                .error(function(data, status, headers, config){
                  console.log("**** ERROR ****");
                  console.log(status);
                })
                .then(function(response){
                  console.log("**** THEN ****");

                        items_nota = response;
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