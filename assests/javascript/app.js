$(document).ready(function() {
  var animals = ["dogs", "cats", "birds", "foxes"];

  function getGiphy () {
    var gifOutput = $(this).attr("data-name");
    var queryURL =
    "https://api.giphy.com/v1/gifs/search?q="+gifOutput+"&api_key=Mq4E6OuzrHkhXWUwEVi0rYucsNv4cPCU&limit=10&rating=g";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      $("#animalZone").empty();
      var results = response.data;

      console.log(results);

      for (var i = 0; i < 10; i++) {
        var giphyDiv = $("<div>");
        var rating = results[i].rating;
        var p = $("<h2>").text("Rating: " + rating);
        var giphyImg = $("<img>");
   
  

        giphyDiv.addClass("image");

        giphyImg.attr("src", results[i].images.fixed_height_still.url);

        giphyImg.attr("data-still", results[i].images.fixed_height_still.url);

        giphyImg.attr("data-animate", results[i].images.fixed_height.url);

        giphyImg.attr("data-state", "still");
        giphyImg.addClass("giphyImg");


        giphyDiv.append(p);
        giphyDiv.append(giphyImg);


        $("#animalZone").prepend(giphyDiv);
      }

      $(".giphyImg").on("click", function() {
        var state = $(this).attr("data-state");
        console.log(state);

        if (state == "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
      });
    });
  };
  function makeButtons () {
    $("#exampleBtn").empty();

    for (var i = 0; i < animals.length; i++) {
      var moreAnimals = $("<button>");

      moreAnimals.addClass("animalBtn");

      moreAnimals.attr("id", "animalGif");
      moreAnimals.attr("data-name", animals[i]);
      moreAnimals.attr("type", "button");


      moreAnimals.text(animals[i]);

      $("#exampleBtn").append(moreAnimals);
    }
  }

  $("#animalBtn").on("click", function(event) {
      event.preventDefault();
      var giphy = $("#inputBox")
      .val()
      .trim();

      animals.push(giphy)
      makeButtons();
  });

  $(document).on("click", "#animalGif", getGiphy);
  makeButtons();

});
