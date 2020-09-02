var urlBase = 'http://COP4331-29.com/LAMPAPI';
var extension = 'php';

var userEmail = "";
var userName = "";
var firstName = "";
var lastName = "";


function doLogin()
{
	userEmail = "";
	firstName = "";
	lastName = "";
	
	var login = document.getElementById("loginName").value;
	var password = document.getElementById("loginPassword").value;
	var hash = md5( password );
	
	document.getElementById("loginResult").innerHTML = "";

	var jsonPayload = '{"login" : "' + login + '", "password" : "' + hash + '"}';
//	var jsonPayload = '{"login" : "' + login + '", "password" : "' + password + '"}';
	var url = urlBase + '/Login.' + extension;

	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, false);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.send(jsonPayload);
		
		var jsonObject = JSON.parse( xhr.responseText );
		
		userEmail = jsonObject.userEmail;
		
		if( userEmail === "")
		{
			document.getElementById("loginResult").innerHTML = "User/Password combination incorrect";
			return;
		}
		
		firstName = jsonObject.firstName;
		lastName = jsonObject.lastName;
		userName = jsonObject.userName;

		saveCookie();
	
		window.location.href = "output.html";
	}
	catch(err)
	{
		document.getElementById("loginResult").innerHTML = err.message;
	}
}


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

function doLogout()
{
	email = "";
	firstName = "";
	lastName = "";
	document.cookie = "firstName= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
	window.location.href = "index.html";
}


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
