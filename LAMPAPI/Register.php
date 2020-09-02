<?php

    $inData = getRequestInfo();

    $userEmail = "";
    $userName = ""; 
    $password = "";
    $firstName = "";
    $lastName = "";
    
    $conn = new mysqli("localhost", "DomUserDB", "1209huis@.M", "UserDB");
    if ($conn->connect_error) 
    {
        returnWithError( $conn->connect_error );
    } 
    else
    {
        $sql = "SELECT UserEmail FROM UserTable where UserEmail='" . $inData["userEmail"] . "'";
        $result = $conn->query($sql);
        if ($result->num_rows > 0)
        {
            returnWithError( "Email taken. Please use a different email address." );
        }
        else
        {
            $sql = "SELECT UserName FROM UserTable where UserName='" . $inData["userName"] . "'";
            $result = $conn->query($sql);
            if ($result->num_rows > 0)
            {
                returnWithError( "Username taken. Please use a different user name." );
            }
            else
            {
                $userEmail = $inData["userEmail"];
                $userName = $inData["userName"];
                $password = $inData["password"];
                $firstName = $inData["firstName"];
                $lastName = $inData["lastName"];

                $sql = "INSERT INTO UserTable (UserEmail, UserName, Password, FirstName, LastName) VALUES ('" . $inData["userEmail"] . "','" . $inData["userName"] . "','" . $inData["password"] . "','" . $inData["firstName"] . "','" . $inData["lastName"] . "')";
                $result = $conn->query($sql);
                if ($result == TRUE)
                {
                    returnWithInfo($userEmail, $firstName, $lastName, $userName );
                }
                else
                {
                    returnWithError( "Insert failed!" );
                }
            }
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