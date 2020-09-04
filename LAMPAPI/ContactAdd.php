<?php

    $inData = getRequestInfo();

    $userName = $inData["userName"];
    $contactEmail = $inData["contactEmail"];
    $firstName = $inData["firstName"];
    $lastName = $inData["lastName"];
    $address = $inData["address"];
    $phone = $inData["phone"];
    $contactId = -1;
    
    $conn = new mysqli("localhost", "DomUserDB", "1209huis@.M", "UserDB");
    if ($conn->connect_error) 
    {
        returnWithError( $conn->connect_error );
    } 
    else
    {
        $sql = "SELECT UserName FROM ContactTable where UserName='" . $inData["userName"] . "' AND FirstName='" . $firstName . "' AND LastName='" . $lastName . "' ";
        //echo $sql;
        $result = $conn->query($sql);
        if ($result->num_rows <= 0)
        {
            $sql = "INSERT INTO ContactTable (UserName,ContactEmail,FirstName, LastName,Address,Phone) VALUES ('" . $userName . "','" . $contactEmail . "','" . $firstName . "','" . $lastName . "','" . $address . "','" . $phone . "')";
            $result = $conn->query($sql);
            if ($result == TRUE)
            {
                $contactId = $conn->insert_id;
                returnWithInfo($contactId, $firstName, $lastName, " has been added!" );
            }
            else
            {
                returnWithError( "Insert failed!" );
            }
        }
        else
        {
            
            returnWithError( "Contact already exists." );
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
	
	function returnWithInfo($contactId, $firstName, $lastName, $info )
	{
		$retValue = '{"contactId":' . $contactId . ',"firstName":"' . $firstName . '","lastName":"' . $lastName . '","info":"' . $info . '"}';
		sendResultInfoAsJson( $retValue );
	}
?>