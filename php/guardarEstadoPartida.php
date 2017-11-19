<?php
	if($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['milisegundos']) && isset($_POST['cartas']) && isset($_POST['fallos']) && isset($_POST['bonos'])){
		if(estaLlenoYesNumero($_POST['milisegundos']) && estaLlenoYesNumero($_POST['cartas']) && estaLlenoYesNumero($_POST['fallos']) && estaLlenoYesNumero($_POST['bonos'])){
			session_start();
			$_SESSION['tiempoPartida'] = $_POST['milisegundos'];
			$_SESSION['estadoCartasTablero'] = $_POST['cartas'];
			$_SESSION['fallos'] = $_POST['fallos'];
			$_SESSION['bonos'] = $_POST['bonos'];
		}
	}
	//header("Location: ../game.php");

	function estaLlenoYesNumero($string){
		return ($string != null && $string != "" && is_numeric($string));
	}
?>