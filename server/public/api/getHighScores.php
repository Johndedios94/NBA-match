<?php
require_once('functions.php');
set_exception_handler('error_handling');

require_once('dbconnection.php');
startup();

$query="SELECT * FROM `highScores`";
$result =  mysqli_query($conn, $query);


$data = [];
while($row = mysqli_fetch_assoc($result)){
  $data[]=$row;
}

$output = json_encode($data);
print($output);
?>
