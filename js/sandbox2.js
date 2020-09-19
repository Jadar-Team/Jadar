
// Mock JSON data
var myArray = [
    {'name':"Michael",'age':30, 'birthdate':'11/10/1989'},
    {'name':"Mila",'age':32, 'birthdate':'10/1/1989'},
    {'name':"Paul",'age':29, 'birthdate':'10/14/1940'},
    {'name':"James Porche", 'age':28, 'birthdate':'6/6/1992'}
];

// On keyup, we run this function
$('.form-control').on('keyup',function(){
    var value = $(this).val();
    console.log('Value:', value);

    var data = searchTable(value, myArray);
    buildTable(data);
})


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


$('th').on('click',function(){
    var column = $(this).data('column');
    var order = $(this).data('order');
    var text = $(this).html();

    console.log("Column was clicked", column, order);

    $(this).html(text);
    buildTable(myArray);
});

// Function that populates table with json data
function buildTable(data)
{
    var table = document.getElementById('myTable');
    table.innerHTML= "";

    for(let i = 0; i < data.length; i++)
    {
        let row = `<tr>
                        <td>${data[i].name}</td>
                    </tr>`
        table.innerHTML += row;
    }
}

buildTable(myArray);
