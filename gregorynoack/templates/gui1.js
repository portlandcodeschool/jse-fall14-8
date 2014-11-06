
var MemoryGUI = (function() { // begin IIFE

var CardView = Backbone.View.extend({
   
    events: {
    'click' : 'lift'
    },
//
    
    initialize: function(opts) {
        this.id = opts.id;
        this.className = opts.className;
        this.$el.append($('<div class="card">'))
        this.$el.children('div').html('<span class="front face"></span>')
        this.$el.appendTo('#memorygrid');
    },
    show: function(value) {
        //this.$el.parent().addClass('show');
       this.$el.children('div').toggleClass('show');
       this.$el.children('div').append('<span class="back face">' + value + '</span>')
        //add faceup here and card value
    },
    matchFn: function() {
        var x = this.$el.children();
        this.$el.children('div').toggleClass('match');
    },
    hide: function() {   
            var x = this.$el.children();
            this.$el.children('div').toggleClass('show');
            window.setTimeout(function() {
                 x.children().eq(1).remove();
            }, 500);
    },
    reset: function() {
            //this.$el.removeClass('show match');
            this.$el.children().removeClass('show');   
            this.$el.children().removeClass('match');       
    },
    lift: function() {
        game.lift(this.id);
    }
});

var  GridView = Backbone.View.extend({
    el:'#memorygrid',
    initialize: function(opts) {
            this.cards = []; // grid's subviews
            var totalCards = 0;
            for(var i = 0; i < opts.game.length; ++i){
                cardOpts = {
                id: totalCards++,
                className:'cardwrap'
            }
            this.cards.push(new CardView(cardOpts));
        }
        this.$el.appendTo('#memorygame')


    },

    
});

var MainView = Backbone.View.extend({
    el:'#memorygame',
    events: {
        'click #reset' : 'resetAll'
    },

    //...
    initialize: function(opts) {
        this.gridview = new GridView(opts);
        this.$el.prepend('<button id="reset">reset</button>')
        this.game = opts.game;
              console.log(this.game);
    },
    
    resetAll: function() {
        var cardSet = this.gridview.cards;
        //this.game.reset();
        this.game.reset();
        console.log(cardSet);
        
        for(var i = 0; i < cardSet.length; i++){
            cardSet[i].reset();
        }
    }
});

function GUI(argGame) { //ctor
    if (arguments.length===3) //make back-compatible w. HW7
        argGame = {length:arguments[0], lift:arguments[1], reset:arguments[2]};
    this.game = argGame;

    this.mainview = new MainView({game:argGame});

    var cardSet = this.mainview.gridview.cards;

    this.show = function(where,value) {
        //gets card where and value 
        cardSet[where].show(value);
    }


    this.hideSoon = function(twoCards) {
        window.setTimeout(function() {
            twoCards.forEach(function(key){
               cardSet[key].hide();
            });
    }, 500);
}
    //...
    this.removeSoon = function(twoCards) {
    window.setTimeout(function() {
            twoCards.forEach(function(key){
               cardSet[key].matchFn();
            });
    }, 500);
    }
}

return GUI;

})(); //end GUI IIFE
