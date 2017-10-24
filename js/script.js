//------ Inicio variables control de tiempo

var tiempoMostrarBono = 3000 //Controla cuantos milisegundos se muestran los bonos
var tiempoBloquearBono = 500 //Controla cuantos milisegundos quedan bloqueadas las cartas despues de mostrar los bonos

var tiempoMostrarImpares = 1500 //Controla cuantos milisegundos se muestran las cartas impares
var tiempoBloquearCartasPares = 400 //Controla cuantos milisegundos quedan bloqueadas las cartas cuando encuentra pares
var tiempoBloquearCartasImpares = 550 //Controla cuantos milisegundos quedan bloqueadas las cartas despues de mostrar las cartas impares

var tiempoDelayFinJuego = 800 //Cuantos milisegundos se muestra el tablero antes de realizar el metodo finJuego

var tiempoDelaySave = 100 //Delay en milisegundos para guardar la partida despues de hacer un movimiento y no estar realizando ninguna accion
var tiempoAutosave = 15000 //Cuantos milisegundos pasan para guardar la partida si no se hace ninguna accion

var tiempoUpdateChrono = 20 //Cada cuantos milisegundos se actualiza el cronometro
var activarMilisegundos = false;

//------ Fin variables control de tiempo

var cardsFlipped = []; //Array donde almacena las cartas que se han volteado hacia arriba
var block = false; //Variable para evitar que se pueda girar las cartas
var haciendoMovimientos = false; //Variable que indica si el usuario esta eligiendo cartas
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
	finJuego();
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
			bonosDisponibles --;
			intentos += 5;
			
			mostrarBonos();
			mostrarIntentos();
			
			var cards = getAllCards();
			
			playSound(soundFlip);
			
			//Mostrar todas las cartas y almacenarlas en cardsFlipped
			for ( var i  = 0, len = cards.length; i < len; i++ ) {
				if(!containFlipped(cards[i])){
					cardsFlipped.push(cards[i]);
					mostrarCarta(cards[i]);
				}
			}
			
			//Ocultar todas las cartas que se encuentren en cardsFlipped
			setTimeout(function(){
				playSound(soundFlip);
				
				for ( var i  = 0, len = cardsFlipped.length; i < len; i++ )
					ocultarCarta(cardsFlipped[i]);

				setTimeout(desbloquear, tiempoBloquearBono); //Tiempo para poder seleccionar las cartas una vez se han volteado
			}, tiempoMostrarBono); //Tiempo para que las cartas se oculten
		}
	});
}

//Agregar el evento submit al los formularios ocultos para si el jugador presiona el boton limpiar los datos.
function addEventSubmit(){
	//Formulario enviar puntuacion al finalizar el juego
	document.getElementById("formPuntuacion").addEventListener("submit", function myFunction() {
	    document.getElementById('inputPuntuacion').value = "";
		document.getElementById('inputNombre').value = "";
	});

	//Formulario para guardar el juego
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
	var cards = getAllCards();
	cardsDown = 0;
	for (var i  = 0; i < cards.length; i++) {
		if(!containFlipped(cards[i])){
			cards[i].addEventListener( "click", funcionalidadJuego);
			cardsDown ++;
		}
	}
}

//Metodo que calcula que hacer cuando se clica una carta
function funcionalidadJuego(){
	if(!block){
		//Si la carta esta boca abajo
		if(!containFlipping(this) && cardsFlipped.length < 2){
			haciendoMovimientos = true;
			
			//Comprobacion de evitar que se meta la misma carta en el array
			if(cardsFlipped.length == 1 && cardsFlipped[0] != this || cardsFlipped.length == 0)
				cardsFlipped.push(this);

			mostrarCarta(this);
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
					mostrarCartaPermanentemente(cardsFlipped[i]);
				}

				cardsDown -= 2;
				setTimeout(desbloquear, tiempoBloquearCartasPares); //Tiempo para poder seleccionar las cartas una vez se han volteado
			//Si las cartas no son iguales
			}else{
				playSound(soundIncorrect, 800);

				//Esperar X segundos y voltearla
				setTimeout(function(){
					playSound(soundFlip);

					for (var i = 0; i < cardsFlipped.length; i++)
						ocultarCarta(cardsFlipped[i]);

					setTimeout(desbloquear, tiempoBloquearCartasImpares); //Tiempo para poder seleccionar las cartas una vez se han volteado
				}, tiempoMostrarImpares); //Tiempo que se muestan las cartas
			}
		}
	}
}

//devuelve todas las cartas
function getAllCards(){
	return document.querySelectorAll(".card");
}

//Gira la carta para poder verla
function mostrarCarta(carta){
	carta.classList.add("flipping");
}

//Gira la carta para ocultarla
function ocultarCarta(carta){
	carta.classList.remove("flipping");
}

//Gira la carta para que se vea y no se pueda volver a voltear
function mostrarCartaPermanentemente(carta){
	if(carta.classList.contains("flipping"))
		carta.classList.remove("flipping");
	
	carta.classList.add("flipped");
}

//devuelve si en el class contiene flipped
function containFlipped(card){
	return card.classList.contains("flipped");
}

//devuelve si en el class contiene flipping
function containFlipping(card){
	return card.classList.contains("flipping");
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
		}, tiempoDelayFinJuego);
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

//Metodo para desbloquear, limpiar variables, actualizar los intentos ...
function desbloquear(){
	cardsFlipped = [];
	block = false;
	haciendoMovimientos = false;
	mostrarIntentos();
	setTimeout(guardarPartida, tiempoDelaySave);
}

//----------------- Inicio Cronometro ------------------
var dateStart = 0;
var dateEnd = 0;
var timerID = 0;

//Funcion que actualiza el cronometro
function chrono(){
	dateEnd = new Date();
	document.getElementById("chronotime").innerHTML = getTime();
	timerID = setTimeout("chrono()", tiempoUpdateChrono); //Actualizar el cronometro cada segundo
}

//Funcion que calcula el tiempo del cronometro
function getTime(){
	var dateDiff = new Date(dateEnd - dateStart);
	
	var mm = dateDiff.getMilliseconds();
	var sec = dateDiff.getSeconds();
	var min = dateDiff.getMinutes();
	var hr = dateDiff.getHours()-1;
	
	if(hr < 10) hr = "0" + hr;
	if(min < 10) min = "0" + min;
	if(sec < 10) sec = "0" + sec;
	if(mm < 10) mm = "00" + mm;
	else if(mm < 100) mm = "0" + mm;
	
	if(activarMilisegundos)
		return hr + ":" + min + ":" + sec + ":" + mm;
	else
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
	return new Date(dateEnd - dateStart).getTime();
}
function autoGuardarPartida(){
	setTimeout(guardarPartida, tiempoAutosave);
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