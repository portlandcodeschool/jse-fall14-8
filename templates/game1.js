// UNFINISHED_TEMPLATE //delete me

var MemoryGame = (function() { //begin game IIFE

var MemoryCardModel = Backbone.Model.extend({
    defaults: {status:'facedown'}
});

var MemoryCollection = Backbone.Collection.extend({
  model: MemoryCardModel,
});

// Ctor:
function MemoryGame(cardset) {

  this.cards = new MemoryCollection();
  
  this.cards.add(cardset.values);

  this.length = cardset.values.length;

  var faceupValuesArr = [];

  var matchedArr = [];
  
  this.reset = function() {

      //create new game board     
      var rstboard = cardset.values.slice();
      
      //shuffling the entire array
      board = _.shuffle(rstboard);

      faceupValuesArr = [];

      matchedArr = [];
      
      console.log('Game has been reset. ready to play!');
    
  };

  this.reset(); //shuffles upon load



  this.lift = function(where){

      var whereValue = board[where].val;
      
      if(board[where] !== undefined){

        if(matchedArr){

          matchedArr.forEach(function(key){

              if(key === whereValue){

                console.log('value has already been matched');

                return false;
              }
          })
        }
        
        if(faceupValuesArr[0] === undefined){

          faceupValuesArr.push(where);

          board.slice(where,1);

          var faceupValue = board[faceupValuesArr[0]].val;
          
          if(gui){
            
            console.log(faceupValue, ' face up value');
            
             return gui.show(where, faceupValue);
          }
          else{

            console.log(faceupValue);
          }
        }

        if(board[faceupValuesArr[0]] === board[where]){

          console.log('You have already clicked on this card');

          return false;

        }

        else if(cardset.match(board[where], board[faceupValuesArr[0]])){

          var faceupValue = board[faceupValuesArr[0]].val;

          console.log(whereValue + ', and ' + faceupValue);
          
          gui.show(where,whereValue);

          gui.removeSoon([where, faceupValuesArr[0]]);

          matchedArr.push(whereValue);

          matchedArr.push(faceupValue);
        
          board.slice(where, 1);

          board.slice(faceupValuesArr[0], 1);

          faceupValuesArr.shift();
          
          if(board.length === matchedArr.length){ 
        
              console.log("No more pairs! You Won!");

              alert("No more pairs! You Won!");
          }
          else{

            console.log('Match!');
          }
        }

        else{
      
          gui.show(where, whereValue);

          gui.hideSoon([where, faceupValuesArr[0]]);

          console.log(whereValue,', ',board[faceupValuesArr[0]].val, ' no match! Try again');

          faceupValuesArr.shift();
        }
      }

      else{

        console.log('value undefined');

        return false;
      }
    
    };
     
}; // end ctor

return MemoryGame;
})(); //end game IIFE



var cards = null, gui = null, game = null;  //global for debugging
$(function() {
    cards = new MemoryCardModel();
    game = new MemoryGame(cards);
    
	gui = new MemoryGUI(game); //make a gui
    game.gui = gui; //attach gui to game/collection
});


