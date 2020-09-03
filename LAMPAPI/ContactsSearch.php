<?php

	$name = $_POST['search'];
	
	//$conn is used to connect to database
	$conn = new mysqli("localhost", "DomUserDB", "1209huis@.M", "UserDB");
    if ($conn->connect_error) 
    {
        returnWithError( $conn->connect_error );
    } 
    
	//goes through database to search for contacts with matching criteria in table
	$result = mysqli_query($conn, "SELECT * FROM ContactTable WHERE FirstName LIKE '%{$name}%' OR LastName LIKE '%{$name}%'");
	
	//goes through each result
	while ($row = mysqli_fetch_array($result))
	{
        echo $row['first_name'] . " " . $row['last_name'];
        echo "<br>";
	}
	
    mysqli_close($conn);
    ?>
?>