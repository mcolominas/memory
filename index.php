<?php
    session_start();      
?>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <link rel="stylesheet" type="text/css" href="style/main.css"> 
    </head> 
    <body>
        <?php
            if(!isset($_SESSION['tablero'])){

        ?>
        <form method="POST" action="game.php">
            Nombre: <input type="text" name="nombre"><br>
            Dimensiones:
            <select name="dimensiones">
                <option value="opcion1">4x4</option>
                <option value="opcion2">6x6</option>
                <option value="opcion3">8x8</option>
            </select><br>
            <input type="submit" name="go" value="Empezar">
        </form>
        <?php
            }else{
        ?>
        <form action="game.php">
            <input type="submit" value="Continuar con el juego">
        </form>
        <form action="php/removeSession.php">
            <input type="submit" value="Borrar partida">
        </form>
        <?php
            }
        ?>
        <form action="ranking.php">
            <input type="submit" value="Ranking">
        </form>
    </body>
</html>