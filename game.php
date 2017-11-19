<?php
    session_start();
?>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">

        <title>Memory - Game</title>

        <script type="text/JavaScript" src="js/jquery-3.2.1.js"></script>
        <script type="text/JavaScript" src="js/script.js"></script>
        <link rel="stylesheet" type="text/css" href="style/game.css"> 
        <link rel="stylesheet" type="text/css" href="style/botones.css"> 
    </head> 
    <body onload="inicializar()">
        <?php
            include "php/funciones.php";

            if(!isset($_SESSION['tablero'])){
                if($_SERVER['REQUEST_METHOD'] == "POST"){
                    if(!empty($_POST['nombre'])){
                        if($dimensiones = getDimension($_POST['tipoTablero'])){
                            $maxFilaTablero = $dimensiones[0];
                            $maxColumnaTablero = $dimensiones[1];
                            if(esPar($maxFilaTablero*$maxColumnaTablero)){
                                $baraja = getRandomCards($maxFilaTablero*$maxColumnaTablero);

                                if($baraja != false){
                                    $_SESSION['tablero'] = $baraja;
                                    $_SESSION['nombre'] = $_POST['nombre'];
                                    $_SESSION['filas'] = $maxFilaTablero;
                                    $_SESSION['columnas'] = $maxColumnaTablero;
                                    $_SESSION['tipoTableroPartidaActual'] = $_POST['tipoTablero'];
                                    header("Location: game.php");
                                }else{
                                    echo '<h2>No hay suficientes cartas para generar el tablero, pon un tablero mas pequeño.</h2>';
                                }
                            }else{
                                echo '<h2>Las cartas tienen que ser pares.</h2>';
                            }
                        }else{
                            echo '<h2>Formato de dimensiones incorrecta.</h2>';
                        }
                    }else{
                        echo '<h2>El nombre no puede estar vacio.</h2>';
                    }
                }else{
                    echo '<h2>No se ha podido generar el tablero.</h2>';
                }
                volverIndex();
            }else{
                echo '<h3><div><a href="index.php" class="boton">&laquo; Inicio</a> </div>
                            <div>Tiempo: <span id="chronotime">0:00:00</span><span class="separador"> | </span></div>
                            <div>Fallos: <span id="fallos">0</span><span class="separador"> | </span></div>
                            <div>Bonos Disponibles: <span id="bonosDisponibles">0</span> <a class="boton" id="btnBono">Utilizar bono</a></div>
                            
                            <div class="ocultar"><input id="inputMilisegundos" type="number" name="milisegundos"'.(isset($_SESSION['tiempoPartida'])?' value="'.$_SESSION['tiempoPartida'].'"':'').'>
                                <input id="inputfallos" type="number" name="fallos"'.(isset($_SESSION['fallos'])?' value="'.$_SESSION['fallos'].'"':'').'>
                                <input id="inputBonos" type="number" name="bonos"'.(isset($_SESSION['bonos'])?' value="'.$_SESSION['bonos'].'"':'').'></div></h3>';
                generarTablero($_SESSION['tablero'], $_SESSION['filas'], $_SESSION['columnas']);
                generarFormEnviarPuntuacion($_SESSION['nombre']);
            }
        ?>

  
    </body>
</html>