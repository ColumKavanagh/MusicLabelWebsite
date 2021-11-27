window.addEventListener("DOMContentLoaded", init);
// adds curreent year after copyright symbol, Daniel Morrissey 21118701
function init(){
	let currentDate = document.getElementById("currentYear");
	currentDate.innerHTML = "&copy;" + new Date().getFullYear();
}

// JQuery for recommendations page, user can search via genre from a drop down menu or search a band via text input (case sensitive), Daniel Morrissey 21118701
$(document).ready(function(){
	let bands = ["Rise Against", "Green Day", "Metallica", "Taylor Swift", "Pink", "Justin Bieber", "Rihanna", "Beyonce", "Drake", "Johnny Cash", "John Denver", "Steve Earle"];
	let venue = ["Croke Park", "Old Trafford", "Turners Cross"];
	let rock = ["Rise Against", "Green Day", "Metallica"];
	let rnb = ["Rihanna", "Beyonce", "Drake"];
	let pop = ["Taylor Swift", "Pink", "Justin Bieber"];
	let country = ["Johnny Cash", "John Denver", "Steve Earle"];
	
	$(document).on("submit", "#recommendForm", function(event){
		event.preventDefault();
		var genre = $("#genreList").val();
		var band = $("#band").val();
		if(genre.length>0 && band.length>0){
			$("#suggestions").text("Either select a music genre or search similar artists");
		} else {
			// search based off of genre, Daniel Morrissey 21118701
			if(genre.length==0){
				$("#suggestions").text("");
			} else{
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
			
			// search off band name, Daniel Morrissey 21118701
			if(bandSearch(band, rock)){
				bandSearchFiller(rock, band, "Rock");
			} else if(bandSearch(band, rnb, "RnB")){
				bandSearchFiller(rnb, band);
			} else if(bandSearch(band, pop)){
				bandSearchFiller(pop, band, "Pop");
			} else if(bandSearch(band, country)){
				bandSearchFiller(country, band, "Country");
			}
		}
	})
	
	//function that shows band recommendations based on the select tag, Daniel Morrissey 21118701
	function suggestionFiller(genre, musicGenre){
		$("#suggestions").text("");
		var bandHolder = "";
		for(var i = 0; i < genre.length; i++){
			bandHolder+=genre[i] + "<br/>Music Genre: " + musicGenre + "<br/><br/><img src='../images/" + genre[i] +".jpg' class='suggestion' style='height:300px;display:block;margin-left:auto;margin-right:auto;' alt='image of band (not actually bands to avoid copyright issues)'/><br/>"
		}
		$("#suggestions").html(bandHolder);
	}
	
	//function that shows band recommendations based on text input, skips the text input band. Daniel Morrissey 21118701
	function bandSearchFiller(genre, band, musicGenre){
		$("#suggestions").text("");
		var bandHolder="";
		for(var i = 0; i < genre.length; i++){				
			if(genre[i]!=band){
				bandHolder+=genre[i] + "<br/>Music Genre: " + musicGenre + "<br/><br/><img src='../images/" + genre[i] + ".jpg' class='suggestion' style='height:300px;display:block;margin-left:auto;margin-right:auto;' alt='image of band (not actually bands to avoid copyright issues)'/><br/>"
			} else{
				continue;				
			}
		}
		$("#suggestions").html(bandHolder);
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
		$("#resultGig").html("");
		var bandGigHolder="";
		var date = [randomDate(new Date(2015, 0, 1), new Date()), randomDate(new Date(2015, 0, 1), new Date()), randomDate(new Date(2015, 0, 1), new Date())];
		date.sort(function(a,b){
			var da = new Date(a).getTime();
			var db = new Date(b).getTime();
  
			return db < da ? -1 : db > da ? 1 : 0
		});
		for(var i = 0; i < genre.length; i++){
			bandGigHolder+="<h3>" + band + "</h3> <p>Venue: <i>" + venue[i] + "</i><br />" + date[i].toDateString() + "</p><img src='../images/" + band + ".jpg' class='suggestion' style='height:300px;display:block;margin-left:auto;margin-right:auto;' alt='image of a gig (not actually gigs to avoid copyright issues)'/><br/>";
		}
		$("#resultGig").html(bandGigHolder);
	}
	
	// random date generator, Daniel Morrissey 21118701
	function randomDate(start, end) {
		return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
	}
	
	// function that shows events, Daniel Morrissey 21118701
	$(document).on("submit", "#formGig", function(event){
		event.preventDefault();
		var bandGig = $("#bandGig").val();
		if(bandSearch(bandGig, rock)){
			gigFiller(bandGig, rock, venue);
		} else if(bandSearch(bandGig, rnb)){
			gigFiller(bandGig, rnb, venue);
		} else if(bandSearch(bandGig, pop)){
			gigFiller(bandGig, pop, venue);
		} else if(bandSearch(bandGig, country)){
			gigFiller(bandGig, country, venue);
		}
	})
	
	$(document).on("click", "#instructionGigClose", function(){
		$("#resultGig").toggle("slow");
	})
	
	$(document).on("click", "#recommendShowHide", function(){
		$("#suggestions").toggle("slow");
	})
});












