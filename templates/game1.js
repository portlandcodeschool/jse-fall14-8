UNFINISHED_TEMPLATE //delete me

var MemoryGame = (function() { //begin game IIFE

var MemoryCardModel = Backbone.Model.extend({
    defaults: {status:'facedown'}
});

var MemoryCollection = Backbone.Collection.extend({
  model: MemoryCardModel,
});

// Ctor:
function MemoryGame(cardset) {
  //...
  
  this.cards = new MemoryCollection();
  
  this.length //= something;

  this.reset = function() {
        //...
  }

  this.lift=function(here) { //here should be a number
    // lift will include these somewhere:
    if (this.gui)
        this.gui.removeSoon([here,there]);
    //...
    if (this.gui)
        this.gui.hideSoon([here,there]);
    //...
    if (this.gui)
        this.gui.show(here,faceVal);
    //...
  };
     
}; // end ctor

return MemoryGame;
})(); //end game IIFE



var cards = null, gui = null, game = null;  //global for debugging
$(function() {
    cards = new MemoryCards();
    game = new MemoryGame(cards);
    
	gui = new MemoryGUI(game); //make a gui
    game.gui = gui; //attach gui to game/collection
});


