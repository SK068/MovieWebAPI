
//run the LoadTable function when the page has loaded
$(document).ready(function () {
    //alert("hi"); checked the file is linked or not
    LoadTable();
});

const uri = "/api/Movies"; //the api as a global variable
// alert("API " + uri);
let Movies = null; //holds the data in a global
//Loads up the <p id="counter"> </p> with a count of the staff, data come from the LoadTable Function where this is called
function getCount(data) {
    // alert("getcount " + datas);
    const theCount = $("#counting"); //bind TheCount to the counter
    if (data) { //if any data exists
        // alert("We have data " + data);
        theCount.text("There are " + data + " Movies");
    } else {
        theCount.text("There are no Movies");
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
            const tBody = $("#Movies"); //for the tbody bind with allstaff <tbody id="allStaff"></tbody>
            Movies = data; //pass in all the data to the global allstaff use it in Edit
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
                            .append($("<button href='#updateMovieModal' class='btn-success' data-toggle='modal'><i class='material-icons' data-toggle='tooltip' title='Edit'>&#xE254;</i></button>)")
                                .on("click",
                                    function () {
                                        updateMovie(item.id);
                                    }) //in the empty cell append in an edititem button
                            )
                        )
                        .append(
                            $("<td></td>")
                                .append(
                                    $('<button  href="#removeMovieModal" data-toggle="modal" class="btn-success" ><i class="material - icons" data-toggle="tooltip" title="Delete">&#xE872;</i></button>')
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
function addMovie() {
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
            alert("Movie added successfully");
        }
    });
}
//Delete a person from the database
function RemoveMovie(id) {

    $.ajax({
        url: uri + "/" + id, //add the ID to the end of the URI
        type: "DELETE", //this calls the DELETE in the API controller
        success: function (result) {
            LoadTable();
        }
    });
}
//click event for edit button to load details into form. Go through each entry held in allStaff and add in the one that matches the id from the click
function updateMovie(id) {
    
    $.each(Movies,
        function (key, item) {
                       
            if (item.id === id) {//where the ID == the one on the click
                $("#update-title").val(item.title); //add it to the form field
                $("#update-id").val(item.id);
                $("#update-plot").val(item.plot);
                $("#update-genre").val(item.genre);
                $("#update-rating").val(item.rating);;
            }
        });
}
//$(".my-form").on("submit", //saving the edit to the db
function saveItem() {
   
    const item = { //pass all the data on the form to a variable called item use later to send to server
        title: $("#update-title").val(),
        plot: $("#update-plot").val(),
        genre: $("#update-genre").val(),
        rating: $("#update-rating").val(),
        id: $("#update-id").val()
        
    };
    //alert(item.title + item.genre + item.plot + item.rating);
    
    $.ajax({
        url: uri + "/" +$("#update-id").val(), //add the row id to the uri
        type: "PUT", //send it to the PUT controller
        accepts: "application/json",
        contentType: "application/json",
        data: JSON.stringify(item), //take the item data and pass it to the serever data is moved to server
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Something went wrong!");
        },
        success: function (result) {
             alert("Successfully updated");
            LoadTable(); //load the table afresh
         }
        
     });
    return false;
};
