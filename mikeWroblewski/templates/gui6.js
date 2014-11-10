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
                $('.facedown').removeClass('faceup matched gameover');
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
        },

        gameOver: function() { // if game is over this changes all the CSS
            $('.facedown').addClass('gameover').removeClass('matched');
        }
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
        var gridSet = this.mainview.gridview;
        var self = this;

        // ===== Listen for the change in Model default (status) =====
        game.coll.on('change:status',function(model, value, details) {
            if (value === 'faceup') {
                cardSet[details.where].show(details.faceVal);
            } else if (value === 'facedown') {
                window.setTimeout(function() {
                    cardSet[details.where].hide();
                }, 1000);
            } else if (value === 'matched') {
                window.setTimeout(function() {
                    cardSet[details.where].remove();
                }, 1000);
            } else if (value === 'gameover') {
                window.setTimeout(function(){
                    gridSet.gameOver();
                }, 1020);                
            }
        });
    }

    return GUI;

})(); //end GUI IIFE





