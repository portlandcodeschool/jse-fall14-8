var MemoryGUI = (function() { // begin IIFE

    var CardView = Backbone.View.extend({
        events: {'click': 'gameLift'},

        initialize: function(opts) { // this attaches each card and places it inside the #memorygrid div
            this.id = opts.id;
            this.className = opts.className;
            this.$el.appendTo('#memorygrid');
        },

        gameLift: function () {
            game.lift(this.id);
        },

        // these methods only make change to appearance of cards
        show: function(value) {
            this.$el.addClass('faceup').html('<span>'+value+'</span>');
        },

        remove: function() {
                this.$el.addClass('matched');
        },

        hide: function() {
                this.$el.removeClass('faceup').html('');
        },

        reset: function() {
                $('.facedown').removeClass('faceup matched');
                $('.facedown span').remove();
        }
    });

    var  GridView = Backbone.View.extend({
        el: '#memorygrid',
        initialize: function(opts) {
            
            this.cards = []; // grid's subviews

            var totalCard = 0

            for (var i = 0; i<opts.game.length; ++i) {
                var cardObj = {
                    id: totalCard++,
                    className: 'facedown'
                }
                this.cards.push(new CardView(cardObj));
            }
            this.$el.appendTo('#memorygame');
        }
        // ??render: function(...) {}??
    });

    var MainView = Backbone.View.extend({ // title/heading, resetting..
        el:'#memorygame',
        events: {'click #resetbutton': 'resetAll'},
        
        initialize: function(opts) {

            this.game = opts.game;

            $('<button id=resetbutton>Reset</button>').appendTo(this.$el);

            this.gridview = new GridView(opts);
        },

        resetAll: function() {

            this.game.reset();

            this.gridview.cards.forEach(function(cardview) {
                cardview.reset();
            })
        }
    });


    function GUI(game) { //ctor
        if (arguments.length===3) //make back-compatible w. HW7
            game = {length:arguments[0], lift:arguments[1], reset:arguments[2]};
        this.game = game;

        this.mainview = new MainView({game:game});

        var cardSet = this.mainview.gridview.cards;

        this.show = function(where,value) { // this communicates with game and card views

            // where will find the card.. and value will be the arg for card.show
            cardSet[where].show(value);

        };

        this.hideSoon = function(twoCardArr) {

            window.setTimeout(function() {
                twoCardArr.forEach(function(key) {
                    cardSet[key].hide();
                })
            }, 1000);
        };

        this.removeSoon = function(twoCardArr) {

            window.setTimeout(function() {
                twoCardArr.forEach(function(key) {
                    cardSet[key].remove();
                })
            }, 1000);
        };

        this.gameReveal = function() {

            window.setTimeout(function(){

                $('.facedown').removeClass('matched');

            }, 1020);
        };
    }

    return GUI;

})(); //end GUI IIFE





