
//load table function
$(document).ready(function () {
    LoadTable();
});

const uri = "/api/Movies"; //api is global variable and Movies is controller name
// alert("API " + uri);
let Movies = null; //data holding function

//hiding the addModal after adding movies
function hide() {
    
       
            $(document.getElementById('addMovieModal')).hide();
        
       
   
}
function show() {
    document.ready();

}

    
    
//validation for choosing numbers only instead of alpabhets

function validatation() {
 
    var x = document.forms["myForm"]["num"].value;
    if (!x.match(/^\d+/)) {
        document.getElementById('add-rating').value = 'Please fill Rating as a  Number ';
        hide();
    }
    else {
        
        
        addMovie();
        
    }
}

    //function getCount(data) {
    //    // alert("getcount " + datas);
    //    const theCount = $("#counting"); //bind TheCount to the counter
    //    if (data) { //if any data exists
    //        // alert("We have data " + data);
    //        theCount.text("There are " + data + " Movies");
    //    } else {
    //        theCount.text("There are no Movies");
    //        alert("No data");
    //    }
    //}
    //load the table again after any changes
function LoadTable() {
    
        $.ajax({
            type: "GET", //Get Controller
            url: uri, //uri
            cache: false, //use of cache to reload the fresh copy
            success: function (data) { //when the function is successed
                const tBody = $("#Movies"); //link (#Movies)with <tbody> 
                Movies = data; //pass whole data to all movies 
                $(tBody).empty(); //clear previous data
                //getCount(data.length); //count for the counter function
                //a foreach through the rows creating table data
                $.each(data,
                    function (key, item) {
                        const tr = $("<tr></tr>")
                            .append($("<td></td>").text(item.title)) //inserts items in the tags
                            .append($("<td></td>").text(item.plot))
                            .append($("<td></td>").text(item.genre))
                            .append($("<td></td>").text(item.rating))
                            .append($("<td></td>")
                                .append($("<button href='#updateMovieModal' class='btn-info' data-toggle='modal'>update</button>)")
                                    .on("click",
                                        //update function
                                        function () {
                                            updateMovie(item.id);
                                        }) //fill the empty cells in an updateMovie
                                )
                            )
                            .append(
                                $("<td></td>")
                                    .append(
                                        $('<button  href="#removeMovieModal" data-toggle="modal" class="btn-danger" >Delete</button>')
                                            .on("click", function () {
                                                $("#delete-id").val(item.id);
                                            }
                                                //fill empty cell in a RemoveMovie button
                                            )
                                    )
                            );
                        tr.appendTo(tBody);//append all rows to tbody
                    });
            }
        });
    }
    //Add Movie function
function addMovie() {
    
    
        const item = {
            title: $("#add-title").val(),
            plot: $("#add-plot").val(),
            genre: $("#add-genre").val(),
            rating: $("#add-rating").val()
    };
    
        $.ajax({
            type: "POST", //this is for caaling the POST type in api controller
            accepts: "application/json",
            url: uri,
            contentType: "application/json",
            data: JSON.stringify(item),
            //Show error
            error: function (jqXHR, textStatus, errorThrown) {
                alert("Something went wrong!");
            },
            //when succeceed
            success: function (result) {
                
                LoadTable();
                $("#add-title").val(""); //clear out the filling cells
                $("#add-plot").val("");
                $("#add-genre").val("");
                $("#add-rating").val("");
                hide();
                LoadTable();
                //show alert after adding movie
                alert("Movie added successfully");
                LoadTable();
                location.reload();
            }
        });
    }
    //use remove movie function to remove movies
    function RemoveMovie(id) {

        $.ajax({
            url: uri + "/" + id, //this is used for adding id to end of URI
            type: "DELETE", //this is for calling the Delete in the API controller
            success: function (result) {
                LoadTable();
            }
        });
    }
    //use updateMovie function
    function updateMovie(id) {

        $.each(Movies,
            function (key, item) {

                if (item.id === id) {//to find ID
                    $("#update-title").val(item.title); //append in the form
                    $("#update-id").val(item.id);
                    $("#update-plot").val(item.plot);
                    $("#update-genre").val(item.genre);
                    $("#update-rating").val(item.rating);;
                }
            });
    }
    //save the movies after updating
    function saveItem() {

        const item = { //passing the data
            title: $("#update-title").val(),
            plot: $("#update-plot").val(),
            genre: $("#update-genre").val(),
            rating: $("#update-rating").val(),
            id: $("#update-id").val()

        };
       

        $.ajax({
            url: uri + "/" + $("#update-id").val(), //in uri add row id
            type: "PUT", //use od POST type to pass it to the put Controller
            accepts: "application/json",
            contentType: "application/json",
            data: JSON.stringify(item),
            //To show error
            error: function (jqXHR, textStatus, errorThrown) {
                //show alert if there is an error
                alert("Something went wrong!");
            },
            //When succeceed
            success: function (result) {
                //Show alert when updated
                alert("Successfully updated");
                LoadTable(); //load the table 
            }

        });
        return false;
    };

