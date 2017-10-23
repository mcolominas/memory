<?php
session_start();
?>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
        <link rel="stylesheet" type="text/css" href="style/estiloRanking.css"> 
	</head> 
    <body>
        <?php
            include "php/funciones.php";
            $nombre_archivo = "ranking";
            echo "<div class='central'>";
            
            //ranking mundial
            if(file_exists("ranking/".$nombre_archivo) && $archivo = fopen("ranking/".$nombre_archivo, "r")){

                
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
                fclose($archivo);

                echo "<div>";
                echo "<h1>Ranking Mundial</h1><hr>";
                echo "<div>";
                generarListaRanking(burbuja($array));
                echo "</div>";
                echo "</div>";
            }

            //ranking local
            if(isset($_SESSION['rankingLocal'])){
                echo "<div>";
                echo "<h1>Ranking Local</h1><hr>";
                echo "<div>";
                generarListaRanking(burbuja($_SESSION['rankingLocal']));
                echo "</div>";
                echo "</div>";
            }
            echo "</div>";
            volverIndex();
        ?>

  
    </body>
</html>