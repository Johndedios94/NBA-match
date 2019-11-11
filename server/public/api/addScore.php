<?php
require_once('functions.php');
set_exception_handler('error_handling');

require_once('dbconnection.php');
startup();

$bodyData = getBodyData();
$name = $bodyData["name"];
$score = $bodyData["score"];

$query="INSERT INTO `highScores` ( `name`, `score`) VALUES ( '$name', $score)";

$result = mysqli_query($conn, $query);

?>
