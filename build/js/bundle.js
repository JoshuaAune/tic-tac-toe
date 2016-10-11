'use strict';

angular.module('app', []);
'use strict';

angular.module('app').controller('ctrl', function ($scope, srvc) {

  //Title display during gameplay
  $scope.display = {
    one: 'GOOD',
    two: 'LUCK'
  };
  var neon = false;
  $scope.switch = function () {
    neon = !neon;
  };
  //Values of each square from srvc.js
  var squares = [$scope.id11 = srvc.squares[0], $scope.id12 = srvc.squares[1], $scope.id13 = srvc.squares[2], $scope.id21 = srvc.squares[3], $scope.id22 = srvc.squares[4], $scope.id23 = srvc.squares[5], $scope.id31 = srvc.squares[6], $scope.id32 = srvc.squares[7], $scope.id33 = srvc.squares[8]];
  //Puts X or O in respective square
  var x = "<h3 class='x'>X</h3>";
  var o = "<h3 class='o'>O</h3>";
  //If games ends this causes squares to be unclickable
  var gameOver = false;
  //Array of which player has which square
  var playerSquares = [];

  var compSquares = [];

  //When a player chooses a square to play
  $scope.click = function ($event, id) {
    //Checks to see if square is occupied, if it is it puts an x in the square and add square to playerSquare array. If not, nothing happens.
    if (!id.occupied) {
      id.occupied = true;
      id.value = x;
      playerSquares.push(id);
      $($event.currentTarget).append(id.value);
      if (neon) {

        $('.x').addClass('xNeon');
      }
    }

    //sees if player has any winning combinations. If winning combination is found game ends, squares become unclickable and "you win" displays
    var playerHas11 = playerSquares.indexOf($scope.id11);
    var playerHas12 = playerSquares.indexOf($scope.id12);
    var playerHas13 = playerSquares.indexOf($scope.id13);
    var playerHas21 = playerSquares.indexOf($scope.id21);
    var playerHas22 = playerSquares.indexOf($scope.id22);
    var playerHas23 = playerSquares.indexOf($scope.id23);
    var playerHas31 = playerSquares.indexOf($scope.id31);
    var playerHas32 = playerSquares.indexOf($scope.id32);
    var playerHas33 = playerSquares.indexOf($scope.id33);
    if (playerHas11 !== -1 && playerHas12 !== -1 && playerHas13 !== -1 || playerHas11 !== -1 && playerHas21 !== -1 && playerHas31 !== -1 || playerHas11 !== -1 && playerHas22 !== -1 && playerHas33 !== -1 || playerHas21 !== -1 && playerHas22 !== -1 && playerHas23 !== -1 || playerHas31 !== -1 && playerHas32 !== -1 && playerHas33 !== -1 || playerHas12 !== -1 && playerHas22 !== -1 && playerHas32 !== -1 || playerHas13 !== -1 && playerHas23 !== -1 && playerHas33 !== -1 || playerHas13 !== -1 && playerHas22 !== -1 && playerHas31 !== -1) {
      $scope.display = {
        one: 'YOU',
        two: 'WIN'
      };
      gameOver = true;
      if (gameOver) {
        for (var i = 0; i < squares.length; i++) {
          console.log(squares[i].occupied);
        }
      }
    };
    //checks if player made a playable move and begins computer move
    if (playerSquares.length > compSquares.length) {
      $scope.compturn(id);
    }
  };

  $scope.compturn = function (id) {

    function compMove(id, boxId) {
      console.log(id);
      id.occupied = true;
      id.value = o;
      compSquares.push(id);
      setTimeout(function () {
        $(boxId).append(id.value);
        if (neon) {
          $('.o').addClass('oNeon');
        }
      }, 300);
    }

    //  Checks if computer can make certain winning moves, if not it moves on to another move.
    // id31 win
    if (!$scope.id12.occupied && $scope.id22.value === o && $scope.id32.value === o) {
      compMove($scope.id12, '.box-id-12');
    } else if (!$scope.id21.occupied && ($scope.id11.value === o && $scope.id31.value === o || $scope.id22.value === o && $scope.id23.value === o)) {
      compMove($scope.id21, '.box-id-21');
    } else if (!$scope.id23.occupied && $scope.id21.value === o && $scope.id22.value === o) {
      compMove($scope.id23, '.box-id-23');
    } else if (!$scope.id31.occupied && $scope.id11.value === o && $scope.id21.value === o) {
      compMove($scope.id31, '.box-id-31');
    } else if (!$scope.id32.occupied && $scope.id12.value === o && $scope.id22.value === o) {
      compMove($scope.id32, '.box-id-32');
    }
    //If comp cant make winning move it decides best move to make
    else if (!$scope.id22.occupied) {
        compMove($scope.id22, '.box-id-22');
      }
      //place in id11
      else if (!$scope.id11.occupied && ($scope.id21.value === x && $scope.id22.value === o && $scope.id31.value === o && $scope.id13.value === x && ($scope.id33.value !== x || $scope.id23.value === o) || $scope.id23.value !== x && $scope.id31.value !== x && $scope.id33.value !== x || $scope.id21.value === x && $scope.id31.value === x || $scope.id22.value === o && $scope.id33.value === o)) {
          compMove($scope.id11, '.box-id-11');
        }
        //place in id12
        else if (!$scope.id12.occupied && ($scope.id21.value !== x && $scope.id31.value !== x && $scope.id32.value !== x && $scope.id23.value !== x && $scope.id33.value !== x && $scope.id22.value !== x || $scope.id11.value === x && $scope.id33.value === x && $scope.id31.value !== o && $scope.id13.value !== o && $scope.id21.value !== o && $scope.id23.value !== o || $scope.id11.value === x && $scope.id21.value === o && $scope.id31.value === x && $scope.id22.value === o && $scope.id23.value === x || $scope.id31.value === o && $scope.id11.value === x && $scope.id13.value === x || $scope.id11.value === x && $scope.id13.value === x && $scope.id33.value === o || $scope.id32.value === x && $scope.id22.value === x || $scope.id22.value === o && $scope.id32.value === o || $scope.id11.value === o && $scope.id13.value === o)) {
            compMove($scope.id12, '.box-id-12');
          }
          //place in id13
          else if (!$scope.id13.occupied && ($scope.id21.value !== x && $scope.id31.value !== x && $scope.id22.value !== x & $scope.id32.value !== x && $scope.id12.value !== o || $scope.id11.value === o && $scope.id22.value === o && $scope.id33.value === x && $scope.id32.value !== x && $scope.id31.value !== x || $scope.id31.value === x && $scope.id32.value === o && $scope.id33.value === x && $scope.id22.value === o || $scope.id31.value === x && $scope.id22.value === x || $scope.id31.value === o && $scope.id22.value === o || $scope.id11.value === o && $scope.id12.value === o || $scope.id11.value === x && $scope.id12.value === x)) {
              compMove($scope.id13, '.box-id-13');
            }
            //place in id21
            else if (!$scope.id21.occupied && ($scope.id23.value !== x && $scope.id33.value !== x && $scope.id22.value !== x && $scope.id32.value !== x && $scope.id12.value !== o && $scope.id11.value !== o || $scope.id23.value === x && $scope.id13.value === o && $scope.id11.value === x && $scope.id31.value === x || $scope.id31.value === x && $scope.id32.value === o && $scope.id33.value === x && $scope.id13.value !== x || $scope.id23.value === x && $scope.id22.value === x || $scope.id22.value === o && $scope.id23.value === o || $scope.id11.value === x && $scope.id31.value === x || $scope.id11.value === o && $scope.id31.value === o)) {
                compMove($scope.id21, '.box-id-21');
              }
              //place in id23
              else if (!$scope.id23.occupied && ($scope.id21.value !== x && $scope.id22.value !== x && $scope.id32.value !== x && $scope.id31.value !== x && $scope.id13.value === o && $scope.id31.value === x || $scope.id13.value === x && $scope.id33.value === x && $scope.id12.value !== o || $scope.id21.value === x && $scope.id22.value === x || $scope.id21.value === o && $scope.id22.value === o || $scope.id13.value === x && $scope.id33.value === x)) {
                  compMove($scope.id23, '.box-id-23');
                }
                //place in id31
                else if (!$scope.id31.occupied && ($scope.id23.value !== x && $scope.id22.value !== x && $scope.id12.value !== o && $scope.id11.value !== o || $scope.id11.value === x && $scope.id21.value === x && $scope.id12.value !== o || $scope.id11.value === x && $scope.id22.value === o && $scope.id33.value === o || $scope.id13.value === x && $scope.id22.value === x || $scope.id33.value === x && $scope.id22.value === x || $scope.id13.value === o && $scope.id22.value === o || $scope.id32.value === x && $scope.id33.value === x || $scope.id11.value === o && $scope.id21.value === o)) {
                    compMove($scope.id31, '.box-id-31');
                  }
                  //place in id32
                  else if (!$scope.id32.occupied && ($scope.id11.value === o && $scope.id12.value === x && $scope.id33.value === x || $scope.id23.value !== x && $scope.id11.value !== o || $scope.id12.value === x && $scope.id22.value === x || $scope.id12.value === o && $scope.id22.value === o || $scope.id31.value === x && $scope.id33.value === x)) {
                      compMove($scope.id32, '.box-id-32');
                    }
                    //place in id33
                    else if (!$scope.id33.occupied) {
                        compMove($scope.id33, '.box-id-33');
                      }
                      //If game has not been won and there are no more playable moves
                      else {
                          $scope.display = {
                            one: 'TIE',
                            two: 'GAME'
                          };
                        }
    //sees if computer has any winning combinations. If winning combination is found, game ends, squares become unclickable and "you lose" displays
    var compHas11 = compSquares.indexOf($scope.id11);
    var compHas12 = compSquares.indexOf($scope.id12);
    var compHas13 = compSquares.indexOf($scope.id13);
    var compHas21 = compSquares.indexOf($scope.id21);
    var compHas22 = compSquares.indexOf($scope.id22);
    var compHas23 = compSquares.indexOf($scope.id23);
    var compHas31 = compSquares.indexOf($scope.id31);
    var compHas32 = compSquares.indexOf($scope.id32);
    var compHas33 = compSquares.indexOf($scope.id33);
    console.log(compHas13, compHas22, compHas31);
    if (compHas11 !== -1 && compHas12 !== -1 && compHas13 !== -1 || compHas11 !== -1 && compHas21 !== -1 && compHas31 !== -1 || compHas11 !== -1 && compHas22 !== -1 && compHas33 !== -1 || compHas21 !== -1 && compHas22 !== -1 && compHas23 !== -1 || compHas31 !== -1 && compHas32 !== -1 && compHas33 !== -1 || compHas12 !== -1 && compHas22 !== -1 && compHas32 !== -1 || compHas13 !== -1 && compHas23 !== -1 && compHas33 !== -1 || compHas13 !== -1 && compHas22 !== -1 && compHas31 !== -1) {
      $scope.display = {
        one: 'YOU',
        two: 'LOSE'
      };
      gameOver = true;
      if (gameOver) {
        for (var i = 0; i < squares.length; i++) {
          squares[i].occupied = true;
          console.log(squares[i].occupied);
        }
      }

      //HERHERHERHERHERHERHERHERHERHERH
      if (compHas11 !== -1 && compHas12 !== -1 && compHas13 !== -1) {
        setTimeout(function () {
          $('.box-id-11 >.o, .box-id-12 >.o, .box-id-13 >.o').hide();
        }, 500);
        setTimeout(function () {
          $('.box-id-11 >.o, .box-id-12 >.o, .box-id-13 >.o').show();
        }, 700);
        setTimeout(function () {
          $('.box-id-11 >.o, .box-id-12 >.o, .box-id-13 >.o').hide();
        }, 900);
        setTimeout(function () {
          $('.box-id-11 >.o, .box-id-12 >.o, .box-id-13 >.o').show();
        }, 1100);
      } else if (compHas11 !== -1 && compHas21 !== -1 && compHas31 !== -1) {
        setTimeout(function () {
          $('.box-id-11 >.o, .box-id-21 >.o, .box-id-31 >.o').hide();
        }, 500);
        setTimeout(function () {
          $('.box-id-11 >.o, .box-id-21 >.o, .box-id-31 >.o').show();
        }, 700);
        setTimeout(function () {
          $('.box-id-11 >.o, .box-id-21 >.o, .box-id-31 >.o').hide();
        }, 900);
        setTimeout(function () {
          $('.box-id-11 >.o, .box-id-21 >.o, .box-id-31 >.o').show();
        }, 1100);
      } else if (compHas11 !== -1 && compHas22 !== -1 && compHas33 !== -1) {
        setTimeout(function () {
          $('.box-id-11 >.o, .box-id-22 >.o, .box-id-33 >.o').show();
        }, 700);
        setTimeout(function () {
          $('.box-id-11 >.o, .box-id-22 >.o, .box-id-33 >.o').hide();
        }, 900);
        setTimeout(function () {
          $('.box-id-11 >.o, .box-id-22 >.o, .box-id-33 >.o').show();
        }, 1100);
      } else if (compHas21 !== -1 && compHas22 !== -1 && compHas23 !== -1) {
        setTimeout(function () {
          $('.box-id-21 >.o, .box-id-22 >.o, .box-id-23 >.o').hide();
        }, 500);
        setTimeout(function () {
          $('.box-id-21 >.o, .box-id-22 >.o, .box-id-23 >.o').show();
        }, 700);
        setTimeout(function () {
          $('.box-id-21 >.o, .box-id-22 >.o, .box-id-23 >.o').hide();
        }, 900);
        setTimeout(function () {
          $('.box-id-21 >.o, .box-id-22 >.o, .box-id-23 >.o').show();
        }, 1100);
      } else if (compHas31 !== -1 && compHas32 !== -1 && compHas33 !== -1) {
        setTimeout(function () {
          $('.box-id-31 >.o, .box-id-32 >.o, .box-id-33 >.o').hide();
        }, 500);
        setTimeout(function () {
          $('.box-id-31 >.o, .box-id-32 >.o, .box-id-33 >.o').show();
        }, 700);
        setTimeout(function () {
          $('.box-id-31 >.o, .box-id-32 >.o, .box-id-33 >.o').hide();
        }, 900);
        setTimeout(function () {
          $('.box-id-31 >.o, .box-id-32 >.o, .box-id-33 >.o').show();
        }, 1100);
      } else if (compHas12 !== -1 && compHas22 !== -1 && compHas32 !== -1) {
        setTimeout(function () {
          $('.box-id-12 >.o, .box-id-22 >.o, .box-id-32 >.o').hide();
        }, 500);
        setTimeout(function () {
          $('.box-id-12 >.o, .box-id-22 >.o, .box-id-32 >.o').show();
        }, 700);
        setTimeout(function () {
          $('.box-id-12 >.o, .box-id-22 >.o, .box-id-32 >.o').hide();
        }, 900);
        setTimeout(function () {
          $('.box-id-12 >.o, .box-id-22 >.o, .box-id-32 >.o').show();
        }, 1100);
      } else if (compHas13 !== -1 && compHas23 !== -1 && compHas33 !== -1) {
        setTimeout(function () {
          $('.box-id-13 >.o, .box-id-23 >.o, .box-id-33 >.o').hide();
        }, 500);
        setTimeout(function () {
          $('.box-id-13 >.o, .box-id-23 >.o, .box-id-33 >.o').show();
        }, 700);
        setTimeout(function () {
          $('.box-id-13 >.o, .box-id-23 >.o, .box-id-33 >.o').hide();
        }, 900);
        setTimeout(function () {
          $('.box-id-13 >.o, .box-id-23 >.o, .box-id-33 >.o').show();
        }, 1100);
      } else if (compHas13 !== -1 && compHas22 !== -1 && compHas31 !== -1) {
        setTimeout(function () {
          $('.box-id-13 >.o, .box-id-22 >.o, .box-id-31 >.o').hide();
        }, 500);
        setTimeout(function () {
          $('.box-id-13 >.o, .box-id-22 >.o, .box-id-31 >.o').show();
        }, 700);
        setTimeout(function () {
          $('.box-id-13 >.o, .box-id-22 >.o, .box-id-31 >.o').hide();
        }, 900);
        setTimeout(function () {
          $('.box-id-13 >.o, .box-id-22 >.o, .box-id-31 >.o').show();
        }, 1100);
      }
    };
  };

  //Resets everything for a new game
  $scope.reload = function () {
    $('.sqr > h3').remove();
    $scope.display = {
      one: "GOOD",
      two: "LUCK"
    };
    playerSquares = [];
    compSquares = [];
    for (var i = 0; i < squares.length; i++) {
      squares[i].occupied = false;
      squares[i].value = null;
    }
  };
});
'use strict';

angular.module('app').service('srvc', function () {
  this.test = "testing";

  this.squares = [{
    "name": "id11",
    "occupied": false,
    "value": null
  }, {
    "name": "id12",
    "occupied": false,
    "value": null
  }, {
    "name": "id13",
    "occupied": false,
    "value": null
  }, {
    "name": "id21",
    "occupied": false,
    "value": null
  }, {
    "name": "id22",
    "occupied": false,
    "value": null
  }, {
    "name": "id23",
    "occupied": false,
    "value": null
  }, {
    "name": "id31",
    "occupied": false,
    "value": null
  }, {
    "name": "id32",
    "occupied": false,
    "value": null
  }, {
    "name": "id33",
    "occupied": false,
    "value": null
  }];
});
"use strict";

angular.module("app").directive("animation", function () {
  return {
    restrict: "EA",
    link: function link(scope, element, attribute) {

      $(window).ready(function () {
        $('.loading').fadeOut();
        $('.body-wrapper').hide();
        $('.body-wrapper').fadeIn(1000);
        $('.body-wrapper').addClass('bodyTransition');
        $('.game-board').removeClass('game-boardTransition');
        var neon = false;

        $('.neonSign').click(function () {
          neon = !neon;
          if (neon) {
            $('.neoff').removeClass('neoffActive');
            $('.neon').addClass('neonActive');
            $('h1').addClass('h1Neon');
            $('.x').addClass('xNeon');
            $('.o').addClass('oNeon');
          } else {
            $('.neoff').addClass('neoffActive');
            $('.neon').removeClass('neonActive');
            $('h1').removeClass('h1Neon');
            $('.x').removeClass('xNeon');
            $('.o').removeClass('oNeon');
          }
        });
        $('.sqr').click(function () {
          if (neon) {}
        });
      });
    }
  };
});