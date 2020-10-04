// Globals - do not modify these variables
// You are only allowed to grab data from these. Do not actually point to it.

var global_row_index = 0;

var globalTableArray = [];

var globalFilter = [];

// On keyup inside search bar, we run this function
$('#search-bar').on('keyup',function(){

    var value = $(this).val();

    globalFilter = searchTable(value, globalTableArray);
    buildTable(globalFilter);
})


// This function is a callback that gives us the table from database
function getDatabaseTable()
{
    var url =  "http://COP4331-29.com/LAMPAPI/ContactSearch2.php";

    var obj = `{
        "userName": "${userName}",
        "firstName": "",
        "lastName": ""
      }`;

    var xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

    try
    {
        xhr.onreadystatechange = function()
        {

            if((xhr.readyState === 4) && (xhr.status === 200))
            {
                var jsonObject = JSON.parse(xhr.responseText);
                globalTableArray = jsonObject.contacts;
                console.log(jsonObject.contacts);

                if(globalTableArray == undefined || globalTableArray.length < 1)
                {
                    $("#myTable").html("<h1> No Contacts </h1>");
                }
                else
                {
                    globalTableArray = globalTableArray.sort((a,b) => a.firstName.toLowerCase() > b.firstName.toLowerCase() ? 1 : -1);

                    buildTable(jsonObject.contacts);
                }
            }
        }

        $("#myTable").html("<h1>Loading...</h1>");

        xhr.send(obj);
    }
    catch(err)
    {
        console.log(err);
    }
}



// IMPORTANT functions have to load before we use cookie(username, etc)
window.onload = function()
{
        if(userName != "")
            $("#usernameDisplay").text(userName);

        getDatabaseTable();

       console.log(globalTableArray);

}



// Function that does search
function searchTable(value, data )
{
    var filteredData = []

    for(var i = 0; i < data.length; i++)
    {
        value = value.toLowerCase();
        var fname = data[i].firstName.toLowerCase();
        var lname = data[i].lastName.toLowerCase();

        if(fname.includes(value) || lname.includes(value))
        {
            filteredData.push(data[i]);

        }
    }

    return filteredData;
}


// Function that populates table with json data
function buildTable(data)
{
    var table = document.getElementById('myTable');
    table.innerHTML= "";

    // Add icon set to each row but hide them
    for(let i = 0; i < data.length; i++)
    {
        // street, city state, zip country
        let addressSet1 = globalTableArray[i].address.split(",");
        // city state
        let addressSet2 = addressSet1[1].split(" ");

        let zip = addressSet1[2].substring(0,addressSet1[2].indexOf(" "));

       let fullAddress = `${addressSet1[0]}
       <p>${addressSet2[0]+ ", " + addressSet2[1] + " " + zip}</p>`
        let row = `<tr>
                   <td>
                    <div class="accordion">
                      <div class = "card-transparent border-0">
                          <div class="card-header info-card" id="contactName">
                            ${data[i].firstName + " " + data[i].lastName}
                          </div>
                          <div id="collapseInfo" class="collapse hide" aria-labelledby="contactName" data-parent="#showHide">
                          <div class="card-body">
                            <div id = "address-block">
                              <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-house-door-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                              <path d="M6.5 10.995V14.5a.5.5 0 0 1-.5.5H2a.5.5 0 0 1-.5-.5v-7a.5.5 0 0 1 .146-.354l6-6a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 .146.354v7a.5.5 0 0 1-.5.5h-4a.5.5 0 0 1-.5-.5V11c0-.25-.25-.5-.5-.5H7c-.25 0-.5.25-.5.495z"/>
                              <path fill-rule="evenodd" d="M13 2.5V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"/>
                            </svg>
                              ${fullAddress}
                            </div>
                            <div id = "phone-email-block">
                          <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-telephone-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd" d="M2.267.98a1.636 1.636 0 0 1 2.448.152l1.681 2.162c.309.396.418.913.296 1.4l-.513 2.053a.636.636 0 0 0 .167.604L8.65 9.654a.636.636 0 0 0 .604.167l2.052-.513a1.636 1.636 0 0 1 1.401.296l2.162 1.681c.777.604.849 1.753.153 2.448l-.97.97c-.693.693-1.73.998-2.697.658a17.47 17.47 0 0 1-6.571-4.144A17.47 17.47 0 0 1 .639 4.646c-.34-.967-.035-2.004.658-2.698l.97-.969z"/>
                        </svg>
                              ${data[i].phone}

                          <br>
                        <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-envelope-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555zM0 4.697v7.104l5.803-3.558L0 4.697zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757zm3.436-.586L16 11.801V4.697l-5.803 3.546z"/>
                        </svg>
                              ${data[i].contactEmail}
                              </br>
                              </div>
                            </div>
                            </div>
                      </div>
                     </div>
                    </td>
                    <td>
                        <div class = "iconSet" style = "visibility: hidden;">

							<svg type= "button" width="1.5em" height="1.5em" viewBox="0 0 16 16" class="bi bi-trash-fill hover-buttons" id = "delete-button" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
							<path fill-rule="evenodd" d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"/>
							</svg>

                            <svg type= "button" width="1.5em" height="1.5em" viewBox="0 0 16 16" class="bi bi-pencil-fill hover-buttons" id = "edit-button" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                            </svg>


                            <svg type= "button" width="1.5em" height="1.5em" viewBox="0 0 16 16" class="bi bi-info-circle-fill hover-buttons" id = "info-button" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM8 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                            </svg>


                        </div>
                    </td>
                    </tr>`
        table.innerHTML += row;

    }

            // Add hover event to each row
            $( "#myTable tr" ).hover(
                function()
                {
                    $(this).find(".iconSet").css("visibility","visible");

                },
                function()
                {
                    $(this).find(".iconSet").css("visibility", "hidden");
                }
              );

			  //Show/Hide icon
              $(".iconSet svg:nth-child(3)").click(function()
              {
                    // selects the current row
                    let clickedRow = $(this).closest("tr");

                    // stores the row index
                    row_index = clickedRow.index();

                    clickedRow.find(".collapse").toggle();

              });


              // Edit icon
              $(".iconSet svg:nth-child(2)").click(function()
              {
                   
                    // Grabs current row index
                    global_row_index = $(this).closest("tr").index();

                    let myModal = $("#edit-contact");

                    let inputs = myModal.find("input");

                    // Store array element contents into input fields
                    inputs[0].value = globalTableArray[global_row_index].firstName; // firstname
                    inputs[1].value = globalTableArray[global_row_index].lastName; // lastname
                    inputs[2].value = globalTableArray[global_row_index].phone; // phone
                    inputs[3].value = globalTableArray[global_row_index].contactEmail; // email

                    // street, city state, zip country
                    let addressSet1 = globalTableArray[global_row_index].address.split(",");
                    // city state
                    let addressSet2 = addressSet1[1].split(" ");

                    let zip = addressSet1[2].substring(0,addressSet1[2].indexOf(" "));
                    let country = addressSet1[2].substring(addressSet1[2].indexOf(" ")+1);

                    inputs[4].value = addressSet1[0]; // street
                    inputs[5].value = addressSet2[0]; // city
                    inputs[6].value = addressSet2[1]; // state
                    inputs[7].value = zip; // zip
                    inputs[8].value = country; // country

                    formEditErrorChecking();

                    console.log("inside edit icon");

                    $('.edit-sidebar').addClass('active');
                    $('.overlay').addClass('active');

              });

              // Trash icon
              $(".iconSet svg:nth-child(1)").click(function()
              {

                // stores the row index
                global_row_index = $(this).closest("tr").index();

                let inputs = $("#deleteContactInfo div");

                console.log(inputs);

                $(inputs[0]).text(globalTableArray[global_row_index].firstName + " " +  globalTableArray[global_row_index].lastName);

                $(inputs[1]).text(globalTableArray[global_row_index].address);

                $(inputs[2]).text(globalTableArray[global_row_index].phone);

                $(inputs[3]).text(globalTableArray[global_row_index].contactEmail);
                
                // opening the sidebar
                $('.delete-sidebar').addClass('active');
                $('.overlay').addClass('active');

              });

}

function deleteContact(contactId)
{

    var url =  "http://COP4331-29.com/LAMPAPI/ContactDelete.php";
    var obj;

    if($('#search-bar').val() == "")
        obj = `{ "userName": "${userName}","contactId": "${globalTableArray[global_row_index].contactId}"}`;
    else
        obj = `{ "userName": "${userName}","contactId": "${globalFilter[global_row_index].contactId}"}`;


    var xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");


    try
    {
        xhr.onreadystatechange = function()
        {
            if((xhr.readyState === 4) && (xhr.status === 200))
            {
                var jsonObject = JSON.parse(xhr.responseText);

                console.log(jsonObject);
                console.log("inside delete contact function" + userName);
                getDatabaseTable();
                $('#search-bar').val("");
            }
        }

        xhr.send(obj);
    }
    catch(err)
    {
        console.log(err);
    }

}

// Edit Confirm button - updates conact in database and table
$("#confirm-edit").click(function()
{
    var url =  "http://COP4331-29.com/LAMPAPI/ContactEdit.php";

    let myModal = $("#edit-contact");

    let inputs = myModal.find("input");

    // Remove white space from both sides of input
    $(inputs).each(function(index,element)
    {
        $(this).val($.trim($(this).val()));
    });

    var jsonPayload =  `{"contactId":"${globalTableArray[global_row_index].contactId}","userName": "${userName}", "firstName": "${inputs[0].value}", "lastName":"${inputs[1].value}" , "contactEmail":"${inputs[3].value}" ,"address":"${inputs[4].value},${inputs[5].value} ${inputs[6].value},${inputs[7].value} ${inputs[8].value}", "phone": "${inputs[2].value}"}`;

    let result = formEditErrorChecking();

    if(result == 0)
        return;
    
    //let errors = $("#edit-contact p");


    // for(let i = 0; i < errors.length; i++)
    // {
    //     if($(errors[i]).css('display') != 'none')
    //     {
    //         console.log("Error in confirm edit!");
    //         return;
    //     }
    // }

    // request
    var xhr = new XMLHttpRequest();

    // open async
    xhr.open("POST", url);

    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    try
    {
        // Once we have the complete data, proceed with operations.
        xhr.onreadystatechange = function()
        {
            if((xhr.readyState === 4) && (xhr.status === 200))
            {
                var jsonObject = JSON.parse(xhr.responseText);

                console.log("Confirm Edit");
                console.log(jsonObject);
                console.log(jsonObject.userName);
                getDatabaseTable();
            }
        };
        // send the data to the backend
        xhr.send(jsonPayload);
    }
    catch(err)
    {
        console.log(userName);
        console.log("Confirm add Error");
        console.log(err.message);
    }

    // closing sidebar menu
    $('.edit-sidebar').removeClass('active');
    $('.overlay').removeClass('active');

});


// Toggle between sorting in ascending order first name and last name
$("#firstLastName").click(function()
{
    if(globalTableArray == undefined || globalTableArray.length < 1)
        return;

    var order = $(this).data('order');

    // Search bar empty or has content?
    var flag = ($("#search-bar").val() == "") ? 1 : 0;

    if(order == 'first')
    {
        $(this).data('order','last')

        if(flag)
            globalTableArray = globalTableArray.sort((a,b) => a.lastName.toLowerCase() > b.lastName.toLowerCase() ? 1 : -1);
        else
            globalFilter = globalFilter.sort((a,b) => a.lastName.toLowerCase() > b.lastName.toLowerCase() ? 1 : -1);
    }
    else
    {
        $(this).data('order','first')

        if(flag)
            globalTableArray = globalTableArray.sort((a,b) => a.firstName.toLowerCase() > b.firstName.toLowerCase() ? 1 : -1);
        else
            globalFilter = globalFilter.sort((a,b) => a.firstName.toLowerCase() > b.firstName.toLowerCase() ? 1 : -1);

        console.log(globalTableArray);
    }

    // If search is empty use global array else use global filter
    if (flag)
        buildTable(globalTableArray);
    else
        buildTable(globalFilter);
})

// addContact button- clears out form fields
$("#addContact").click(function()
{
     // Grabs input from each form field
     $(".add-info .form-control").each(function(index)
     {
         $(this).val('');
     })
});

// recentlyAdded button - sorts users by recently added
$("#recentlyAdded").click(function()
{
    if(globalTableArray == undefined || globalTableArray.length < 1)
        return;

    var flag = ($("#search-bar").val() == "") ? 1 : 0;

    if(flag)
    {
        globalTableArray = globalTableArray.sort((a,b) => {
            let dateA = new Date(a.dateCreated);
            let dateB = new Date(b.dateCreated);
            return dateB - dateA;
         });
    }
    else
    {
        globalFilter = globalFilter.sort((a,b) => {
            let dateA = new Date(a.dateCreated);
            let dateB = new Date(b.dateCreated);
            return dateB - dateA;
         });
    }

    if(flag)
        buildTable(globalTableArray);
    else
        buildTable(globalFilter);
})

// confirm button - modal button that adds user to database

$("#confirm-add").click(function()
{
        var url =  "http://COP4331-29.com/LAMPAPI/ContactAdd.php";

        let myModal = $("#add-contact");

        let inputs = myModal.find("input");

        $(inputs).each(function(index,element)
        {
            $(this).val($.trim($(this).val()));
        });

        console.log(inputs);

        var jsonPayload =  `{"userName": "${userName}", "firstName": "${inputs[0].value}", "lastName":"${inputs[1].value}" , "contactEmail":"${inputs[3].value}" ,"address":"${inputs[4].value},${inputs[5].value} ${inputs[6].value},${inputs[7].value} ${inputs[8].value}", "phone": "${inputs[2].value}"}`;

        // request
        var xhr = new XMLHttpRequest();

        // open async
        xhr.open("POST", url);

        let result = formAddErrorChecking();

        if(result == 0)
            return;
                
        //let errors = $("#edit-contact p");
    
        // for(let i = 0; i < errors.length; i++)
        // {
        //     if($(errors[i]).css('display') != 'none')
        //     {
        //         console.log("Error in confirm add!");
        //         return;
        //     }
        // }
    
        xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
        try
        {
            // Once we have the complete data, proceed with operations.
            xhr.onreadystatechange = function()
            {
                if((xhr.readyState === 4) && (xhr.status === 200))
                {
                    var jsonObject = JSON.parse(xhr.responseText);

                    console.log("Confirm add");
                    console.log(jsonObject);
                    console.log(jsonObject.userName);
                    console.log(jsonObject.address);
                    getDatabaseTable();
                }
            };
            // send the data to the backend
            xhr.send(jsonPayload);
        }
        catch(err)
        {
            console.log(userName);
            console.log("Confirm add complete");
            console.log(err.message);
        }


        // closing sidebar menu
        $('.add-sidebar').removeClass('active');
        $('.overlay').removeClass('active');

});



$('#confirm-cancel-add').click(function()
{
    
    $("#add-contact p").css("display","none");

  $('.add-sidebar').removeClass('active');
  $('.overlay').removeClass('active');
});

$('#confirm-cancel-edit').click(function()
{
  $('.edit-sidebar').removeClass('active');
  $('.overlay').removeClass('active');
});


$("#confirm-delete").click(function()
{

    deleteContact(globalTableArray[global_row_index].contactId);

    // closing the delete sidebar
    $('.delete-sidebar').removeClass('active');
    $('.overlay').removeClass('active');
});

$('#confirm-cancel-delete').click(function()
{
  $('.delete-sidebar').removeClass('active');
  $('.overlay').removeClass('active');
});



// show/hide button - This will Show and hide the table
$("#showHide").click(function()
{
    if(globalTableArray == undefined || globalTableArray.length < 0)
        return;

    $(".collapse").toggle();

})


// Am/Pm conversion function
function displayAmPm(users)
{
    for(let i = 0; i < users.length; i++)
    {
        var hours = users[i].date.getHours();
        var minutes = users[i].date.getMinutes();
        var seconds = users[i].date.getSeconds();

        var ap = "AM";

        // Hours
        if(hours > 12)
        {
            ap = "PM";
            hours -= 12;
        }

        // Minutes
        if(minutes < 10)
        {
            hours = "0" + hours;
        }

        // Seconds
        if(seconds < 10)
        {
            minutes = "0" + seconds;
        }

        let formattedTime = hours + ":" + minutes + ":" + seconds + " " + ap;

        console.log(formattedTime);
    }
}

// Sidebar menu
$('#addContact').on('click', function() {
    $('.add-sidebar').addClass('active');
    $('.overlay').addClass('active');

    $(".form-control").each(function(index)
    {
        $(this).val('');
    })
});


/* ---Edit Validation events--*/
// first and last name
$("#edit-firstname").on('input', function(){inputValidation(this,"#error-edit-firstname",[1,1,0,0])});
$("#edit-lastname").on('input', function(){inputValidation(this,"#error-edit-lastname",[1,1,0,0])});

// Email
$("#edit-email").on('input', function(){inputValidation(this,"#error-edit-email",[1,0,0,0])});
$("#edit-email").focusout(function(){emailValidation(this,"#error-edit-email");});

// Phone
$("#edit-phone").on('input',function(evt){
    let phone = this;
    console.log(this);
    $(phone).val(phoneFormat(phone, "#error-edit-phone"));
});

/* Address Edit */
// zip

$("#editStreet").on('input', function(){inputValidation(this,"#error-edit-address",[0,0,0,0])});
$("#editZip").on('input', function(){inputValidation(this,"#error-edit-address",[1,0,1,0])});
$("#editState").on('input', function(){inputValidation(this,"#error-edit-address",[1,1,0,0])});
$("#editCity").on('input', function(){inputValidation(this,"#error-edit-address",[1,1,0,0])});
$("#editCountry").on('input', function(){inputValidation(this,"#error-edit-address",[0,1,0,0])});

/*---Add Validation Events--- */
// First and Last name
$("#add-firstname").on('input', function(){inputValidation(this,"#error-add-firstname",[1,1,0,0])});
$("#add-lastname").on('input', function(){inputValidation(this,"#error-add-lastname",[1,1,0,0])});

// Email
$("#add-email").on('input', function(){inputValidation(this,"#error-add-email",[1,0,0,0])});
$("#add-email").focusout(function(){emailValidation(this,"#error-add-email");});

// Phone
$("#add-phone").on('input',function(evt){
    let phone = this;
    console.log(this);
    $(phone).val(phoneFormat(phone,"#error-add-phone"));
});

/* Address Add */
// zip
$("#inputStreet").on('input', function(){inputValidation(this,"#error-add-address",[0,0,0,0])});
$("#inputZip").on('input', function(){inputValidation(this,"#error-add-address",[1,0,1,0])});
$("#inputState").on('input', function(){inputValidation(this,"#error-add-address",[1,1,0,0])});
$("#inputCity").on('input', function(){inputValidation(this,"#error-add-address",[1,1,0,0])});
$("#inputCountry").on('input', function(){inputValidation(this,"#error-add-address",[0,1,0,0])});



function inputValidation(sel,id,settings)
{
    // settings [0,0,0,0]
    // spaces, alpha, numeric, alphanumeric
    // toggle 1 if you want your input to have that feature(s)
    // e.g You want numbers and spaces only [1,0,1,0]

   
    $(sel).val($(sel).val().replace(/^\s+/,""));
    $(sel).val($(sel).val().replace(/\s+/g," "));
    
    let name = $(sel).val();
    let $error = $(id);
    let alphaExp = new RegExp(/^[a-zA-Z\s]+$/);
    let numExp = new RegExp(/^[0-9]+$/);
    let alphaNumeric = new RegExp(/^[a-zA-Z0-9]+$/);
    
    // No inputs
    if(name.length < 1)
    {
        $error.show();
        $error.text("Field is required");
        $(sel).css("background-color","pink");
        return 0;
    }
    // Spaces
    else if(settings[0] && name.split(" ").length != 1)
    {
        $error.show();
        $error.text("No spaces");
        $(sel).css("background-color","pink");
        return 0;
    }
    // Alpha character test
    else if(settings[1] && !alphaExp.test(name))
    {
        $error.show();
        $error.text("Only alpha characters");
        $(sel).css("background-color","pink");
        return 0;
    }
    // Numeric test
    else if(settings[2] && !numExp.test(name))
    {
        $error.show();
        $error.text("Only numbers");
        $(sel).css("background-color","pink");
        return 0;
    }
    // Alphanumeric test
    else if(settings[3] && !alphaNumeric.test(name))
    {
        $error.show();
        $error.text("Only alpha numeric characters");
        $(sel).css("background-color","pink");
        return 0;
    }
    else
    {
        $error.hide();
        $(sel).css("background-color","");
    }
}

function emailValidation(sel,id)
{
    let input = $(sel).val();
    let $error = $(id);
    let testExp = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);

    console.log("after trim:"+$(sel).val());
    $(sel).val($(sel).val().replace(/^\s+/,""));
    console.log("before trim:"+$(sel).val());

    if(!testExp.test(input))
    {
        $error.show();
        $error.text("Invalid email");
        $(sel).css("background-color","pink");
    }
    else
    {
        $error.hide();
        $(sel).css("background-color","");
    }
}

function phoneFormat(phone,error){

    let input = $(phone).val();
    
    input = input.replace(/\D/g,'');
    
    input = input.substring(0,10);

    if(input.length == 0){
            input = input;
            $(error).show();
            $(error).text("Field is required");
    }else if(input.length < 4){
            input = '('+input;
            $(error).hide();
    }else if(input.length < 7){
            input = '('+input.substring(0,3)+') '+input.substring(3,6);
            $(error).hide();
    }else{
            input = '('+input.substring(0,3)+') '+input.substring(3,6)+' - '+input.substring(6,10);
            $(error).hide();
    }
    return input; 
}

function formEditErrorChecking()
{
    let result = 1; 

    // first and last name
    if(result & inputValidation("#edit-firstname","#error-edit-firstname",[1,1,0,0]) == 0)
        return 0;

    if(result & inputValidation("#edit-lastname","#error-edit-lastname",[1,1,0,0]) == 0)
        return 0;


    // Phone
    (function()
    {
        let phone = $("#edit-phone");
        $(phone).val(phoneFormat(phone,"#error-edit-phone"));
    })();

    if($("#edit-phone").val() == 0 || $("#edit-phone").val().length < 16)
    {
        $("#error-edit-phone").text("Invalid phone number").show();
        return 0;
    }

    // Email
    if(result & inputValidation("#edit-email","#error-edit-email",[1,0,0,0]) == 0)
        return 0;

    if(result & emailValidation("#edit-email","#error-edit-email") == 0)
        return 0;

    /* Address */
    // zip
    if(result & inputValidation("#editStreet","#error-edit-address",[0,0,0,0]) == 0)
        return 0;
    if(result & inputValidation("#editZip","#error-edit-address",[1,0,1,0]) == 0)
        return 0;

    if(result & inputValidation("#editState","#error-edit-address",[1,1,0,0]) == 0)
        return 0;

    if(result & inputValidation("#editCity","#error-edit-address",[1,1,0,0]) == 0)
        return 0;
        
    if(result & inputValidation("#editCountry","#error-edit-address",[0,1,0,0]) == 0)
        return 0;
}

function formAddErrorChecking()
{
    let result = 1;

    // first and last name
    if(result & inputValidation("#add-firstname","#error-add-firstname",[1,1,0,0]) == 0)
            return 0;

    if(result & inputValidation("#add-lastname","#error-add-lastname",[1,1,0,0]) == 0)
        return 0;

    // Phone
    (function()
    {
        let phone = $("#add-phone");
        $(phone).val(phoneFormat(phone,"#error-add-phone"));
    })();


    if($("#add-phone").val() == 0 || $("#add-phone").val().length < 16)
    {
        $("#error-add-phone").text("Invalid phone number").show();
        return 0;
    }

    // Email
    if(result & inputValidation("#add-email","#error-add-email",[1,0,0,0]) == 0)
        return 0;

/* Form Validation */


    if(result & emailValidation("#add-email","#error-add-email") == 0)
        return 0;


    /* Address */
    // zip
    if(result & inputValidation("#inputStreet","#error-add-address",[0,0,0,0]) == 0)
        return 0;
    if(result & inputValidation("#inputZip","#error-add-address",[1,0,1,0]) == 0)
        return 0;

    if(result & inputValidation("#inputState","#error-add-address",[1,1,0,0]) == 0)
        return 0;

    if(result & inputValidation("#inputCity","#error-add-address",[1,1,0,0]) == 0)
        return 0;

    if(result & inputValidation("#inputCountry","#error-add-address",[0,1,0,0]) == 0)
        return 0;
}




