<?php

    $inData = getRequestInfo();

    $userName = $inData["userName"];
    $contactId = $inData["contactId"];
    
    $conn = new mysqli("localhost", "DomUserDB", "1209huis@.M", "UserDB");
    if ($conn->connect_error) 
    {
        returnWithError( $conn->connect_error );
    } 
    else
    {
        $sql = "SELECT UserName FROM ContactTable where UserName='" . $inData["userName"] . "' AND ContactID=$contactId";
        $result = $conn->query($sql);
        if ($result->num_rows > 0)
        {
            $sql = "DELETE FROM ContactTable where UserName='" . $userName . "' AND ContactID=$contactId";
            $result = $conn->query($sql);
            if ($result == TRUE)
            {
                returnWithInfo( $userName, $contactId, "contact deleted!" );
            }
            else
            {
                returnWithError( "Delete failed!" );
            }
        }
        else
        {
            returnWithError( "Username not found." );
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
	
	function returnWithInfo( $userName, $contactId, $info )
	{
		$retValue = '{"userName":"' . $userName . '","contactId":' . $contactId . '"info":"' . $info . '"}';
		sendResultInfoAsJson( $retValue );
	}
?>