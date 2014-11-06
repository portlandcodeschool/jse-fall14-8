var MemoryGUI = (function () {
	function GUI(len,clickFn,resetGameFn) {

		function clicker(card) {
			card.addEventListener("click", function(){
				clickFn(card.id);
			});		
		}


		
		function show(where,value) {
			//get thingclicked
	  		var thingClicked = document.getElementById(where);
	  		thingClicked.classList.add('show');	 
	  	
			if(thingClicked.childNodes.length < 2 ){
	  		//create inner div	add id and classes
	  		var innerText = document.createElement('div');
  			innerText.id = 'back'+where ;
  			innerText.classList.add('back', 'face')
  		
  			//add inner div to thingclicked
  			thingClicked.appendChild(innerText);
  			
  			//create value-span and add the value-text
  			var valueText = document.createElement('span');
  			innerText.appendChild(valueText);
	  		
	  		//for the alphabet version
	  		//var t = document.createTextNode(value);
	  		//valueText.appendChild(t);

	  		//for other version
	  		 valueText.innerHTML =  '<i class="fa  ' +value+ '"></i>'
	  		//change x and check to see if elm is in dom
	  		var y = document.getElementById(innerText.id);
	  		var x = thingClicked.childNodes.length;
	  	
	  	}	
		}

		function hideSoon(whereArr) {
			window.setTimeout(function() {
	   		for(var key in whereArr){
					var hideMatched = document.getElementById(whereArr[key]);
					hideMatched.classList.remove('show');
				}
			}, 500);
		}
		

		function removeSoon(whereArr) {
			for(var key in whereArr){
				var hideMatched = document.getElementById(whereArr[key]);
				hideMatched.classList.add('match');
			}
		}

		//add reset btn stuff
	

		$( "#reset" ).html('reset');
		$( "#reset" ).on( "click", function() {
			$('.card').removeClass('show match');
			$('.card .back').remove();
			$('.winner').remove();
		  resetGameFn();
		});
				
			

			//comment out the floor squared Math 
			//var lenSquared = Math.floor(Math.sqrt(len));
			var board = document.getElementById('memorygame');
			var totalDiv = 0;					
			for(var col = 0; col < len; col++){ // use the array length to loop not the width or hight squared
			if(totalDiv < len){
				var cardWrap = document.createElement('div');
				var colDiv = document.createElement('div');
				var cardFace = document.createElement('div');
				//Call ClickFN 
				clicker(colDiv);
				board.appendChild(cardWrap);
				cardWrap.appendChild(colDiv);
				colDiv.appendChild(cardFace);
				cardWrap.classList.add('cardWrap');
				colDiv.classList.add('card');

				colDiv.id = totalDiv++;
				cardFace.classList.add('front' , 'face');

				var isOdd = (col%2);
				cardWrap.classList.add(isOdd ? "odd" : "even");
				
				}
			}

		
		
		this.clicker = clicker;
		this.clicker = clicker;
		this.show = show;
		this.hideSoon = hideSoon;
		this.removeSoon = removeSoon;

	}

	return GUI;

})();

