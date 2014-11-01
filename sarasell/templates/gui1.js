var MemoryGUI = (function() { // begin IIFE

var CardView = Backbone.View.extend({
    events: {},
    tagName:'td',
    initialize: function(opts) {
        this.n = opts.n;
        this.$el.appendTo(opts.$row);
    },
    show: function(what) {
    },
    remove: function(where) {
        var cell = findCell(where);
        cell.classList.add('missing')
    },
    hide: function(where) {
        var cell = findCell(where);
        cell.classList.remove('faceup');
        cell.removeAttribute('value');
    },
    reset: function() {
        slots = values.slice();
        length = values.length;
        there = false;
        shuffle(slots);
        }
});

var  GridView = Backbone.View.extend({
    el:'#memorygrid',
    initialize: function(opts) {
        this.cards = []; // grid's subviews
        for (var i=0; values.length; ++i) {
            var $row = $('<tr>').appendTo(this.$el)
        }
            this.cards.push(new CardView(opts));
            }
        }
        this.$el.appendTo('body');
    },
    render: function(){
    }
    
});

var MainView = Backbone.View.extend({
    el:'#memorygame',
    events: {},
    //...
    initialize: function(opts) {
        this.gridview = new GridView(opts);
        //...
    },
    
    resetAll: function() {
        this.game.resetGUI();
        this.reset(); // or something
    }
});

function GUI(game) { //ctor
    if (arguments.length===3) //make back-compatible w. HW7
        game = {length:arguments[0], lift:arguments[1], resetGUI:arguments[2]};
    this.game = game;

    //...    
    this.mainview = new MainView({game:game});

    var resetGUI = function() {
        for (var where=0; where<len; ++where {
            resetCell(findCell(where));
        }
    }
    this.show = function(where,what) {
        var cell = findCell(where);
            cell.setAttribute('value',what);
            cell.classList.add('faceup');
        }
    }
    this.hideSoon = function(locs) {
        var newCell = locs.get('cell');
        var oldCell = locs.previous('cell');
            window.setTimeout(function() {
                newCell.forEach(hide);
            }, 1000);
        }
    }
    this.removeSoon = function(locs) {
        var newCell = locs.get('cell');
        var oldCell = locs.previous('cell');
            window.setTimeout(function() {
                newCell.forEach(remove);
            }, 1000);
        }
    }
    function findCell(where) {
        return document.getElementById(makeID(where));
    }
    function resetCell(cell) {
        cell.classList.remove('faceup');
        cell.classList.remove('missing');
    }

}

return GUI;

})(); //end GUI IIFE
