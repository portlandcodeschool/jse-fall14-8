// UNFINISHED_TEMPLATE // delete me
//giving a reference from child to parent, and parent to child allows the flow of data both up and down.

var MemoryGUI = (function() { // begin IIFE




var CardView = Backbone.View.extend({//this view is responsible for controlling each card

    events:{'click' : 'gameLift'},
    //...
    initialize: function(opts) {
        
        this.$el.appendTo('#memorygrid');

        this.id = opts.id;

        this.className = opts.className;
        
        // liftCard(this.el)

    },

    gameLift: function(){
        
        game.lift(this.id);
    },


    show: function(what) {

        this.$el.addClass('faceup').removeClass('facedown').html('<span>'+what+'</span>');
      
    },
    remove: function() {

        this.$el.addClass('matched').removeClass('faceup');
    
    },
    hide: function() {
        
        this.$el.addClass('facedown').removeClass('faceup').html('');

    },
    reset: function() {
        
        this.$el.addClass('facedown').removeClass('faceup matched').html('');
    }
});

    




var  GridView = Backbone.View.extend({//this view renders all the cards
    
    el:'#memorygrid',

   initialize: function(opts) {
       
       // grid's subviews

        this.cards = [];

        for(var i = 0; i < opts.game.length; i++){
            
            var cardObj={
            
                id: i + '',
                
                className:'card facedown',
            };
        
        this.cards.push(new CardView(cardObj));
        }
    
        this.$el.appendTo('memorygame');
    },    
});


    

var MainView = Backbone.View.extend({
 //renders the whole game board, all pieces
    
    el:'#memorygame',
    
    events: {
        'click #resetBtn': 'resetAll',
    
    },
    //...
    initialize: function(opts) {
        
        this.gridview = new GridView(opts);

        var $resetBttn = $('<input/>').attr({ type: 'button', id:'resetBtn', name:'resetBttn', value:'reset'});

        $("#memorygame").prepend($resetBttn)

    },
    
    resetAll: function() {//perhaps the reset button
        
        game.reset();
        
        var cardRst = this.gridview.cards;

        window.setTimeout(function(){

            cardRst.forEach(function(key){
                
                key.reset();

            });

        }, 700);


        
    }

});





function GUI(game) { //ctor
    if (arguments.length===3) //make back-compatible w. HW7
        
        game = {
        
            length:arguments[0], 
        
            lift:arguments[1], 
        
            reset:arguments[2]
        
        };
    
    this.game = game;

    var self = this;

    //...

    this.mainview = new MainView({game:game});

    $(document).on('showCard', function (event,data){
        
        self.show(data.here, data.faceVal);

    });

    this.show = function(where,what) {
        
        self.mainview.gridview.cards[where].show(what);
    
    };
  
    $(document).on('hideCard', function (event,data){
        
        self.hideSoon([data.held, data.here]);

    });

    this.hideSoon = function(whereArr) {
        
        var cardsV = this.mainview.gridview.cards;

        window.setTimeout(function(){

            whereArr.forEach(function(key){
                
                cardsV[key].hide();    

            });

        }, 700);
    
    };

    $(document).on('removeCard', function (event,data){
        
        self.removeSoon([data.held, data.here]);

    });
  
    this.removeSoon = function(whereArr) {
        
        var cardsV = this.mainview.gridview.cards;

        window.setTimeout(function(){

            whereArr.forEach(function(key){
                
                cardsV[key].remove();    

            });

        }, 700);
    };
}

return GUI;

})(); //end GUI IIFE

// var myGame = new MemoryGUI();






