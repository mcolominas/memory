var count = 0;
var cardFliped = [];
var block = false;
var intentos = 0;
var maxCards = 0;

function inicializar() {
	addEventClickListener();
	setIntentos();
}

function addEventClickListener(){
	var cards = document.querySelectorAll(".card");
	maxCards = cards.length;
	for ( var i  = 0, len = cards.length; i < len; i++ ) {
		var card = cards[i];
		clickListener(card);
	}

	function clickListener(card) {
		card.addEventListener( "click", function() {
			var c = this.classList;
			
			if(c.contains("flipped") == false && count < 2){
				cardFliped.push(this);
				c.add("flipped");
				count ++;
			}
			if(count >= 2 && !block){
				block = true;
				intentos ++;
				setIntentos();
				setTimeout(function(){
					var numCard = -1;
					var cardRepe = true;
					for ( var i  = 0, len = cardFliped.length; i < len; i++ ) {
						if(numCard == -1)
							numCard = cardFliped[i].getAttribute("carta");
						else
							cardRepe = cardFliped[i].getAttribute("carta") == numCard;
					}

					if(cardRepe){
						for ( var i  = 0, len = cardFliped.length; i < len; i++ ) {
							cardFliped[i].removeEventListener("click", function(){});
						}
						maxCards -= 2;
					}else{
						for ( var i  = 0, len = cardFliped.length; i < len; i++ ) {
							cardFliped[i].classList.remove("flipped");
						}
					}

					setTimeout(function(){
						cardFliped = [];
						count = 0;
						block = false;
						if(maxCards <= 0)
							finJuego();
					}, 30);
				}, 1350);
			}
		});
	}
}
function setIntentos(){
	document.getElementById("intentos").innerHTML = intentos;
}
function finJuego(){
	document.getElementById('inputPuntuacion').value = intentos;
	document.getElementById('sendPuntuacion').form.submit();
}