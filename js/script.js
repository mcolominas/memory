var cardsFlipped = []; //Array donde almacena las cartas que se han volteado hacia arriba
var block = false; //Variable para evitar que se pueda girar las cartas
var intentos = 0; //Numero de intentos que lleva el usuario
var cardsDown = 0; //Numero de cargas que estan boca abajo
var nombre=""; //Nombre del jugador

//Metodo que se llama al cargar el body del html
function inicializar() {
	nombre = getName();
	addEventClickListener();
	setIntentos();
	addEventSubmit();
}

//Agregar el evento submit al formulario oculto para si el jugador presiona el boton limpiar los datos.
function addEventSubmit(){
	document.getElementById("formPuntuacion").addEventListener("submit", function myFunction() {
	    document.getElementById('inputPuntuacion').value = "";
		document.getElementById('inputNombre').value = "";
	});
}

//Agregar el evento click a las cartas y programar su funcionamiento
function addEventClickListener(){
	//Obtener todas las cartas
	var cards = document.querySelectorAll(".card");
	cardsDown = cards.length;
	for ( var i  = 0, len = cards.length; i < len; i++ ) {
		clickListener(cards[i]);
	}

	//Metodo que calcula que hacer cuando se clica una carta
	function clickListener(card) {
		card.addEventListener( "click", function() {
			var c = this.classList;
			
			//Si la carta esta boca abajo
			if(c.contains("flipped") == false && cardsFlipped.length < 2){
				cardsFlipped.push(this);
				c.add("flipped");
			}

			//Cuando las 2 cartas estan boca arriba
			if(cardsFlipped.length == 2 && !block){
				block = true;
				intentos ++;
				var cardRepe = cardsFlipped[0].getAttribute("carta") == cardsFlipped[1].getAttribute("carta");

				//Si las cartas son iguales
				if(cardRepe){
					//Quitarle el evento click
					for ( var i  = 0, len = cardsFlipped.length; i < len; i++ ) {
						cardsFlipped[i].removeEventListener("click", function(){});
					}
					cardsDown -= 2;
					desbloquear();
					if(cardsDown <= 0)
						finJuego();
				//Si las cartas no son iguales
				}else{
					//Esperar X segundos y voltearla
					setTimeout(function(){
						for ( var i  = 0, len = cardsFlipped.length; i < len; i++ ) {
							cardsFlipped[i].classList.remove("flipped");
						}
						setTimeout(function(){
							desbloquear();
						}, 350); //Tiempo ha esperar para poder seleccionar mas cartas despues de mostrar las cartas
					}, 1400); //Tiempo que se muestan las cartas
				}

				//Metodo para desbloquear, limpiar variables y actualizar los intentos
				function desbloquear(){
					cardsFlipped = [];
					block = false;
					setIntentos();
				}
			}
		});
	}
}

//Metodo para actualizar los intentos que se muestan en la web
function setIntentos(){
	document.getElementById("intentos").innerHTML = intentos;
}

//Metodo que se llama cuando se finaliza el juego 
function finJuego(){
	alert("Enhorabuena " + nombre + ", has finalizado el juego con " + intentos + " intentos.\n\nVisita el ranking para saber en que puesto has quedado.");
	document.getElementById('inputPuntuacion').value = intentos;
	document.getElementById('inputNombre').value = nombre;
	document.getElementById('sendPuntuacion').form.submit();
}

//Metodo para obtener el nombre del jugador
function getName(){
	return document.getElementById('inputNombre').value;
}