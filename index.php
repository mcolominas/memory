<?php
    session_start();      
?>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <link rel="stylesheet" type="text/css" href="style/estiloPagPrincipal.css"> 
    </head> 
    <body>
        <div class="central">
        <h1>Memory</h1>
        <div>
        <?php
            if(!isset($_SESSION['tablero'])){
        ?>
        <form method="POST" action="game.php">
            Nombre: <input type="text" name="nombre"><br>
            Dimensiones:<br>
            <select class="marginBottom" name="tipoTablero">
            <?php
                include 'php/funciones.php';
                foreach (getAllTableros() as $key => $value) {
                    echo '<option value="'.$key.'">'.$value[0].' X '.$value[1].'</option>';
                }
            ?>
            </select><br>
            <input class="boton btnVerde" type="submit" name="go" value="Empezar">
        </form>
        <?php
            }else{
        ?>
        <a class="boton btnVerde" href="game.php">Continuar con el juego</a>
        <a class="boton btnRojo" href="php/removeSession.php">Borrar partida</a>
        <?php
            }
        ?>
        <a class="boton btnVerde" href="ranking.php">Ranking</a>
        </div>
        </div>
    </body>
</html>