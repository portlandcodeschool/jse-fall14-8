var MemoryGame = (function() {

	var matchedArr = [];

	var faceupArr = [];

	function Memory(GuiCtor,cardset,gameoverFn) {

		var board = cardset.values.slice();

		var matchCards = cardset.match;

		var displayCard = cardset.display;

		var endgameFn = gameoverFn;


		// ==== Reset Cards Array =====
		// ============================				
		this.reset = function() {
			board = cardset.values.slice();
			// RESHUFFLE!
			var m = board.length, t, i;
			while (m) {
			  i = Math.floor(Math.random() * m--);
			  t = board[m];
			  board[m] = board[i];
			  board[i] = t;
			}
			faceupArr[0] = undefined;
			matchedArr.splice(0);
			console.log("The board has been reset.");
		};


		// ==== Checking Position & Value of the first lifted card ====
		// ============================================================
		this.faceupWhere = function() {
			return board.indexOf(faceupArr[0]);
		};

		this.faceupValue = function() {
			if (displayCard) { // if displayCard is given
				return displayCard(faceupArr[0]);
			} else {
				return faceupArr[0];
			}
		};


		// ==== Check Board for remaining positions of cards ====
		// ======================================================
		this.remaining = function() {
			return Object.keys(board);
		};


		// ==== Lifting a card (position) from the array ====
		// ====  ...and sending it back to the GUI Ctor  ====
		// ==================================================
		this.lift = function(where) {

			if (matchedArr.indexOf(board[where]) === -1) { // if 'where' is NOT already in matchedArr...

				if (faceupArr[0] === undefined) { // if no other card has been lifted
					faceupArr = board.slice(where,where+1); // place the first lifted card into a seperate array for comparison

					if (displayCard === null) { // if no displayCard is given
						gui.show(where, faceupArr[0]); // calling GUI show method on FIRST card
						return board[where]; // return lifted card
					} else {
						gui.show(where, faceupArr[0]); 
						return displayCard(board[where]);
					}

				} else if (board[where] === faceupArr[0]) {
					console.log("You already clicked me")
					return false; // if element (where) has already been lifted

				} else if (matchCards(faceupArr[0],board[where])) { // if cards match

					if (displayCard === null) {
						gui.show(where, board[where]); // calling GUI show method on SECOND card
						gui.removeSoon([where, board.indexOf(faceupArr[0])]); // returning an array of 2 numbers (which will be the td.ids) to GUI removeSoon method
						// console.log(board[where]+".. "+"You found a match!");
					} else {
						// console.log(displayCard(board[where])+".. "+"You found a match!");
						gui.show(where, board[where]);
						gui.removeSoon([where, board.indexOf(faceupArr[0])]);
					}
					matchedArr.push(board[where], faceupArr[0]); // push matched cards into matchedArr
					delete board[where]; // delete (set as undefined) second lifted card from 'board'
					delete board[board.indexOf(faceupArr[0])]; // delete (set as undefined) first lifted card from 'board'
					faceupArr[0] = undefined;

					if (board.length === matchedArr.length) { // if board is empty

						if (endgameFn !== undefined) { // if endgameFn is given
							gui.gameReveal(); // calls GUI gameReveal method and places all cards face up
							return endgameFn();
						} else {
							gui.gameReveal();
							console.log("Game Over")
						}
					}

				} else { // if two cards DO NOT match..
					// console.log(board[where] + " does not match " +faceupArr[0]+ ".. Try again.");
					
					gui.show(where, board[where]); // calling GUI show method on SECOND card
					gui.hideSoon([where, board.indexOf(faceupArr[0])]); // returning an array of 2 numbers (which will be the td.ids) to GUI hideSoon method
					faceupArr[0] = undefined;
				}
			}	
		};

		var gui = new GuiCtor(board.length,this.lift,this.reset);

		this.reset();
	}

	return Memory;
})();


var cards = null, gui = null, game = null; //global for debugging
$(function() {
    cards = new MemoryCards();
    game = new MemoryGame(MemoryGUI, cards);
	//game makes gui
});









