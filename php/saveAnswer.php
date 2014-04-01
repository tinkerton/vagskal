<?php
//THIS IS THE PAGE WHERE WE SAVE ONE ANSWER TO THE DATABASE

$con=mysqli_connect("localhost","vagskalspel","rhYdjCeyQYbnYtjQ","vagskalspel");
// Check connection

$useriddata = $_GET['ID'];
$questiondata = $_GET['question_id'];
$answerdata = $_GET['answer_id'];


$sql="INSERT INTO ANSWERS (ID, user_id, question_id, answer_id)
VALUES ('','$useriddata',$questiondata,$answerdata)";

mysqli_query($con,$sql);



mysqli_close($con);
?>