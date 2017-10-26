<?php
	if($_SERVER['REQUEST_METHOD'] == 'POST' && !empty($_POST['nombre']) && !empty($_POST['puntuacion']) && !empty($_POST['tiempoPartida'])){
		session_start();

		if(!isset($_SESSION['rankingLocal']))
			$_SESSION['rankingLocal'] = array();
 
		if($archivo = fopen("../ranking/".$_SESSION['tipoTableroPartidaActual'], "a")){
			if(fwrite($archivo, $_POST['nombre']. "-".$_POST['puntuacion']." ".$_POST['tiempoPartida']. "\n")){
				fclose($archivo);

				$_SESSION['rankingLocal'][] = array("nombre" => $_POST['nombre'], "intentos" => $_POST['puntuacion'], "tiempo" => $_POST['tiempoPartida'], "indexTablero" => $_SESSION['tipoTableroPartidaActual']);
				$rankingLocal = $_SESSION['rankingLocal'];
				session_destroy();
				session_start();
				$_SESSION['rankingLocal'] = $rankingLocal;
				header("Location: ../index.php");
			}else{
				echo "No se ha podido escribir en el fichero.";
			}
			fclose($archivo);
		}else{
			echo "No se ha podido abrir el fichero.";
		}
	}else{
		header("Location: ../index.php");
	}
?>