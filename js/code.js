var urlBase = 'http://COP4331-29.com/LAMPAPI';
var extension = 'php';

var userEmail = "";
var userName = "";
var firstName = "";
var lastName = "";



/*-------------- Login Functions------------------------------ */

// When user clicks log in button, we execute this.
function doLogin()
{
	userEmail = "";
	firstName = "";
	lastName = "";
	
	// Gets values from form fields(username, password, etc)
	var login = document.getElementById("loginName").value;
	var password = document.getElementById("loginPassword").value;
	var hash = md5( password );
	
	// Reset feedback/error field to empty string
	// We will write to this field if the user needs to know something.
	document.getElementById("loginResult").innerHTML = "";

	// Create a template object string to pass to the backend
	var jsonPayload = '{"login" : "' + login + '", "password" : "' + hash + '"}';
//	var jsonPayload = '{"login" : "' + login + '", "password" : "' + password + '"}';
	var url = urlBase + '/Login.' + extension;

	// This is how we are sending data to backend and vice versa
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, false);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		// template object that we created is being send to backend
		xhr.send(jsonPayload);
		
		// Getting the object back from backend
		var jsonObject = JSON.parse( xhr.responseText );
		
		// Grab the user name from the DB
		userName = jsonObject.userName;
		
		// if there is no username, we didn't get a row back from the db, so the user either doesn't exist
		// or userName/Pwd combination is not correct
		if( userName === "")
		{
			document.getElementById("loginResult").innerHTML = "User/Password combination incorrect";
			return;
		}
		
		// Extracting fields from returned object from backend
		firstName = jsonObject.firstName;
		lastName = jsonObject.lastName;
		userEmail = jsonObject.userEmail;

		saveCookie();
	
		window.location.href = "output.html";
	}
	catch(err)
	{
		document.getElementById("loginResult").innerHTML = err.message;
	}
}


// When user clicks log out, we execute this.
function doLogout()
{
	email = "";
	firstName = "";
	lastName = "";
	document.cookie = "firstName= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
	window.location.href = "index.html";
}

// When user clicks register, we do this.
function doRegister()
{
	userEmail = document.getElementById("userEmail").value;
	userName = document.getElementById("userName").value;
	firstName = document.getElementById("firstName").value;
	lastName = document.getElementById("lastName").value;
	var password = document.getElementById("password").value;
	var hash = md5( password );
	
	document.getElementById("registerResult").innerHTML = "";

	var jsonPayload = '{"userEmail" : "' + userEmail + '", "userName":"' + userName + '", "password" : "' + hash + '", "firstName" : "' + firstName +'", "lastName" : "' + lastName + '"}';
//	var jsonPayload = '{"login" : "' + login + '", "password" : "' + password + '"}';
	var url = urlBase + '/Register.' + extension;

	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, false);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.send(jsonPayload);
		
		var jsonObject = JSON.parse( xhr.responseText );
		
		if( jsonObject.error)
		{
			document.getElementById("registerResult").innerHTML = jsonObject.error;
			return;
		}

        userEmail = jsonObject.userEmail;
		userName = jsonObject.userName;
		firstName = jsonObject.firstName;
		lastName = jsonObject.lastName;

		saveCookie();
	
		window.location.href = "output.html";
	}
	catch(err)
	{
		document.getElementById("registerResult").innerHTML = err.message;
	}
}


/*-------------------------------------------------------------*/


/*----------------Cookie Functions------------------------------*/

function saveCookie()
{
	var minutes = 20;
	var date = new Date();
	date.setTime(date.getTime()+(minutes*60*1000));	
	document.cookie = "firstName=" + firstName + ",lastName=" + lastName + ",userName=" + userName + ",userEmail=" + userEmail + ";expires=" + date.toGMTString();
}


function readCookie()
{
	userEmail = "";
	var data = document.cookie;
	var splits = data.split(",");
	for(var i = 0; i < splits.length; i++) 
	{
		var thisOne = splits[i].trim();
		var tokens = thisOne.split("=");
		if( tokens[0] == "firstName" )
		{
			firstName = tokens[1];
		}
		else if( tokens[0] == "lastName" )
		{
			lastName = tokens[1];
		}
		else if( tokens[0] == "userName" )
		{
			userName = tokens[1];
		}
		else if( tokens[0] == "userEmail" )
		{
			userEmail = tokens[1];
		}
	}
	
	if( userEmail === "")
	{
		window.location.href = "index.html";
	}
	else
	{
		document.getElementById("fullName").innerHTML = "Name: " + firstName + " " + lastName;
		document.getElementById("userName").innerHTML = "userName: " + userName;
		document.getElementById("userEmail").innerHTML = "userEmail: " + userEmail;
	}
}
/*------------------------------------------------------------*/
