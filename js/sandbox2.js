
// Mock JSON data
var myArray = [
    {'fname':"Michael",'lname':"Gullo",'address':"123 street",'phone':"352-87-9780",'email':'knights.edu'},
    {'fname':"Mila",'lname':"Gullo",'address':"123 street",'phone':"352-87-9780",'email':'knights.edu'},
    {'fname':"Paul",'lname':"Gullo",'address':"123 street",'phone':"352-87-9780",'email':'knights.edu'},
    {'fname':"James",'lname':"Gullo",'address':"123 street",'phone':"352-87-9780", 'email': 'knights.edu'} 
];

const keys = Object.keys(myArray[0]);

for(let i = 0; i< keys.length; i++)
{
    console.log(keys[i]);
}

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
        var name = data[i].name.toLowerCase();

        if(name.includes(value))
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

    data = data.sort((a,b) => a.name > b.name ? 1 : -1);

    for(let i = 0; i < data.length; i++)
    {
        let row = `<tr>
                        <td>${data[i].fname + " " + data[i].lname}</td>
                    </tr>`
        table.innerHTML += row;
    }
}

buildTable(myArray);


// Adding a contact into the table
$("#confirm-add").click(function()
{
            const keys = ['fname','lname','address','phone','email'];
   
            let tempObject = {};

            // Grabs input from each form field
            $(".modal-body .form-control").each(function(index)
            {
                tempObject[myKeys[index]] = $(this).val(); 
            })

            // Will eventually be a server call here
            myArray.push(tempObject2);

            let markup = "<tr><td>" + tempObject2.fname + "</td></tr>";
            
            $("table tbody").append(markup);
});


class User
{
    constructor(fname,lname,address,phone,email)
    {
        this.fname = fname;
        this.lname = lname;
        this.address = address;
        this.phone = phone;
        this.email = email;
    }

    
}