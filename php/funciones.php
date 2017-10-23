<?php
	function getRandomCards($cant = 0){
		include "cartas.php";

		$cant /= 2;
		if($cant > count($cartasDisponibles))
			return false;

		$baraja = array();
		$barajaRandom = array();
		$keys = array_keys($cartasDisponibles);

		for ($i=0; $i < $cant; $i++) { 

			$baraja[] = array($keys[$i], $cartasDisponibles[$i], $dorsosDisponibles[array_rand($dorsosDisponibles,1)]);
			$baraja[] = array($keys[$i], $cartasDisponibles[$i], $dorsosDisponibles[array_rand($dorsosDisponibles,1)]);
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
		$cartasGuardadas = null;

		if(isset($_SESSION['cartasGuardadas']))
			$cartasGuardadas = str_split($_SESSION['cartasGuardadas']);

		if(!is_array($cartasGuardadas) || count($cartasGuardadas) == 0)
			$cartasGuardadas = null;

		echo "<table>";
		for($fila = 0; $fila < $maxFilaTablero; $fila ++){
			echo "<tr>";
			for($columna = 0; $columna < $maxColumnaTablero; $columna ++){
				echo "<td>";
					echo '<div carta="'.$cartas[$index][0].'" class="card'.($cartasGuardadas != null && $cartasGuardadas[$index] == 1 ? ' flipped':'').'">';
						echo '<div class="back"><img src="img/cartas/cara/'.$cartas[$index][1].'"></div>';
						echo '<div class="front"><img src="img/cartas/dorso/'.$cartas[$index][2].'"></div>';
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
		echo '<form action="index.php">';
			echo '<input type="submit" value="volver">';
		echo '</form>';
	}
	function generarFormEnviarPuntuacion($nombre = ""){
		echo '<form id="formPuntuacion" method="post" action="php/guardarDatos.php">';
			echo '<input type="text" id="inputPuntuacion" name="puntuacion">';
			echo '<input type="text" id="inputNombre" name="nombre" value="'.$nombre.'">';
			echo '<input type="submit" id="sendPuntuacion" name="enviar">';
		echo '</form>';
	}
	function burbuja($array){
		for($i=1;$i<count($array);$i++){
			for($j=0;$j<count($array)-$i;$j++){
				if($array[$j][1]>$array[$j+1][1]){
					$k=$array[$j+1];
					$array[$j+1]=$array[$j];
					$array[$j]=$k;
				}
			}
		}
		return $array;
	}
	function generarListaRanking($array){
		$index = 1;
		foreach ($array as $value) {
			if($index <= 3){
				echo "<p class='posicion".$index."'>".$value[0].", ".$value[1]." intentos.</p>";
				$index ++;
			}else{
				echo "<p>".$value[0].", ".$value[1]." intentos.</p>";
			}
			
		}
	}
	function getDimensiones($string){
		switch ($string) {
			case 'opcion1':
				return array(4, 4);
			case 'opcion2':
				return array(6, 6);
			case 'opcion3':
				return array(8, 8);
			default:
				return false;
		}
	}
?>