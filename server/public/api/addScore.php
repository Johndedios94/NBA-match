<?php
require_once('functions.php');
set_exception_handler('error_handling');

require_once('dbconnection.php');
startup();

$bodyData = getBodyData();

$name = $bodyData["name"];
$score = $bodyData["score"];

// var_dump("name is  ", $name );
// var_dump("score is  ", $score);

$query="INSERT INTO `highScores` ( `name`, `score`) VALUES ( '$name', $score)";
// var_dump(" query is", $query);
// $query="SELECT * FROM `highScores`";
// $result =  mysqli_query($conn, $query);

$result = mysqli_query($conn, $query);
var_dump("Result is ", $result);
// $data = [];
// while($row = mysqli_fetch_assoc($result)){
//   $data[]=$row;
// }

// $output = json_encode($data);
// print($output);


?>
