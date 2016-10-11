angular.module("app")
       .directive("animation", function(){
         return {
           restrict: "EA",
           link: function(scope, element, attribute){

             $(window).ready(function(){
               $('.loading').fadeOut();
               $('.body-wrapper').hide();
               $('.body-wrapper').fadeIn(1000);
               $('.body-wrapper').addClass('bodyTransition');
               $('.game-board').removeClass('game-boardTransition')
               var neon = false

               $('.neonSign').click(function(){
                 neon = !neon
                 if(neon){
                   $('.neoff').removeClass('neoffActive');
                   $('.neon').addClass('neonActive');
                   $('h1').addClass('h1Neon');
                   $('.x').addClass('xNeon');
                   $('.o').addClass('oNeon');

                 }else {
                   $('.neoff').addClass('neoffActive');
                   $('.neon').removeClass('neonActive');
                   $('h1').removeClass('h1Neon');
                   $('.x').removeClass('xNeon');
                   $('.o').removeClass('oNeon');

                 }


               })
               $('.sqr').click(function(){
                 if(neon){

                }
               });
             });
           }
         }
       });
