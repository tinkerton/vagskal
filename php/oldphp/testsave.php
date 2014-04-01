<html>
<head>
<script src="http://code.jquery.com/jquery-1.10.1.min.js" ></script>
<script>
$(document).ready(function(){
    $("form").on('submit',function(event){
    event.preventDefault();
       
        data = $(this).serialize();
         alert("start saving " + data);
        $.ajax({
        type: "GET",
        url: "saveanswer.php",
        data: data
        }).done(function( msg ) {
        alert( "Data Saved: " + msg );
        });
    });
});
</script>
</head>
<body>
    Save data for one question with ajax
<form>
<table>

<tr><td>userid : </td><td> <input type="text" name="userid"/> </td> </tr>
<tr><td>question : </td><td> <input type="text" name="question"/> </td> </tr>
<tr><td>answer : </td><td> <input type="text" name="answer"/> </td> </tr>
<tr><td><input type="submit" value="Submit" /> </td> </tr>

</table>
</form>
</body>
</html>