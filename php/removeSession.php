<?php
	session_start();
	$rankingLocal = $_SESSION['rankingLocal'];
	session_destroy();
	session_start();
	$_SESSION['rankingLocal'] = $rankingLocal;
	header("Location: ../index.php");
?>