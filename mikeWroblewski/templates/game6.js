var MemoryGame = (function() { //begin game IIFE

var MemoryCollection = Backbone.Collection.extend({});//<--NO MODEL HERE

// Ctor:
function MemoryGame(Model,len) { //<-- CHANGED
    
    var matchCards = Model.match;
    var displayCard = Model.display;

    var faceupCard = false; // lifted card, if any

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
        // ==== finding card model with view ID ====
        var modelWhere = collection.at(where);
        var modelFaceup = collection.at(faceupCard);

        if(modelWhere.get('status') !== 'facedown') return false;

        var faceVal = displayCard(modelWhere);
        // ==== creating details object for lifted cards that... ====
        // ====== ...can be sent to event handler/view methods ======
        var detailsWhere = {where:where, faceVal:faceVal};
        var detailsFC = {where:faceupCard};

        modelWhere.set({status:'faceup'},detailsWhere);

        if(typeof modelFaceup !== 'object') { // if no current faceup card, make the modelWhere the modelFaceup card
            faceupCard = where;
        } else { // if there is a faceup...
            if(matchCards(modelWhere, modelFaceup)) { // run the cardset match function
                modelWhere.set({status:'matched'},detailsWhere);
                modelFaceup.set({status:'matched'},detailsFC);
            } else { // if cards don't match
                modelWhere.set({status:'facedown'},detailsWhere);
                modelFaceup.set({status:'facedown'},detailsFC);
            }
            faceupCard = false;
        }
        if(collection.where({status:'matched'}).length === this.length) {
            collection.forEach(function(model, index) {
                model.set({status:'gameover'});
            });
        }

        return faceVal;  
    };

    this.coll = collection;
    
}; // end ctor

return MemoryGame;
})(); //end game IIFE



var gui = null, game = null;  //global for debugging
$(function() {
    game = new MemoryGame(TestCardModel,12); //<-- CHANGED
	gui = new MemoryGUI(game); //make a gui
    game.gui = gui; //attach gui to game/collection
});


