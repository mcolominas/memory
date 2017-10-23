var cardsFlipped = []; //Array donde almacena las cartas que se han volteado hacia arriba
var block = false; //Variable para evitar que se pueda girar las cartas
var haciendoMovimientos = false;//Variable que indica si el usuario espa eligiendo cartas
var intentos = 0; //Numero de intentos que lleva el usuario
var cardsDown = 0; //Numero de cargas que estan boca abajo
var nombre=""; //Nombre del jugador

var bonosDisponibles;
var maxBonos = 3;

var soundCorrect = "sounds/correct.mp3"; 
var soundIncorrect = "sounds/incorrect.mp3"; 
var soundFlip = "sounds/flip.mp3"; 

//Metodo que se llama al cargar el body del html
function inicializar() {
	nombre = getName();
	addEventClickListener();
	finJuego()
	getIntentos();
	getBonos();
	mostrarIntentos();
	mostrarBonos();
	addEventSubmit();
	addEventClickBono();
	chronoStart();
	autoGuardarPartida();
}

//Agregar el evento click al boton de bono y programar su funcionamiento
function addEventClickBono(){
	document.getElementById("btnBono").addEventListener( "click", function() {
		if(bonosDisponibles > 0 && !block){
			block = true;
			haciendoMovimientos = true;
			bonosDisponibles --;
			intentos += 5;
			
			mostrarBonos();
			mostrarIntentos();
			
			var cards = document.querySelectorAll(".card");
			
			playSound(soundFlip);
			
			//Mostrar todas las cartas y almacenarlas en cardsFlipped
			for ( var i  = 0, len = cards.length; i < len; i++ ) {
				if(cards[i].classList.contains("flipped") == false){
					cardsFlipped.push(cards[i]);
					cards[i].classList.add("flipping");
				}
			}
			
			//Ocultar todas las cartas que se encuentren en cardsFlipped
			setTimeout(function(){
				playSound(soundFlip);
				
				for ( var i  = 0, len = cardsFlipped.length; i < len; i++ ) {
					cardsFlipped[i].classList.remove("flipping");
				}
				setTimeout(desbloquear, 500); //Tiempo para poder seleccionar las cartas una vez se han volteado
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
	document.getElementById("formGuardarPartida").addEventListener("submit", function myFunction() {
	    document.getElementById('inputMilisegundos').value = "";
		document.getElementById('inputCartas').value = "";
		document.getElementById('inputIntentos').value = "";
		document.getElementById('inputBonos').value = "";
	});
}

//Agregar el evento click a las cartas y programar su funcionamiento
function addEventClickListener(){
	//Obtener todas las cartas
	var cards = document.querySelectorAll(".card");
	cardsDown = 0;
	for ( var i  = 0, len = cards.length; i < len; i++ ) {
		if(!cards[i].classList.contains("flipped")){
			cards[i].addEventListener( "click", funcionalidadJuego);
			cardsDown ++;
		}
	}
}

//Metodo que calcula que hacer cuando se clica una carta
function funcionalidadJuego(){
	var c = this.classList;
	if(!block){
		//Si la carta esta boca abajo
		if(!c.contains("flipped") && !c.contains("flipping") && cardsFlipped.length < 2){
			//Comprobacion de evitar que se meta la misma carta en el array
			if(cardsFlipped.length == 1 && cardsFlipped[0] != this || cardsFlipped.length == 0){
				cardsFlipped.push(this);
				haciendoMovimientos = true;
			}
			c.add("flipping");
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

				//Quitarle el evento click y sustituir la clase
				for (var i = 0; i < cardsFlipped.length; i++ ) {
					cardsFlipped[i].removeEventListener("click", funcionalidadJuego);
					cardsFlipped[i].classList.remove("flipping");
					cardsFlipped[i].classList.add("flipped");
				}

				cardsDown -= 2;
				setTimeout(desbloquear, 200); //Tiempo para poder seleccionar las cartas una vez se han volteado
				finJuego();
			//Si las cartas no son iguales
			}else{
				playSound(soundIncorrect, 800);
				//Esperar X segundos y voltearla
				setTimeout(function(){
					playSound(soundFlip);
					for ( var i = 0; i < cardsFlipped.length; i++ ) {
						cardsFlipped[i].classList.remove("flipping");
					}
					setTimeout(desbloquear, 500); //Tiempo para poder seleccionar las cartas una vez se han volteado
				}, 1400); //Tiempo que se muestan las cartas
			}
		}
	}
}

//Metodo que se llama cuando se finaliza el juego 
function finJuego(){
	if(cardsDown <= 0){
		haciendoMovimientos = true;
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
}

//Reproducir sonido
function playSound(rutaSonido, delay = 0){
	setTimeout(function(){
		new Audio(rutaSonido).play();
	}, delay);
}

//Metodo para actualizar los intentos que se muestan en la web
function mostrarIntentos(){
	document.getElementById("intentos").innerHTML = intentos;
}

//Metodo para obtener los intentos guardados
function getIntentos(){
	intentos = document.getElementById("inputIntentos").value;
	if(intentos == null || intentos == "")
		intentos = 0;
	intentos = parseInt(intentos);
}

//Metodo para actualizar los bonos que se muestan en la web
function mostrarBonos(){
	document.getElementById("bonosDisponibles").innerHTML = bonosDisponibles;
}

//Metodo para obtener los bonos guardados
function getBonos(){
	bonosDisponibles = document.getElementById("inputBonos").value;
	if(bonosDisponibles == null || bonosDisponibles == "")
		bonosDisponibles = maxBonos;
	bonosDisponibles = parseInt(bonosDisponibles);
}

//Metodo para obtener el nombre del jugador
function getName(){
	return document.getElementById('inputNombre').value;
}

//Metodo para desbloquear, limpiar variables y actualizar los intentos
function desbloquear(){
	cardsFlipped = [];
	block = false;
	haciendoMovimientos = false;
	mostrarIntentos();
	setTimeout(guardarPartida, 100);
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
	var miliSeconds = document.getElementById('inputMilisegundos').value;
	if(miliSeconds == null || miliSeconds == "")
		miliSeconds = 0;

	dateStart = new Date(new Date().getTime() - miliSeconds);
	chrono();
}
//Funcion para parar el cronometro
function chronoStop(){
	clearTimeout(timerID);
	dateEnd = new Date();
}
//----------------- Fin Cronometro ------------------

function getCardsFlipped(){
	//Obtener todas las cartas
	var cards = document.querySelectorAll(".card");
	var secuenciaCartas = "";
	for ( var i  = 0, len = cards.length; i < len; i++ ) {
		cardsDown ++;
		if(cards[i].classList.contains("flipped"))
			secuenciaCartas += "1";
		else
			secuenciaCartas += "0";
	}
	return secuenciaCartas;
}

function getMilisecondsChrono(){
	return new Date(dateEnd - dateStart).getTime() + 1000;
}
function autoGuardarPartida(){
	setTimeout(guardarPartida, 5000);
}
function guardarPartida(){
	if(!block && !haciendoMovimientos){
		document.getElementById('inputMilisegundos').value = getMilisecondsChrono();
		document.getElementById('inputCartas').value = getCardsFlipped();
		document.getElementById('inputIntentos').value = intentos;
		document.getElementById('inputBonos').value = bonosDisponibles;
		document.getElementById('savePartida').form.submit();
	}
}