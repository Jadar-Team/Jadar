<?php

    $inData = getRequestInfo();

    $contactId = $inData["contactId"];
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
        $sql = "UPDATE ContactTable SET ContactEmail='" . $contactEmail . "',FirstName='" . $firstName . "',LastName='" . $lastName . "',Address='" . $address . "',Phone='" . $phone . "' WHERE ContactID='" . $contactId . "' AND UserName='" . $userName . "' ";
        
        echo $sql;
        
        $result = $conn->query($sql);
        if ($result == TRUE)
        {
            returnWithInfo($contactId, $firstName, $lastName, " has been updated!" );
        }
        else
        {
            returnWithError( "Update failed!" );
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
		$retValue = '{"userName":"","firstName":"","lastName":"","error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
	
	function returnWithInfo($contactId, $firstName, $lastName, $info )
	{
		$retValue = '{"contactId":' . $contactId . ',"firstName":"' . $firstName . '","lastName":"' . $lastName . '","info":"' . $info . '"}';
		sendResultInfoAsJson( $retValue );
	}
?>