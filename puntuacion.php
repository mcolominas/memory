<?php
	if($_SERVER['REQUEST_METHOD'] == 'POST' && !empty($_POST['nombre']) && !empty($_POST['puntuacion'])){
		$nombre_archivo = "ranking";
 
		if($archivo = fopen("ranking/".$nombre_archivo, "a")){
			if(fwrite($archivo, $_POST['nombre']. "-".$_POST['puntuacion']. "\n")){
				fclose($archivo);
				header("Location: index.html");
			}else{
				echo "No se ha podido escribir en el fichero.";
			}
		}else{
			echo "No se ha podido abrir el fichero.";
		}
		fclose($archivo);
		
	}else{
		header("Location: index.html");
	}
?>