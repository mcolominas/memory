var cardFlipped = [];
var block = false;
var intentos = 0;
var maxCards = 0;
var nombre="";

function inicializar() {
	nombre = getName();
	addEventClickListener();
	setIntentos();
	addEventSubmit();
}
function addEventSubmit(){
	document.getElementById("formPuntuacion").addEventListener("submit", function myFunction() {
	    document.getElementById('inputPuntuacion').value = "";
		document.getElementById('inputNombre').value = "";
	});
}
function addEventClickListener(){
	var cards = document.querySelectorAll(".card");
	maxCards = cards.length;
	for ( var i  = 0, len = cards.length; i < len; i++ ) {
		clickListener(cards[i]);
	}

	function clickListener(card) {
		card.addEventListener( "click", function() {
			var c = this.classList;
			
			if(c.contains("flipped") == false && cardFlipped.length < 2){
				cardFlipped.push(this);
				c.add("flipped");
			}
			if(cardFlipped.length == 2 && !block){
				block = true;
				intentos ++;
				var numCard = -1;
				var cardRepe = cardFlipped[0].getAttribute("carta") == cardFlipped[1].getAttribute("carta");

				if(cardRepe){
					for ( var i  = 0, len = cardFlipped.length; i < len; i++ ) {
						cardFlipped[i].removeEventListener("click", function(){});
					}
					maxCards -= 2;
					desbloquear();
				}else{
					setTimeout(function(){
						for ( var i  = 0, len = cardFlipped.length; i < len; i++ ) {
							cardFlipped[i].classList.remove("flipped");
						}
						setTimeout(function(){
							desbloquear();
						}, 350); //Tiempo ha esperar para poder seleccionar mas cartas despues de mostrar las cartas
					}, 1400); //Tiempo para mostrar las cartas
				}

				function desbloquear(){
					cardFlipped = [];
					block = false;
					setIntentos();
					if(maxCards <= 0)
						finJuego();
				}
			}
		});
	}
}
function setIntentos(){
	document.getElementById("intentos").innerHTML = intentos;
}
function finJuego(){
	alert("Enhorabuena " + nombre + ", has finalizado el juego con " + intentos + " intentos.\n\nVisita el ranking para saber en que puesto has quedado.");
	document.getElementById('inputPuntuacion').value = intentos;
	document.getElementById('inputNombre').value = nombre;
	document.getElementById('sendPuntuacion').form.submit();
}
function getName(){
	return document.getElementById('inputNombre').value;
}