<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
        <link rel="stylesheet" type="text/css" href="style/main.css"> 
	</head> 
    <body>
        <?php
            include "php/funciones.php";
            $nombre_archivo = "ranking";
            if($archivo = fopen("ranking/".$nombre_archivo, "r")){
                $array = array();
                while(!feof($archivo)) {

                    $linea = fgets($archivo);
                    if(!empty($linea)){
                    $index = strrpos($linea, "-");
                    $nombre = substr($linea, 0, $index);
                    $puntuacion = (int) substr($linea, $index+1);
                    $array[] = array($nombre, $puntuacion);
}
                }
            $array = burbuja($array);
            mostrarRanking($array);
            }
            fclose($archivo);
        ?>

  
    </body>
</html>