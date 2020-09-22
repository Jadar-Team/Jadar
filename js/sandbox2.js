
// Mock JSON data
var myArray = [
    {
      'fname':"Michael",
      'lname':"Oswald",
      'address':"123 street",
      'phone':"352-87-9780",
      'email':'knights.edu',
      'date': new Date()
    },
    {'fname':"Mila",'lname':"Potter",'address':"123 street",'phone':"352-87-9780",'email':'knights.edu', 'date' : new Date()},
    {'fname':"Paul",'lname':"Stark",'address':"123 street",'phone':"352-87-9780",'email':'knights.edu', 'date' : new Date()},
    {'fname':"James",'lname':"Scott",'address':"123 street",'phone':"352-87-9780", 'email': 'knights.edu', 'date' : new Date()}
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
                          <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-house-door-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                          <path d="M6.5 10.995V14.5a.5.5 0 0 1-.5.5H2a.5.5 0 0 1-.5-.5v-7a.5.5 0 0 1 .146-.354l6-6a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 .146.354v7a.5.5 0 0 1-.5.5h-4a.5.5 0 0 1-.5-.5V11c0-.25-.25-.5-.5-.5H7c-.25 0-.5.25-.5.495z"/>
                          <path fill-rule="evenodd" d="M13 2.5V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"/>
                        </svg>
                              ${data[i].address + " | " + data[i].phone + " | " + data[i].email}
                            </div>
                            </div>
                      </div>
                     </div>
                    </td>
                    <td>
                    <svg style = "visibility:hidden" width="1.5em" height="1.5em" viewBox="0 0 16 16" class="bi bi-trash-fill hover-buttons" id = "delete-button" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"/>
                    </svg>
                    <svg style = "visibility:hidden" width="1.5em" height="1.5em" viewBox="0 0 16 16" class="bi bi-pencil-fill hover-buttons" id = "edit-button" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                    </svg>
                    <svg style = "visibility:hidden" width="1.5em" height="1.5em" viewBox="0 0 16 16" class="bi bi-info-circle-fill hover-buttons" id = "info-button" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM8 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                    </svg>
                    </td>
                    </tr>`

        table.innerHTML += row;

        // Add hover event to each row
        $( "#myTable tr" ).hover(
            function()
            {
                let icons = $(this).find("td svg");
                console.log(icons);

                for(icon in icons)
                {
                    icons[icon].style = "visibility: visible";
                }
            },
            function()
            {
                let icons = $(this).find("td svg");

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
        myArray = myArray.sort((a,b) => a.lname > b.lname ? 1 : -1);
    }
    else
    {
        $(this).data('order','first')
        myArray = myArray.sort((a,b) => a.fname > b.fname ? 1 : -1);
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

    if(order == 'show')
    {
        $(".collapse").hide();
        $(this).data('order','hide');
    }
    else
    {
        $(".collapse").show();
        $(this).data('order','show');
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
