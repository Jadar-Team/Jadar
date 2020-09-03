<?php

    $inData = getRequestInfo();

    $userName = ""; 
    
    $conn = new mysqli("localhost", "DomUserDB", "1209huis@.M", "UserDB");
    if ($conn->connect_error) 
    {
        returnWithError( $conn->connect_error );
    } 
    else
    {
        $sql = "SELECT UserName FROM UserTable where UserName='" . $inData["userName"] . "'";
        $result = $conn->query($sql);
        if ($result->num_rows > 0)
        {
            $userName = $inData["userName"];
            
            $sql = "DELETE FROM UserTable where UserName='" . $userName . "'";
            $result = $conn->query($sql);
            if ($result == TRUE)
            {
                returnWithInfo( $userName, " has been deleted!" );
            }
            else
            {
                returnWithError( "Insert failed!" );
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
	
	function returnWithInfo( $userName, $info )
	{
		$retValue = '{"userName":"' . $userName . '","info":"' . $info . '"}';
		sendResultInfoAsJson( $retValue );
	}
?>