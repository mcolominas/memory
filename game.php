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

                                if($baraja != false){
                                    $_SESSION['tablero'] = $baraja;
                                    $_SESSION['nombre'] = $_POST['nombre'];
                                    $_SESSION['filas'] = $maxFilaTablero;
                                    $_SESSION['columnas'] = $maxColumnaTablero;
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
            }else{
                echo '<h3>Tiempo: <span id="chronotime">0:00:00</span> | 
                            Intentos: <span id="intentos">0</span> | 
                            Bonos Disponibles: <span id="bonosDisponibles">0</span> 
                            <input type="submit" id="btnBono" value="Utilizar bono">
                            <form id="formGuardarPartida" method="post" action="php/guardarEstadoPartida.php">
                                <input id="inputMilisegundos" type="number" name="milisegundos"'.(isset($_SESSION['tiempoPartida'])?' value="'.$_SESSION['tiempoPartida'].'"':'').'>
                                <input id="inputIntentos" type="number" name="intentos"'.(isset($_SESSION['intentosGuardadas'])?' value="'.$_SESSION['intentosGuardadas'].'"':'').'>
                                <input id="inputBonos" type="number" name="bonos"'.(isset($_SESSION['bonosGuardadas'])?' value="'.$_SESSION['bonosGuardadas'].'"':'').'>
                                <input id="inputCartas" type="number" name="cartas">
                                <input type="submit" id="savePartida" name="datosPartida">
                            </form></h3>';
                generarTablero($_SESSION['tablero'], $_SESSION['filas'], $_SESSION['columnas']);
                generarFormEnviarPuntuacion($_SESSION['nombre']);
            }
            volverIndex();
        ?>

  
    </body>
</html>