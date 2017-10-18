var cardsFlipped = []; //Array donde almacena las cartas que se han volteado hacia arriba
var block = false; //Variable para evitar que se pueda girar las cartas
var intentos = 0; //Numero de intentos que lleva el usuario
var cardsDown = 0; //Numero de cargas que estan boca abajo
var nombre=""; //Nombre del jugador

var bonosDisponibles = 3;

var soundCorrect = "sounds/correct.mp3"; 
var soundIncorrect = "sounds/incorrect.mp3"; 
var soundFlip = "sounds/flip.mp3"; 

//Metodo que se llama al cargar el body del html
function inicializar() {
	nombre = getName();
	addEventClickListener();
	setIntentos();
	setBonos();
	addEventSubmit();
	addEventClickBono();
	chronoStart();
}

//Agregar el evento click al boton de bono y programar su funcionamiento
function addEventClickBono(){
	document.getElementById("btnBono").addEventListener( "click", function() {
		if(bonosDisponibles > 0 && !block){
			block = true;
			bonosDisponibles --;
			intentos += 5;
			
			setBonos();
			setIntentos();
			
			var cards = document.querySelectorAll(".card");
			
			playSound(soundFlip);
			
			//Mostrar todas las cartas y almacenarlas en cardsFlipped
			for ( var i  = 0, len = cards.length; i < len; i++ ) {
				if(cards[i].classList.contains("flipped") == false){
					cardsFlipped.push(cards[i]);
					cards[i].classList.add("flipped");
				}
			}
			
			//Ocultar todas las cartas que se encuentren en cardsFlipped
			setTimeout(function(){
				playSound(soundFlip);
				
				for ( var i  = 0, len = cardsFlipped.length; i < len; i++ ) {
					cardsFlipped[i].classList.remove("flipped");
				}
				setTimeout(function(){
					desbloquear();
				}, 500); //Tiempo para poder seleccionar las cartas una vez se han volteado
			}, 3000); //Tiempo para que las cartas se oculten
		}
	});
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
			
			if(!block){
				//Si la carta esta boca abajo
				if(c.contains("flipped") == false && cardsFlipped.length < 2){
					cardsFlipped.push(this);
					c.add("flipped");
					playSound(soundFlip);
				}

				//Cuando las 2 cartas estan boca arriba
				if(cardsFlipped.length == 2){
					block = true;
					intentos ++;
					var cardRepe = cardsFlipped[0].getAttribute("carta") == cardsFlipped[1].getAttribute("carta");

					//Si las cartas son iguales
					if(cardRepe){
						playSound(soundCorrect);
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
						playSound(soundIncorrect, 800);
						//Esperar X segundos y voltearla
						setTimeout(function(){
							playSound(soundFlip);
							for ( var i  = 0, len = cardsFlipped.length; i < len; i++ ) {
								cardsFlipped[i].classList.remove("flipped");
							}
							setTimeout(function(){
								desbloquear();
							}, 350); //Tiempo ha esperar para poder seleccionar mas cartas despues de mostrar las cartas
						}, 1400); //Tiempo que se muestan las cartas
					}
				}
			}
		});
	}
}

//Metodo que se llama cuando se finaliza el juego 
function finJuego(){
	chronoStop();
	
	//Esperar X tiempo para poder reproducir el sonido
	setTimeout(function(){
		alert("Enhorabuena " + nombre + ", has finalizado el juego con:\n"+
		"      ~ Intentos: " + intentos + "\n"+
		"      ~ Tiempo: " + getTime() +
		"\n\nVisita el ranking para saber en que puesto has quedado.");
		
		document.getElementById('inputPuntuacion').value = intentos;
		document.getElementById('inputNombre').value = nombre;
		document.getElementById('sendPuntuacion').form.submit();
	}, 800);
	
}

//Reproducir sonido
function playSound(rutaSonido, delay = 0){
	setTimeout(function(){
		new Audio(rutaSonido).play();
	}, delay);
}

//Metodo para actualizar los intentos que se muestan en la web
function setIntentos(){
	document.getElementById("intentos").innerHTML = intentos;
}

//Metodo para actualizar los bonos que se muestan en la web
function setBonos(){
	document.getElementById("bonosDisponibles").innerHTML = bonosDisponibles;
}

//Metodo para obtener el nombre del jugador
function getName(){
	return document.getElementById('inputNombre').value;
}

//Metodo para desbloquear, limpiar variables y actualizar los intentos
function desbloquear(){
	cardsFlipped = [];
	block = false;
	setIntentos();
}

//----------------- Inicio Cronometro ------------------
var dateStart = 0;
var dateEnd = 0;
var timerID = 0;

//Funcion que actualiza el cronometro
function chrono(){
	dateEnd = new Date();
	document.getElementById("chronotime").innerHTML = getTime();
	timerID = setTimeout("chrono()", 1000); //Actualizar el cronometro cada segundo
}

//Funcion que calcula el tiempo del cronometro
function getTime(){
	var dateDiff = new Date(dateEnd - dateStart);
	
	var sec = dateDiff.getSeconds();
	var min = dateDiff.getMinutes();
	var hr = dateDiff.getHours()-1;
	
	if(hr < 10) hr = "0" + hr;
	if(min < 10) min = "0" + min;
	if(sec < 10) sec = "0" + sec;
	
	return hr + ":" + min + ":" + sec;
}
//Funcion para iniciar el cronometro
function chronoStart(){
	dateStart = new Date();
	chrono();
}
//Funcion para parar el cronometro
function chronoStop(){
	clearTimeout(timerID);
	dateEnd = new Date();
}
//----------------- Fin Cronometro ------------------
