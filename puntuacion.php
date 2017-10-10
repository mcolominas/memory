<?php
	if($_SERVER['REQUEST_METHOD'] == 'POST' && !empty($_POST['nombre']) && !empty($_POST['puntuacion'])){
		$nombre_archivo = "ranking";
 
		if($archivo = fopen("ranking/".$nombre_archivo, "a")){
			if(fwrite($archivo, $_POST['nombre']. "-".$_POST['puntuacion']. "\n")){
				echo "Se ha ejecutado correctamente";
			}else{
				echo "Ha habido un problema al crear el archivo";
			}
			fclose($archivo);
		}
		header("Location: index.html");
	}else{
		header("Location: index.html");
	}
?>