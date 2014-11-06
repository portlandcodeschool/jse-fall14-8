

// You may use this cardset until you make your own

var MemoryCardsSymb = (function(){
	// produces pairs 'a'=='A','b'=='B',...
	//var alphabet = ' abcdefghijklmnopqrstuvwxyz';

				 var symbArry = [
				 '<i class= "fa fa-ils"></i>'
				,'<i class= "fa fa-ils"></i>'
				, '<i class= "fa fa-star-o"></i>'
				, '<i class= "fa fa-star-o</i>'
				, '<i class= "fa fa-bomb"></i>'
				, '<i class= "fa fa-bomb"></i>'
				, '<i class= "fa fa-circle-o"></i>'
				, '<i class= "fa fa-circle-o"></i>'
				, '<i class= "fa fa-arrows-alt"></i>'
				, '<i class= "fa fa-arrows-alt"></i>'
				, '<i class= "fa fa-times"></i>'
				, '<i class= "fa fa-times"></i>'
				, '<i class= "fa fa-usd"></i>'
				, '<i class= "fa fa-usd"></i>'
				, '<i class= "fa fa-bolt"></i>'
				, '<i class= "fa fa-bolt"></i>'
				, '<i class= "fa fa-bell"></i>'
				, '<i class= "fa fa-bell"></i>'
				, '<i class= "fa fa-bullseye"></i>'
				, '<i class= "fa fa-bullseye"></i>'
			];


	//var alphabet = ' abcdef';

	function MemoryCardset(numPairs) {
		// if (numPairs < 1) numPairs = 1;
		// if (!numPairs || (numPairs > 1)) numPairs =  10;
		//console.log(numPairs);

		this.values = symbArry.map(function(num) {
  		return num;
		});


		// while (numPairs) {
		// 	this.values.push(symbArry[numPairs]);
		// 	--numPairs;
		// }
		this.match = function(a,b) {
			return a == b;
		}
		// this.display could remain undefined if MemoryGame allows it to be optional,
		// but in case it's required, provide this identity function:
		this.display = function(val) {
			return val;
		}


	}
	return MemoryCardset;
})();

function winFn(){
	return $('body').prepend('<div class="winner">you win</div>');
}



