//psuedo code

//theme- national parks

//1.An a number of buttons will populate the page that will create 10 gifs from the giphy api
//  a. make an array to house all of the premade buttons
//  b. make a function that will run based on button click and pull info from the giphy api (for loop?)
//  c. the buttons should create 10 images and also populate the rating of the gif
//  d. the gifs should not play until clicked upon
//2. the user will input infomration into the input, when they hit submit it will create a button that do the same as the button mentioned beforehand
//  a. create a function that will read the input and (add it to the array/just create a new button)

$(document).ready(function() {
    var buttonHolder = ["corn", "pasta", "cheese", "bread", "broccoli", "ham", "steak", "cauliflower"],

        giphyURL = "http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=2f1ee54721af47b886acfabbf2eed9a3&limit=5",

        buttonSpace = $("#button-area"),

        imageSpace = $("#images-area"),

        giphyLoad = (arr) => {
            $.ajax({
                url: "http://api.giphy.com/v1/gifs/search?q=" + arr + "&api_key=2f1ee54721af47b886acfabbf2eed9a3&limit=10",
                method: "GET"
            }).done(function(response) {
                //this line empties the parent div so empty elements do not populate the page
                imageSpace.empty();
                //this forloop itterates through the giphy api and appends image elements based on the embedded url
                for (var i = 0; i < response.data.length; i++) {
                    var imageDiv = $('<div>')
                    var imageElement = $("<img>");
                    imageElement
                        .attr("class", "gif")
                        .attr("state", "still")
                        .attr("data-still", response.data[i].images["original_still"].url)
                        .attr("data-animate", response.data[i].images["original"].url)
                        .attr("src", response.data[i].images["original_still"].url);
                    var p = $("<p>");
                    p.text("Rating: " + response.data[i].rating);
                    imageDiv
                        .addClass("giphy-output")
                        .append(p)
                        .append(imageElement);
                    imageSpace
                        .append(imageDiv);

                }
                console.log(response);
            });
        },

        //this function creates the buttons from the buttonHolder array 
        buttonMaker = () => {
            buttonSpace.empty();
            for (var i = 0; i < buttonHolder.length; i++) {
                var newButton = $("<button>");
                newButton
                    .text(buttonHolder[i])
                    .addClass("btn btn-lg btn-primary giphyButton")
                    .attr("value", buttonHolder[i]);
                buttonSpace.append(newButton)
                console.log(buttonHolder[i]);
            }
        };
    //this funciton takes the information from the input line and adds it to the buttonHolder array
    $("#submit-button").on("click", function(event) {
        event.preventDefault();

        //if you have an empty input or your input has already been entered the function does not run
        if ($("#input-space").val() && buttonHolder.indexOf($("#input-space").val()) === -1) {
            var newInput = $("#input-space").val();
            buttonHolder.push(newInput);
            console.log(buttonHolder);
            buttonMaker();
        }
        //after pressing the button clear the input area
        $("#input-space").val('');
    })

    //when you click the saved buttons make gifs appear!
    $(document).on('click', '.giphyButton', function() {
        giphyLoad(this.value);
    })

    //if you click on the image it will switch the source to the animated gif from the still image of the gif
    $(document).on('click', '.gif', function() {
        var state = $(this).attr("state")
        if (state === "still") {
            $(this).attr("state", "animated");
            $(this).attr("src", $(this).attr("data-animate"));
        } else {
            $(this).attr("state", "still");
            $(this).attr("src", $(this).attr("data-still"));
        }
    })

    buttonMaker();
});