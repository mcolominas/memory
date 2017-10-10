<?php
	function getRandomCards($cant = 0){
		include "cartas.php";

		$cant /= 2;
		if($cant > count($cartas) - 1)
			return false;

		$baraja = array();
		$barajaRandom = array();
		$keys = array_keys($cartas);

		for ($i=0; $i < $cant; $i++) { 

			$baraja[] = array($keys[$i], $cartas[$i]);
			$baraja[] = array($keys[$i], $cartas[$i]);
		}

		while(count($baraja) > 0){
			$index = array_rand($baraja, 1);
			$barajaRandom[] = $baraja[$index];
			unset($baraja[$index]);
		}
		return $barajaRandom;
	}

	function generarTablero($cartas = array(), $maxFilaTablero = 0, $maxColumnaTablero = 0){
		$index = 0;

		echo "<table>";
		for($fila = 0; $fila < $maxFilaTablero; $fila ++){
			echo "<tr>";
			for($columna = 0; $columna < $maxColumnaTablero; $columna ++){
				echo "<td>".$cartas[$index][0];
					echo '<div carta="'.$cartas[$index][0].'" class="card">';
						echo '<div class="front"><img src="img/question.jpg"></div>';
						echo '<div class="back"><img src="img/'.$cartas[$index][1].'"></div>';
					echo '</div>';
				echo "</td>";
				$index ++;
			}
			echo "</tr>";
		}
		echo "</table>";
	}
	function esPar($num){
		return $num % 2 == 0;
	}
	function volverIndex(){
		echo '<form action="index.html">';
			echo '<input type="submit" name="volver" value="volver">';
		echo '</form>';
	}
	function generarFormEnviarPuntuacion($nombre = ""){
		echo '<form id="formPuntuacion" method="post" action="puntuacion.php">';
			echo '<input type="text" id="inputPuntuacion" name="puntuacion">';
			echo '<input type="text" id="inputNombre" name="nombre" value="'.$nombre.'">';
			echo '<input type="submit" id="sendPuntuacion" name="enviar">';
		echo '</form>';
	}
?>