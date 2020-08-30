<?php

	$inData = getRequestInfo();
	
	$id = 0;
	$firstName = "";
	$lastName = "";
	$street = "";
	$city = "";
	$zip = "";
	$state = "";

	$conn = new mysqli("localhost", "DomUserDB", "1209huis@.M", "UserDB");
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
		$sql = "SELECT UserID FROM LoginTable where LoginName='" . $inData["login"] . "' and Password='" . $inData["password"] . "'";
		$result = $conn->query($sql);
		if ($result->num_rows > 0)
		{
			$row = $result->fetch_assoc();
			$id = $row["UserID"];
			
			$sql = "SELECT FirstName, LastName, Street, City, Zip, State FROM UserData where UserID='" . $id . "'";
			$result = $conn->query($sql);
			if ($result->num_rows > 0)
			{
			    $row = $result->fetch_assoc();
			    $firstName = $row["FirstName"];
			    $lastName = $row["LastName"];
				$street = $row["Street"];
				$city = $row["City"];
				$zip = $row["Zip"];
				$state = $row["State"];
			
				returnWithInfo($id, $firstName, $lastName, $street, $city, $zip, $state );
			}
			else
			{
				returnWithError( "No Records Found in UserData" );
			}
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
		$retValue = '{"id":0,"firstName":"","lastName":"","error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
	
	function returnWithInfo( $id, $firstName, $lastName, $street, $city, $zip, $state )
	{
		$retValue = '{"id":' . $id . ',"firstName":"' . $firstName . '","lastName":"' . $lastName . '","street":"' . $street . '","city":"' . $city . '","zip":"' . $zip . '","state":"' . $state . '","error":""}';
		sendResultInfoAsJson( $retValue );
	}
	
?>