<?php
//THIS IS THE PAGE WHERE WE SAVE ONE ANSWER TO THE DATABASE

$con=mysqli_connect("localhost","vagskalspel","rhYdjCeyQYbnYtjQ","vagskalspel");
// Check connection

$useriddata = $_GET['ID'];
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

if(mysqli_query($con,$sql)) {





$result = mysqli_query($con,"SELECT answer FROM questions WHERE question =$questiondata GROUP BY(userid)");

$nrOfA= 0;
$nrOfB= 0;
$nrOfC= 0;

$nrOfAnswers= 0;

$results = array();

while($row = mysqli_fetch_array($result))
{
	switch ($row['answer']) {
	    case "A":
	        $nrOfA++;
	        break;
	    case "B":
	        $nrOfB++;
	        break;
	    case "C":
	        $nrOfC++;
	        break;
	}
	$nrOfAnswers++;
  }
$results[] = array(
          'A' =>  $nrOfA,
          'B' =>  $nrOfB,
          'C' =>  $nrOfC,
          'total' => $nrOfAnswers
       );
//echo "RESULT:<br>A:" . $nrOfA . "<br>B:" .$nrOfB . "<br>C:" .$nrOfC . "<br><br>" ."Total: " .$nrOfAnswers. "<br>done";
echo json_encode($results);


}else {
	echo "{RESULT:ERROR}";
}



mysqli_close($con);
?>