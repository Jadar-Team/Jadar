<?php

    $inData = getRequestInfo();

    $userName = $inData["userName"];
    $contactEmail = $inData["contactEmail"];
    $firstName = $inData["firstName"];
    $lastName = $inData["lastName"];
    $address = $inData["address"];
    $phone = $inData["phone"];
    
    
    $conn = new mysqli("localhost", "DomUserDB", "1209huis@.M", "UserDB");
    if ($conn->connect_error) 
    {
        returnWithError( $conn->connect_error );
    } 
    else
    {
        $sql = "INSERT INTO ContactTable (UserName,ContactEmail,FirstName, LastName,Address,Phone) VALUES ('" . "$userName" . "','" . "$contactEmail" . "','" . "$firstName" . "','" . "$lastName" . "','" . "$address" . "','" . "$phone" . "')";
        $result = $conn->query($sql);
        if ($result == TRUE)
        {
            returnWithInfo($firstName, $lastName, " has been added!" );
        }
        else
        {
            returnWithError( "Insert failed!" );
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
	
	function returnWithInfo( $firstName, $lastName, $info )
	{
		$retValue = '{"firstName":"' . $firstName . '","lastName":"' . $lastName . '","info":"' . $info . '"}';
		sendResultInfoAsJson( $retValue );
	}
?>