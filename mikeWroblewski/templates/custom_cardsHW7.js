var MemoryCards = (function(){
	
	var cardNum = 	["1",
					 "2",
					 "3",
					 "4",
					 "5",
					 "6",
					 "7",
					 "8",
					 "9",
					 "10"];

	var cardRomNu =	["I",
					 "II",
					 "III",
					 "IV",
					 "V",
					 "VI",
					 "VII",
					 "VIII",
					 "IX",
					 "X"];

	function MemoryCardset() {

		var bothArr = cardNum.concat(cardRomNu);

		this.values = bothArr;

		this.match = function(a,b) {

			if (bothArr.indexOf(a)<10 && bothArr.indexOf(b)>9) {
				return cardNum.indexOf(a) === cardRomNu.indexOf(b);
			}

			if (bothArr.indexOf(b)<10 && bothArr.indexOf(a)>9) {
				return cardNum.indexOf(b) === cardRomNu.indexOf(a);
			}
		}

		this.display = function(val) {
			return val;
		}
	}

	return MemoryCardset;
})();
