
//run the LoadTable function when the page has loaded
$(document).ready(function () {
    //alert("hi"); checked the file is linked or not
    LoadTable();
});

const uri = "/api/Movies"; //the api as a global variable
// alert("API " + uri);
let allStaff = null; //holds the data in a global
//Loads up the <p id="counter"> </p> with a count of the staff, data come from the LoadTable Function where this is called
function getCount(data) {
    // alert("getcount " + datas);
    const theCount = $("#counter"); //bind TheCount to the counter
    if (data) { //if any data exists
        // alert("We have data " + data);
        theCount.text("There are " + data + " Staff");
    } else {
        theCount.text("There are no Staff");
        alert("No data");
    }
}
//this function reloads the table of staff after any changes
function LoadTable() {
    $.ajax({
        type: "GET", //use the GET controller
        url: uri, //the uri from the global
        cache: false, //don't cache the data in browser reloads, get a fresh copy
        success: function (data) { //if the request succeeds ....
            const tBody = $("#allStaff"); //for the tbody bind with allstaff <tbody id="allStaff"></tbody>
            allStaff = data; //pass in all the data to the global allstaff use it in Edit
            $(tBody).empty(); //empty out old data
            getCount(data.length); //count for the counter function
            //a foreach through the rows creating table data
            $.each(data,
                function (key, item) {
                    const tr = $("<tr></tr>")
                        .append($("<td></td>").text(item.title)) //inserts content in the tags
                        .append($("<td></td>").text(item.plot))
                        .append($("<td></td>").text(item.genre))
                        .append($("<td></td>").text(item.rating))
                        .append($("<td></td>")
                            .append($("<button href='#editEmployeeModal' class='btn-success' data-toggle='modal'><i class='material-icons' data-toggle='tooltip' title='Edit'>&#xE254;</i></button>)")
                                .on("click",
                                    function () {
                                        editItem(item.id);
                                    }) //in the empty cell append in an edititem button
                            )
                        )
                        .append(
                            $("<td></td>")
                                .append(
                                    $('<button  href="#deleteEmployeeModal" data-toggle="modal" class="btn-success" ><i class="material - icons" data-toggle="tooltip" title="Delete">&#xE872;</i></button>')
                                        .on("click", function () {
                                            $("#delete-id").val(item.id);
                                        }
                                            //in an empty cell add in a deleteitem button
                                        )
                                )
                        );
                    tr.appendTo(tBody);//add all the rows to the tbody
                });
        }
    });
}
//Add an person to the database
function addItem() {
    const item = {
        title: $("#add-title").val(),
        plot: $("#add-plot").val(),
           genre: $("#add-genre").val(),
        rating: $("#add-rating").val()
    };
    $.ajax({
        type: "POST", //this calls the POST in the API controller
        accepts: "application/json",
        url: uri,
        contentType: "application/json",
        data: JSON.stringify(item),
        //if there is an error
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Something went wrong!");
        },
        //if it is successful
        success: function (result) {
            LoadTable();
            $("#add-title").val(""); //clear entry boxes
            $("#add-plot").val("");
            $("#add-genre").val("");
            $("#add-rating").val("");
            alert("Staff added successfully");
        }
    });
}
//Delete a person from the database
function deleteItem(id) {

    $.ajax({
        url: uri + "/" + id, //add the ID to the end of the URI
        type: "DELETE", //this calls the DELETE in the API controller
        success: function (result) {
            LoadTable();
        }
    });
}
//click event for edit button to load details into form. Go through each entry held in allStaff and add in the one that matches the id from the click
function editItem(id) {
    $.each(allStaff,
        function (key, item) {
            if (item.id === id) {//where the ID == the one on the click
                $("#edit-title").val(item.title); //add it to the form field
                $("#edit-id").val(item.id);
                $("#edit-plot").val(item.plot);
                $("#edit-genre").val(item.genre);
                $("#edit-rating").val(item.rating);;
            }
        });
}
//$(".my-form").on("submit", //saving the edit to the db
function saveItem() {
    const item = { //pass all the data on the form to a variable called item use later to send to server
        title: $("#edit-title").val(),
        plot: $("#edit-plot").val(),
        genre: $("#edit-genre").val(),
        rating: $("#edit-rating").val(),
        id: $("#edit-id").val()
        
    };
    alert("Successfully saved");
    $.ajax({
        url: uri + "/" + $("#edit-id").val(), //add the row id to the uri
        type: "PUT", //send it to the PUT controller
        accepts: "application/json",
        contentType: "application/json",
        data: JSON.stringify(item), //take the item data and pass it to the serever data is moved to server
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Something went wrong!");
        },
        success: function (result) {

            LoadTable(); //load the table afresh
        }
    });
    return false;
};
