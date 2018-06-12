$(document).ready(function() {
    $(".eat-button").on("click", function(event) {
  
      var id = $(this).data("id");
  
      // Send the PUT request.
      $.ajax("/api/burgers/" + id, {
        type: "PUT",
        data: {devoured: 1}
      }).then(
        function() {
          // Reload the page to get the updated list
          location.reload();
        }
      );
    });
  
  $("#submit-button").on("click", function(event) {
   
    event.preventDefault();
    var newBurger = {
      burger_name: $("#burger_input").val().trim()
    };
  
    // Send the POST request.
    $.ajax("/api/burgers", {
      type: "POST",
      data: newBurger
    }).then(
      function() {
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });
  
  });
  