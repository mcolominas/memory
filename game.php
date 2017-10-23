<?php
    session_start();
?>
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

            if(!isset($_SESSION['tablero'])){
                if($_SERVER['REQUEST_METHOD'] == "POST"){
                    if(!empty($_POST['nombre'])){
                        if($dimensiones = getDimensiones($_POST['dimensiones'])){
                            $maxFilaTablero = $dimensiones[0];
                            $maxColumnaTablero = $dimensiones[1];
                            if(esPar($maxFilaTablero*$maxColumnaTablero)){
                                $baraja = getRandomCards($maxFilaTablero*$maxColumnaTablero);

                                if($baraja == false){
                                    echo '<h2>No hay suficientes cartas para generar el tablero, pon un tablero mas pequeño.</h2>';
                                }else{
                                    $_SESSION['tablero'] = $baraja;
                                    $_SESSION['nombre'] = $_POST['nombre'];
                                    $_SESSION['filas'] = $maxFilaTablero;
                                    $_SESSION['columnas'] = $maxColumnaTablero;

                                    generarPagina($baraja, $maxFilaTablero, $maxColumnaTablero, $_POST['nombre']);
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
            }else{
                generarPagina($_SESSION['tablero'], $_SESSION['filas'], $_SESSION['columnas'], $_SESSION['nombre']);
            }
            volverIndex();

            function generarPagina($baraja, $filas, $columnas, $nombre){
                echo '<h3>Tiempo: <span id="chronotime">0:00:00</span> | Intentos: <span id="intentos">0</span> | Bonos Disponibles: <span id="bonosDisponibles">0</span> <input type="submit" id="btnBono" value="Utilizar bono">
                    <br>
                    <form id="formGuardarPartida" method="post" action="php/guardarEstadoPartida.php">
                        <input class="ocultar" id="inputMilisegundos" type="number" name="milisegundos"'.(isset($_SESSION['tiempoPartida'])?' value="'.$_SESSION['tiempoPartida'].'"':'').'>
                        <input class="ocultar" id="inputIntentos" type="number" name="intentos"'.(isset($_SESSION['intentosGuardadas'])?' value="'.$_SESSION['intentosGuardadas'].'"':'').'>
                        <input class="ocultar" id="inputBonos" type="number" name="bonos"'.(isset($_SESSION['bonosGuardadas'])?' value="'.$_SESSION['bonosGuardadas'].'"':'').'>
                        <input class="ocultar" id="inputCartas" type="number" name="cartas">
                        <input type="submit" id="savePartida" name="datosPartida" value="Guardar Partida">
                    </form>
                    </h3>';
                generarTablero($baraja, $filas, $columnas);
                generarFormEnviarPuntuacion($nombre);
            }
        ?>

  
    </body>
</html>