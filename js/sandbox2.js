
// Mock JSON data
var myArray = [
    {'fname':"Michael",'lname':"Oswald",'address':"123 street",'phone':"352-87-9780",'email':'knights.edu', 'date': new Date()},
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

    for(let i = 0; i < data.length; i++)
    {
        let row = `<tr>
                        <td>${data[i].fname + " " + data[i].lname}</td>
                    </tr>`
        table.innerHTML += row;
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
        $("#myTable").hide();
        $(this).data('order','hide');
    }
    else
    {
        $("#myTable").show();
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
