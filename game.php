<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
        <script type="text/JavaScript" src="js/script.js"></script>
        <link rel="stylesheet" type="text/css" href="style/main.css"> 
	</head> 
    <body onload="inicializar()">
        <?php
            include "php/funciones.php";
            if($_SERVER['REQUEST_METHOD'] == "POST"){
                if(!empty($_POST['nombre'])){

                    $maxFilaTablero = 6;
                    $maxColumnaTablero = 6;

                    /*
                        $maxFilaTablero = $_POST['filas'];
                        $maxColumnaTablero = $_POST['columnas'];
                    */
                        
                    if(esPar($maxFilaTablero*$maxColumnaTablero)){
                        $baraja = getRandomCards($maxFilaTablero*$maxColumnaTablero);

                        if($baraja == false){
                            echo '<h2>No hay suficientes cartas para generar el tablero, pon un tablero mas pequeño.</h2>';
                            volverIndex();
                        }else{
                            echo "<h3>Tiempo: <span id='chronotime'>0:00:00</span> | Intentos: <span id='intentos'>0</span> | Bonos Disponibles: <span id='bonosDisponibles'>0</span> <input type='submit' id='btnBono' value='Utilizar bono'></h3>";
                            generarTablero($baraja, $maxFilaTablero, $maxColumnaTablero);
                            generarFormEnviarPuntuacion($_POST['nombre']);
                        }
                    }else{
                        echo '<h2>Las cartas tienen que ser pares.</h2>';
                        volverIndex();
                    }
                }else{
                    echo '<h2>El nombre no puede estar vacio.</h2>';
                    volverIndex();
                }
            }else{
                echo '<h2>No se ha podido generar el tablero.</h2>';
                volverIndex();
            }
        ?>

  
    </body>
</html>