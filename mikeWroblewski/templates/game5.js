var MemoryGame = (function() { //begin game IIFE

var MemoryCollection = Backbone.Collection.extend({});//<--NO MODEL HERE

// Ctor:
function MemoryGame(Model,len) { //<-- CHANGED
    
    var matchCards = Model.match;
    var displayCard = Model.display;

    var faceupCard = false;

    var collection = new MemoryCollection();
    collection.model = Model;
    collection.add(_.shuffle(Model.values(len)));

    this.length = collection.length;

    this.reset = function() {
        collection.reset(_.shuffle(Model.values(len)));
    }

    this.reset();

    this.lift = function(where) { // this will need to call on the collection

        if(faceupCard === where) return false;

        var modelWhere = collection.at(where);
        var modelFaceup = collection.at(faceupCard);

        if(modelWhere.get('status') !== 'facedown') return false;

        if(typeof modelFaceup !== 'object') { // if no current faceup card, make the modelWhere the modelFaceup card
            faceupCard = where;
            modelWhere.set('status', 'faceup');
        } else { // if there is a faceup...
            if(matchCards(modelWhere, modelFaceup)) { // run the cardset match function
                modelWhere.set('status', 'matched');
                modelFaceup.set('status', 'matched');

                $(document).trigger("removeCard", {"where": where, "faceupCard": faceupCard});
            } else { // if cards don't match
                modelFaceup.set('status', 'facedown');

                $(document).trigger("hideCard", {"where": where, "faceupCard": faceupCard})
            }
            faceupCard = false;
        }
        // game over.. if all models have the status of 'matched', then call the gui.gameReveal
        if(collection.where({status:'matched'}).length === this.length) {
            $(document).trigger("gameOver");
        }
        var faceVal = displayCard(modelWhere);
        $(document).trigger("showCard", {"where": where, "faceVal": faceVal});

        return faceVal;  
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


