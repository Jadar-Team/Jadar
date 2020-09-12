<?php

	$name = $_GET['searchItem'];
	
	//$conn is used to connect to database
	$conn = new mysqli("localhost", "DomUserDB", "1209huis@.M", "UserDB");
    if ($conn->connect_error) 
    {
        returnWithError( $conn->connect_error );
    } 
    
	//goes through database to search for contacts with matching criteria in table
	$result = $conn->query("SELECT * FROM ContactTable WHERE FirstName LIKE '%" . "$name" . "%' OR LastName LIKE '%" . "$name" . "%'");
	
	echo ("SELECT * FROM ContactTable WHERE FirstName LIKE '%{$name}%' OR LastName LIKE '%{$name}%'"."<BR>");
	
	$searchCount = $result->num_rows;
	
	while ($searchCount > 0)
	{
	    $row = mysqli_fetch_array($result);
	    echo ($row['ContactID'] . " " . $row['FirstName'] . " " . $row['LastName']);
        echo "<br>";
        if ($searchCount != 1)
        {
            //$searchResults .= ",";
        }
        $searchCount--;
	}
	
	$result->free_result();
    mysqli_close($conn);
    ?>
?>