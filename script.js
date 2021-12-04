window.addEventListener("DOMContentLoaded", init);
// adds curreent year after copyright symbol, Daniel Morrissey 21118701
function init(){
	let currentDate = document.getElementById("currentYear");
	let currentDate1 = document.getElementById("currentYear1");
	currentDate.innerHTML = "&copy;" + new Date().getFullYear();
	currentDate1.innerHTML = "&copy; " + new Date().getFullYear();
}

// JQuery for recommendations page, user can search via genre from a drop down menu or search a band via text input (case sensitive), Daniel Morrissey 21118701
$(document).ready(function(){
	let bands = ["rise against", "green day", "metallica", "taylor swift", "pink", "justin bieber", "rihanna", "beyonce", "drake", "johnny cash", "john denver", "steve earle"];
	let venue = ["Croke Park", "Old Trafford", "Turners Cross"];
	let rock = ["rise against", "green day", "metallica"];
	let rnb = ["rihanna", "beyonce", "drake"];
	let pop = ["taylor swift", "pink", "justin bieber"];
	let country = ["johnny cash", "john denver", "steve earle"];
	
	$(document).on("submit", "#recommendForm", function(event){
		event.preventDefault();
		var genre = $("#genreList").val();
		var band = $("#band").val().toLowerCase();
		if(/[^a-zA-Z]+$/.test(band)){
			$("#suggestions").text("Only letters are allowed").css("color", "#ff0000").css("border-style", "none");
		} else if(genre.length>0 && band.length>0){
			$("#suggestions").text("Either select a music genre or search similar artists").css("color", "#ff0000").css("border-style", "none");
		} else {
			// search based off of genre, Daniel Morrissey 21118701
			if(genre.length==0 && band.length==0){
				$("#suggestions").text("Please select a genre or enter an artist or band").css("color", "#ff0000").css("border-style", "none");
			} else{
				// shows bands in respect to their genre
				if(genre == "rock"){
					suggestionFiller(rock, "Rock");
				} else if(genre == "rnb"){
					suggestionFiller(rnb, "RnB");
				} else if(genre == "pop"){
					suggestionFiller(pop, "Pop");
				} else if(genre == "country"){
					suggestionFiller(country, "Country");
				}
			}
			
			// search based off of band name, Daniel Morrissey 21118701
			if(band.length==0 && genre.length == 0){
				$("#suggestions").text("Please select a genre or enter an artist or band").css("color", "#ff0000").css("border-style", "none");
			} else{
				// each if searches a band in each genre and if true will show similar bands but won't show band in input
				if(bandSearch(band, rock)){
					bandSearchFiller(rock, band, "Rock");
				} else if(bandSearch(band, rnb)){
					bandSearchFiller(rnb, band, "RnB");
				} else if(bandSearch(band, pop)){
					bandSearchFiller(pop, band, "Pop");
				} else if(bandSearch(band, country)){
					bandSearchFiller(country, band, "Country");
				} else if(genre.length==0 && band.length>0) {
					$("#suggestions").text("No artist or band was found").css("color", "#ff0000").css("border-style", "none");
				}
			}
		}
	})
	
	//function that shows band recommendations based on the select tag, Daniel Morrissey 21118701
	function suggestionFiller(genre, musicGenre){
		$("#suggestions").text("").css("color", "#000000");
		var bandHolder = "";
		for(var i = 0; i < genre.length; i++){
			bandHolder+= "<h3><i style='text-transform:capitalize'>" + genre[i] + "</i></h3>" + "<br/>Music Genre: " + musicGenre + "<br/><br/><img src='../images/" + genre[i] +".jpg' class='suggestion' style='border-radius:0.5em;height:300px;display:block;margin-left:auto;margin-right:auto;' alt='image of band (not actually bands to avoid copyright issues)'/><br/>"
		}
		$("#suggestions").html(bandHolder);
		$("#suggestions").css("border-style", "solid").css("padding", "1em");
	}
	
	//function that shows band recommendations based on text input, skips the text input band. Daniel Morrissey 21118701
	function bandSearchFiller(genre, band, musicGenre){
		$("#suggestions").text("").css("color", "#000000");
		var bandHolder="";
		for(var i = 0; i < genre.length; i++){				
			if(genre[i]!=band){
				bandHolder+="<h3><i style='text-transform:capitalize'>" + genre[i] + "</i></h3>" + "<br/>Music Genre: " + musicGenre + "<br/><br/><img src='../images/" + genre[i] + ".jpg' class='suggestion' style='border-radius:0.5em;height:300px;display:block;margin-left:auto;margin-right:auto;' alt='image of band (not actually bands to avoid copyright issues)'/><br/>"
			} else{
				continue;				
			}
		}
		$("#suggestions").html(bandHolder);
		$("#suggestions").css("border-style", "solid").css("padding", "1em");
	}
	
	//function that searches for a band in each genre array, Daniel Morrissey 21118701
	function bandSearch(band, genre){
		var counter = 0;
		for(var i = 0; i < genre.length; i++){
			if(genre[i]==band){
				counter=1;
				break;
			}
		}
		if(counter==1){
			return true;
		} else{
			return false;
		}
	}
	
	// function that shows past gigs sorted by date (most recent first, got help from stackoverflow for the sort), Daniel Morrissey 21118701
	function gigFiller(band, genre, venue){
		$("#resultGig").text("").css("color", "#000000");
		var bandGigHolder="";
		var date = [randomDate(new Date(2015, 0, 1), new Date()), randomDate(new Date(2015, 0, 1), new Date()), randomDate(new Date(2015, 0, 1), new Date())];
		date.sort(function(a,b){
			var da = new Date(a).getTime();
			var db = new Date(b).getTime();
  
			return db < da ? -1 : db > da ? 1 : 0
		});
		for(var i = 0; i < genre.length; i++){
			bandGigHolder+="<h3><i style='text-transform:capitalize'>" + band + "</i></h3> <p>Venue: <i>" + venue[i] + "</i><br />" + date[i].toDateString() + "</p><img src='../images/" + band + ".jpg' class='suggestion' style='border-radius:0.5em;height:300px;display:block;margin-left:auto;margin-right:auto;' alt='image of a gig (not actually gigs to avoid copyright issues)'/><br/>";
		}
		switch(band){
			case "rise against":
				bandGigHolder+='<iframe src="https://www.youtube.com/embed/Av7QpmwnRnM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
				break;
			case "green day":
				bandGigHolder+='<iframe src="https://www.youtube.com/embed/uPMDPiNG4TE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
				break;
			case "metallica":
				bandGigHolder+='<iframe src="https://www.youtube.com/embed/87by1DjfxLw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
				break;
			case "taylor swift":
				bandGigHolder+='<iframe src="https://www.youtube.com/embed/J2uxc01fUXU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
				break;
			case "pink":
				bandGigHolder+='<iframe src="https://www.youtube.com/embed/RaCbtFXXTaw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
				break;
			case "justin bieber":
				bandGigHolder+='<iframe src="https://www.youtube.com/embed/VBSsiTVXbd8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
				break;
			case "rihanna":
				bandGigHolder+='<iframe src="https://www.youtube.com/embed/2-ST8O5vMo8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
				break;
			case "beyonce":
				bandGigHolder+='<iframe src="https://www.youtube.com/embed/jiGmdxH_53U" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
				break;
			case "drake":
				bandGigHolder+='<iframe src="https://www.youtube.com/embed/-m9CN3SEfgY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
				break;
			case "johnny cash":
				bandGigHolder+='<iframe src="https://www.youtube.com/embed/xObSJWIWui0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
				break;
			case "john denver":
				bandGigHolder+='<iframe src="https://www.youtube.com/embed/KSmh6FO3T74" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
				break;	
			case "steve earle":
				bandGigHolder+='<iframe src="https://www.youtube.com/embed/ohipg8cPm5s" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
				break;
		}
		$("#resultGig").html(bandGigHolder);
		$("#resultGig").css("border-style", "solid").css("padding", "1em");
	}
	
	// random date generator, Daniel Morrissey 21118701
	function randomDate(start, end) {
		return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
	}
	
	// function that shows events, Daniel Morrissey 21118701
	$(document).on("submit", "#formGig", function(event){
		event.preventDefault();
		var bandGig = $("#bandGig").val().toLowerCase();
		if(/[^a-zA-Z]+$/.test(bandGig)){
			$("#resultGig").text("Only letters are allowed").css("color", "#ff0000").css("border-style", "none");
		} else if(bandGig.length == 0){
			$("#resultGig").text("Please enter an artist or band").css("color", "#ff0000");
		} else {
			// each if searches a band in each genre and if true will show past events in order of date most recent first
			if(bandSearch(bandGig, rock)){
				gigFiller(bandGig, rock, venue);
			} else if(bandSearch(bandGig, rnb)){
				gigFiller(bandGig, rnb, venue);
			} else if(bandSearch(bandGig, pop)){
				gigFiller(bandGig, pop, venue);
			} else if(bandSearch(bandGig, country)){
				gigFiller(bandGig, country, venue);
			} else {
				$("#resultGig").text("No artist or band was found").css("color", "#ff0000").css("border-style", "none");
			}
		}
	})
	
	$(document).on("click", "#instructionGigClose", function(){
		$("#resultGig").toggle("slow");
	})
	
	$(document).on("click", "#recommendShowHide", function(){
		$("#suggestions").toggle("slow");
	})
});

//Raw Javascript for showing/hiding homepage slideshow and adjusting the interval between each slide, Colum Kavanagh
var slideshow = document.getElementById("bass-icCarousel");
var slideshowButton = document.getElementById("slideshowButton")

function toggleSlideshow(){
	if(slideshow.hidden==true){
		slideshow.removeAttribute("hidden");
		var x = document.getElementsByClassName("carousel-item");
		for (i = 0; i < x.length; i++) {
		x[i].setAttribute("data-bs-interval", "2000");//setting the interval between each slide to 2 seconds rather than the longer default time-length from Bootstrap
		}
		slideshowButton.innerHTML="HIDE SLIDESHOW"
	}else{
		slideshow.setAttribute("hidden", "true");
		slideshowButton.innerHTML="VIEW SLIDESHOW"
	}
}










