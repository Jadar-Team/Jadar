<?php

	$inData = getRequestInfo();
	
	$userEmail = "";
	$username = "";
	$firstName = "";
	$lastName = "";
	
	$conn = new mysqli("localhost", "DomUserDB", "1209huis@.M", "UserDB");
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
		$sql = "SELECT UserEmail, UserName, FirstName, LastName FROM UserTable where UserName='" . $inData["login"] . "' and Password='" . $inData["password"] . "'";
		$result = $conn->query($sql);
		if ($result->num_rows > 0)
		{
			$row = $result->fetch_assoc();
			$userEmail = $row["UserEmail"];
			$userName = $row["UserName"];
			$firstName = $row["FirstName"];
			$lastName = $row["LastName"];
			
			returnWithInfo($userEmail, $firstName, $lastName, $userName );
		}
		else
		{
			returnWithError( "No Records Found" );
		}
		$conn->close();
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
	
	function returnWithError( $err )
	{
		$retValue = '{"userEmail":"","firstName":"","lastName":"","error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
	
	function returnWithInfo( $userEmail, $firstName, $lastName, $userName )
	{
		$retValue = '{"userEmail":"' . $userEmail . '","firstName":"' . $firstName . '","lastName":"' . $lastName . '","userName":"' . $userName . '","error":""}';
		sendResultInfoAsJson( $retValue );
	}
	
?>