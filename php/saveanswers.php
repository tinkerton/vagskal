<?php
//THIS IS THE PAGE WHERE WE SAVE ONE ANSWER TO THE DATABASE

$con=mysqli_connect("localhost","vagskalspel","rhYdjCeyQYbnYtjQ","vagskalspel");
// Check connection

$useriddata = $_GET['userid'];
$questiondata = $_GET['question'];
$answerdata = $_GET['answer'];

/*
if (mysqli_connect_errno())
  {
 echo "Failed to connect to MySQL: " . mysqli_connect_error();
  }
*/
$sql="INSERT INTO questions (userid, question, answer)
VALUES
('$useriddata',$questiondata,'$answerdata')";

/*if (!mysqli_query($con,$sql))
  {
  die('Error: ' . mysqli_error($con));
  }
*/

mysqli_close($con);
?>