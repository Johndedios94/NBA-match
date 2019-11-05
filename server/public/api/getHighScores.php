<?php
require_once('functions.php');
set_exception_handler('error_handling');

require_once('dbconnection.php');
startup();

$query = "SELECT name, score FROM `highScores` ORDER BY score ASC LIMIT 5";
$result =  mysqli_query($conn, $query);


$data = [];
while($row = mysqli_fetch_assoc($result)){
  $data[]=$row;
}

$output = json_encode($data);
print($output);
?>
