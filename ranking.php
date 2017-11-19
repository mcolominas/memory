<?php
    session_start();
?>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">

        <title>Memory - Ranking</title>

        <link rel="stylesheet" type="text/css" href="style/estiloRanking.css"> 
        <link rel="stylesheet" type="text/css" href="style/botones.css"> 
	</head> 
    <body>
    
        <?php
            include "php/funciones.php";
            $tableros = getAllTableros();
            if(isset($_GET['indexTablero'])){
                if(array_key_exists($_GET['indexTablero'], $tableros)){
                    $_SESSION['indexTablero'] = $_GET['indexTablero'];
                }
            }else{
                $_SESSION['indexTablero'] = array_keys($tableros)[0];
            }

            if(isset($_GET['orderBy'])){
                if($_GET['orderBy'] == "tiempo" || $_GET['orderBy'] == "fallos"){
                    $_SESSION['orderBy'] = $_GET['orderBy'];
                }
            }else{
                $_SESSION['orderBy'] = "fallos";
            }
            $orderBy = $_SESSION['orderBy'];
            $indexTableroMostrar = $_SESSION['indexTablero'];

            //Menu
            echo '<ul class="topnav"> 
                <li><a href="index.php" class="boton">&laquo; Inicio</a></li>
                <li><span>Tablero:</span></li>';
                foreach ($tableros as $key => $value) {
                    $url = "ranking.php?indexTablero=".$key."&orderBy=".$orderBy;
                    echo '<li><a '.($indexTableroMostrar == $key ? 'class="active" ' : '') .'href="'.$url.'">'.$value[0].' X '.$value[1].'</a></li>';
                }

                $url = "ranking.php?indexTablero=".$indexTableroMostrar."&orderBy=";
                echo '<ul class="right">
                    <li><span>Ordenar Por:</span></li>
                    <li><a '.($orderBy == "fallos" ? 'class="active" ' : '').'href="'.$url.'fallos">Fallos</a></li>
                    <li><a '.($orderBy == "tiempo" ? 'class="active" ' : '').'href="'.$url.'tiempo">Tiempo</a></li>
                </ul>
            </ul>';

            //Ranking
            echo "<div class='contenido'><div class='ranking'>";
            echo "<h1> Tablero ".$tableros[$indexTableroMostrar][0]." X ".$tableros[$indexTableroMostrar][1]."</h1>";
            
            //ranking mundial
            echo "<div>";
            echo "<h2>Ranking Mundial</h2><hr>";
            echo "<div>";

            $rankingMundial = array();
            if(file_exists("ranking/".$indexTableroMostrar) && $archivo = fopen("ranking/".$indexTableroMostrar, "r")){
                
                while(!feof($archivo)) {

                    $linea = fgets($archivo);
                    if(!empty($linea)){
                    $index1 = strrpos($linea, " ");
                    $index2 = strrpos($linea, "-");
                    $nombre = substr($linea, 0, $index2);
                    $puntuacion = (int) substr($linea, $index2+1, $index1);
                    $tiempo = (int) substr($linea, $index1+1);
                    $rankingMundial[] = array("nombre" => $nombre, "fallos" => $puntuacion, "tiempo" => $tiempo);
}
                }
                fclose($archivo);
            }

            if($orderBy == "fallos")
                generarListaRanking(ordenarcionArray($rankingMundial, "fallos", "tiempo"));
            else
                generarListaRanking(ordenarcionArray($rankingMundial, "tiempo", "fallos"));

            echo "</div>";
            echo "</div>";

            //ranking local
            if(isset($_SESSION['rankingLocal'])){
                $rankingLocal = array();
                foreach ($_SESSION['rankingLocal'] as $value) {
                    if($value["indexTablero"] == $indexTableroMostrar)
                        $rankingLocal[] = $value;
                }
                if(count($rankingLocal)>0){
                    echo "<div>";
                    echo "<h2>Ranking Local</h2><hr>";
                    echo "<div>";
                    if($orderBy == "fallos")
                        generarListaRanking(ordenarcionArray($rankingLocal, "fallos", "tiempo"));
                    else
                        generarListaRanking(ordenarcionArray($rankingLocal, "tiempo", "fallos"));
                    echo "</div>";
                    echo "</div>";
                }
            }
            echo "</div>";
            echo "</div>";
        ?>

  
    </body>
</html>