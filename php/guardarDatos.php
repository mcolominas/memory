<?php
	if($_SERVER['REQUEST_METHOD'] == 'POST' && !empty($_POST['nombre']) && !empty($_POST['puntuacion'])){
		session_start();

		if(!isset($_SESSION['rankingLocal']))
			$_SESSION['rankingLocal'] = array();


		$nombre_archivo = "ranking";
 
		if($archivo = fopen("ranking/".$nombre_archivo, "a")){
			if(fwrite($archivo, $_POST['nombre']. "-".$_POST['puntuacion']. "\n")){
				fclose($archivo);

				$_SESSION['rankingLocal'][] = array($_POST['nombre'], $_POST['puntuacion']);
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