
<?php

	//$name = $_GET['searchItem'];
	$inData = getRequestInfo();
	$userName = $inData["userName"]; 
    $firstName = $inData["firstName"];
	$lastName = $inData["lastName"];
	
	//$conn is used to connect to database
	$conn = new mysqli("localhost", "DomUserDB", "1209huis@.M", "UserDB");
    	if ($conn->connect_error) 
    	{
        	returnWithError( $conn->connect_error );
    	} 
    
	//goes through database to search for contacts with matching criteria in table
	$result = $conn->query("SELECT * FROM ContactTable WHERE UserName='" . "$userName" . "' AND FirstName LIKE '%" . "$firstName" . "%' AND LastName LIKE '%" . "$lastName" . "%'");
	
	//echo ("SELECT * FROM ContactTable WHERE UserName='" . "$userName" . "' AND FirstName LIKE '%{$firstName}%' AND LastName LIKE '%{$lastName}%'"."<BR>");
	
	$searchCount = $result->num_rows;
	
	$retValue = '{"userName":"' . $userName . '","contacts":';
	$retValue .= '[';
	while ($searchCount > 0)
	{
		$row = mysqli_fetch_array($result);
		//echo ($row['ContactID'] . " " . $row['FirstName'] . " " . $row['LastName']);
        	//echo "<br>";
		$retValue .= '{"contactId":' . $row['ContactID'] . ',"contactEmail":"' . $row['ContactEmail'] . '","firstName":"' . $row['FirstName'] . '","lastName":"' . $row['LastName'] . '","address":"' . $row['Address'] . '","phone":"' . $row['Phone'] . '"';
		if ($searchCount != 1)
		{
			$retValue .= ' },';
			//$searchResults .= ",";
		}
		else
		{
			$retValue .= ' }';
		}
		$searchCount--;
	}
	$result->free_result();
    	mysqli_close($conn);
    
	$retValue .= ']';
	$retValue .= '}';
	sendResultInfoAsJson( $retValue );

	function returnWithError( $err )
	{
		$retValue = '{"userName":"","firstName":"","lastName":"","error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}

	function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
	}

	function sendResultInfoAsJson( $obj )
	{
		header('Content-type: application/json');
		echo $obj;
	}
?>
