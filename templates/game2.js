
var MemoryGame = (function() { //begin game IIFE

var MemoryCollection = Backbone.Collection.extend({});


function MemoryGame(Model,len) { 

  var collection = new MemoryCollection();

  collection.model = Model;

  collection.add(_.shuffle(Model.values(len)));

  var held = false;

  this.length = collection.length;

  var faceVal = false;


  this.reset = function() {

    collection.reset(_.shuffle(Model.values(len)));

    collection.models.forEach(function(model){ model.set(model.defaults)});
  }

  this.lift=function(here) { 
    //if here is a valid input
    if(here){
      //if it is not already faceup
      if(held === here){
        
        console.log('you have already clicked on this card')

        return false;
      };
      //if the value is already matched
      if(collection.at(here).attributes.status === 'matched'){
        
        return false;
      }

      faceVal = Model.display(collection.at(here));

      $(document).trigger("showCard", {"here": here, "faceVal": faceVal});

      if(!(held)){ //if no faceup value yet.

        held = here;

        collection.at(held).set('status', 'faceup');
        
      }

      //else if there is already a faceup value, run match
      else if(Model.match(collection.at(held), collection.at(here))){ 
        
        collection.at(here).set('status', 'matched');

        collection.at(held).set('status', 'matched');

        $(document).trigger("removeCard", {"held": held, "here": here});
        
        console.log("match!");
        
        held = false;
          //if this is the last values to match
        if(collection.where({status: 'matched'}).length === this.length){

          console.log('No Matches. You Won!');

          alert('No Matches. You Won!');
        }
      }


      else{
      //if there is no match
          
          $(document).trigger("hideCard", {"held": held, "here": here});
          
          collection.at(held).set('status', 'facedown');

          collection.at(here).set('status', 'facedown');
          
          held = false;

          console.log('No match. Try again.')
      }
    }
  };
    
}; // end ctor

return MemoryGame;
})(); //end game IIFE



var gui = null, game = null;  //global for debugging
$(function() {
    game = new MemoryGame(TestCardModel,12); //<-- CHANGED
	gui = new MemoryGUI(game); //make a gui
    game.gui = gui; //attach gui to game/collection
});


