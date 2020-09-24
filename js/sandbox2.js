
// Mock JSON data
// var myArray = [
//     {'fname':"Michael",'lname':"Oswald",'address':"123 street",'phone':"352-87-9780",'email':'knights.edu', 'date': new Date()},
//     {'fname':"Mila",'lname':"Potter",'address':"123 street",'phone':"352-87-9780",'email':'knights.edu', 'date' : new Date()},
//     {'fname':"Paul",'lname':"Stark",'address':"123 street",'phone':"352-87-9780",'email':'knights.edu', 'date' : new Date()},
//     {'fname':"James",'lname':"Scott",'address':"123 street",'phone':"352-87-9780", 'email': 'knights.edu', 'date' : new Date()}
// ];


// with updated address
var myArray = [
    {'fname':"Anton",'lname':"Fuentas",'street':"673 Bayport Drive",'city':"Ridgewood",
  'state':"NJ",'zip':"07450",'phone':"414-481-8030",'email':"anton.fuentes34@hotmail.com"}
];

// Sort JSON data
myArray = myArray.sort((a,b) => a.fname > b.fname ? 1 : -1);

// Build Table
buildTable(myArray);

// On keyup, we run this function
$('#search-bar').on('keyup',function(){
    var value = $(this).val();
    console.log('Value:', value);

    var data = searchTable(value, myArray);
    buildTable(data);
})

// Function that does search
function searchTable(value, data )
{
    var filteredData = [];

    for(var i = 0; i < data.length; i++)
    {
        value = value.toLowerCase();
        var fname = data[i].fname.toLowerCase();
        var lname = data[i].lname.toLowerCase();

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
        let row = `<tr>
                   <td>
                    <div class="accordion">
                      <div class = "card-transparent">
                          <div class="card-header info-card" id="contactName">
                            ${data[i].fname + " " + data[i].lname}
                          </div>
                          <div id="collapseInfo" class="collapse hide" aria-labelledby="contactName" data-parent="#showHide">
                          <div class="card-body">
                            <div id = "address-block">
                              <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-house-door-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                              <path d="M6.5 10.995V14.5a.5.5 0 0 1-.5.5H2a.5.5 0 0 1-.5-.5v-7a.5.5 0 0 1 .146-.354l6-6a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 .146.354v7a.5.5 0 0 1-.5.5h-4a.5.5 0 0 1-.5-.5V11c0-.25-.25-.5-.5-.5H7c-.25 0-.5.25-.5.495z"/>
                              <path fill-rule="evenodd" d="M13 2.5V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"/>
                            </svg>
                              ${data[i].street}
                              <p>${data[i].city + ", " + data[i].state + " " + data[i].zip}</p>
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
                              ${data[i].email}
                              </br>
                              </div>
                            </div>
                            </div>
                      </div>
                     </div>
                    </td>
                    <td>
                        <div class = "iconSet">
                            <svg style = "visibility:hidden" width="1.5em" height="1.5em" viewBox="0 0 16 16" class="bi bi-trash-fill hover-buttons" id = "delete-button" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"/>
                            </svg>
                            <svg style = "visibility:hidden" width="1.5em" height="1.5em" viewBox="0 0 16 16" class="bi bi-pencil-fill hover-buttons" id = "edit-button" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                            </svg>
                            <svg style = "visibility:hidden" width="1.5em" height="1.5em" viewBox="0 0 16 16" class="bi bi-info-circle-fill hover-buttons" id = "info-button" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM8 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                            </svg>
                        </div>
                    </td>
                    </tr>`

        table.innerHTML += row;

        // Add hover event to each row
        $( "#myTable tr" ).hover(
            function()
            {
                let icons = $(this).find("td .iconSet svg");
                console.log(icons);

                for(icon in icons)
                {
                    icons[icon].style = "visibility: visible";
                }
            },
            function()
            {
                let icons = $(this).find("td .iconSet svg");

                for(icon in icons)
                {
                    icons[icon].style = "visibility: hidden";
                }
            }
          );
    }
}


// Toggle between sorting in ascending order first name and last name
$("#firstLastName").click(function()
{
    var order = $(this).data('order');

    if(order == 'first')
    {
        $(this).data('order','last')
        myArray = myArray.sort((a,b) => a.lname.toLowerCase > b.lname.toLowerCase ? 1 : -1);
    }
    else
    {
        $(this).data('order','first')
        myArray = myArray.sort((a,b) => a.fname.toLowerCase > b.fname.toLowerCase ? 1 : -1);
    }

    buildTable(myArray);
})

// addContact button- clears out form fields
$("#addContact").click(function()
{
     // Grabs input from each form field
     $(".modal-body .form-control").each(function(index)
     {
         $(this).val('');
     })
})

// recentlyAdded button - sorts users by recently added
$("#recentlyAdded").click(function()
{
    console.log("This is firing at least");
    myArray = myArray.sort((a,b) => {
                                let dateA = new Date(a.date);
                                let dateB = new Date(b.date);
                                return dateB - dateA;
                        });

    buildTable(myArray);
    console.log(myArray);
})

// confirm button - modal button that adds user to database
$("#confirm-add").click(function()
{

            const keys = ['fname','lname','address','phone','email','date'];

            let tempObject = {};

            let flag = true;

            // Grabs input from each form field
            $(".modal-body .form-control").each(function(index)
            {
                // Captures empty fields
                if(!$(this).val())
                {
                    flag = false;
                    return false;
                }

                tempObject[keys[index]] = $(this).val();
            })

            // Report any errors
            if(!flag)
            {
                console.log("Empty field");
                return;
            }

            // Add date
            tempObject['date'] = new Date();

            // Will eventually be a server call here
            myArray.push(tempObject);

            buildTable(myArray);
});

// show/hide button - This will Show and hide the table
$("#showHide").click(function()
{
    let order = $(this).data('order');

    if(order == 'hide')
    {
        $(".collapse").show();
        $(this).data('order','show');
    }
    else
    {
        $(".collapse").hide();
        $(this).data('order','hide');
    }

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
