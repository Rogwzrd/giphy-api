//psuedo code

//theme- national parks

//1.An a number of buttons will populate the page that will create 10 gifs from the giphy api
//	a. make an array to house all of the premade buttons
//	b. make a function that will run based on button click and pull info from the giphy api (for loop?)
//	c. the buttons should create 10 images and also populate the rating of the gif
//	d. the gifs should not play until clicked upon
//2. the user will input infomration into the input, when they hit submit it will create a button that do the same as the button mentioned beforehand
//	a. create a function that will read the input and (add it to the array/just create a new button)

$(document).ready(function() {
    var buttonHolder = ["corn", "pasta", "cheese", "bread", "broccoli", "ham", "steak", "cauliflower"];

    var giphyURL = "http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=2f1ee54721af47b886acfabbf2eed9a3&limit=5"

    var buttonGrabber = $("#button-area");

    var imageGrabber = $("#images-area");

    var giphyLoad = (arr) => {
        $.ajax({
            url: "http://api.giphy.com/v1/gifs/search?q=" + arr + "&api_key=2f1ee54721af47b886acfabbf2eed9a3&limit=10",
            method: "GET"
        }).done(function(response) {
        	//this forloop itterates through the giphy api and appends iframes based on the embedded url
        	for (var i = 0; i < response.data.length; i++) {
        		imageGrabber
        		.empty()
        		.append("<img>")
        		.children()
        		.eq(i)
        		.addClass("img-responsive")
        		.attr({
        			src: response.data[i].images["480w_still"].url,
        			width: response.data[i].images["480w_still"].width,
        			height: response.data[i].images["480w_still"].height
        		})
        	}
            console.log(response);
        });
    }

    //this function creates the buttons from the buttonHolder array 
    var buttonMaker = () => {
        for (var i = 0; i < buttonHolder.length; i++) {
            buttonGrabber
                .append("<button>" + buttonHolder[i] + "</button>")
                .children()
                .eq(i)
                .addClass("btn btn-default btn-primary giphyButton")
                .attr("value", buttonHolder[i]);
            console.log(buttonHolder[i]);
        }
    };
    //this funciton takes the information from the input line and adds it to the buttonHolder array
    // var inputSubmit = (arg) => {

    // }

    $(document).on('click', '.giphyButton', function() {
    	giphyLoad(this.value);
    })

    buttonMaker();
});