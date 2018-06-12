$(document).ready(function() {

  var topics = ["days of thunder", "talledega nights", "driven", "rush", "cars", "senna", "stroker ace", "greased lighting"];	

  //  create topics array buttons
  function renderButtons(){
    $('#buttons-view').empty();

    for (var i = 0; i < topics.length; i++) {

            //create all buttons
            var a = $('<button>');
            a.addClass('racing');
            a.attr('data-name', topics[i]);
            a.text(topics[i]);
            $('#buttons-view').append(a);
          }
        }    
        renderButtons();

//on button click
$(document).on('click', '.racing', function() {
    console.log("buttonwork")
    //new variable will log the text data from each button
    var racing = $(this).html(); 
  
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + racing + "&api_key=YYCUEXxgM1Lz014v55sQi8EK0Tyn0WVD";

    console.log(queryURL)
    // Creating an AJAX call for the specific movie button being clicked
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {

      var results = response.data;
   
        //empties the div before adding more gifs
        $('#movies-view').empty();
        for ( var j=0; j < results.length; j++) {
                    var imageDiv = $('<div>');
                    var imageView = results[j].images.fixed_height.url;
                    var still = results[j].images.fixed_height_still.url;

        var gifImage = $('<img>').attr("src", still).attr('data-animate', imageView).attr('data-still', still);
                    gifImage.attr('data-state', 'still');
                    $('#movies-view').prepend(gifImage);
                    gifImage.on('click', playGif);

        // Pulling ratings for each movie
        var rating = results[j].rating;

        var displayRated= $('<p>').text("Rating: " + rating);
        $('#movies-view').prepend(displayRated);
  } // end for loop

}); // done response

        //function to stop and animate gifs
        function playGif() { 
                    var state = $(this).attr('data-state');
                    // console.log(state);
                 if (state == 'still'){
                     $(this).attr('src', $(this).data('animate'));
                      $(this).attr('data-state', 'animate');
                 } else{
                     $(this).attr('src', $(this).data('still'));
                     $(this).attr('data-state', 'still');
                    }

                } 

      }); 

          //adding new button to array
        $(document).on('click', '#add-movie', function(){
            if ($('#movie-input').val().trim() == ''){
              alert('Input can not be left blank');
           }
           else {
            var movies = $('#movie-input').val().trim();
            topics.push(movies);
            $('#movie-input').val('');
            renderButtons();
            return false;

            }

        });
                      

        }); 

