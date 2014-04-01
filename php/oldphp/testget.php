<html>
 <script type="text/javascript" src="jquery-1.3.2.js"> </script>

 <script type="text/javascript">

 $(document).ready(function() {

 function getData(question) {                

      $.ajax({    //create an ajax request to load_page.php
        type: "GET",
        url: "countanswers.php?question=1",             
        dataType: "json",   //expect json to be returned                
        success: function(response){                    
           //$("#responsecontainer").html(response); 
           alert(response);
        }

    }


    $("#button1").click(getdata(1));
      $("#button2").click(getdata(2));
});
});

</script>

<body>
<h3 align="center">Manage Student Details</h3>
<table border="1" align="center">
   <tr>
       <td> <input type="button" id="button1" value="Count answers on Question 1" /> </td>
   </tr>
   <tr>
       <td> <input type="button" id="button2" value="Count answers on Question 2" /> </td>
   </tr>
</table>
<div id="responsecontainer" align="center">

</div>
</body>
</html>