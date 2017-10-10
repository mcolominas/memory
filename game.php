<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
        <script type="text/JavaScript" src="js/script.js"></script>
        <link rel="stylesheet" type="text/css" href="style/main.css"> 
	</head> 
    <body onload="inicializar()">
        <?php
            if($_SERVER['REQUEST_METHOD'] == "POST"){
                include "php/funciones.php";

                $maxFilaTablero = 3;
                $maxColumnaTablero = 4;

                if(esPar($maxFilaTablero*$maxColumnaTablero)){
                    $baraja = getRandomCards($maxFilaTablero*$maxColumnaTablero);

                    if($baraja == false){
                        echo '<h2>No hay suficientes cartas para generar el tablero, pon un tablero mas pequeño.</h2>';
                        volverIndex();
                    }else{
                        echo "<p>Intentos: <span id='intentos'>0</span></p>";
                        generarTablero($baraja, $maxFilaTablero, $maxColumnaTablero);
                        generarFormEnviarPuntuacion($_POST['nombre']);
                    }
                }else{
                    echo '<h2>Las cartas tienen que ser pares.</h2>';
                    volverIndex();
                }
            }
        ?>

  
    </body>
</html>