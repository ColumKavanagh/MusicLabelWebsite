window.addEventListener("DOMContentLoaded", init);

function init(){
	let currentDate = document.getElementById("currentYear");
	currentDate.innerHTML = "&copy;" + new Date().getFullYear();
}

$(document).ready(function(){
	let bands = ["Rise Against", "Green Day", "Metallica", "Taylor Swift", "Pink", "Justin Bieber", "Rihanna", "Beyonce", "Drake", "Johnny Cash", "John Denver", "Steve Earle"];
	
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
			if(genre.length==0){
				$("#suggestions").text("");
			} else{
				if(genre == "rock"){
					suggestionFiller(rock);
				} else if(genre == "rnb"){
					suggestionFiller(rnb);
				} else if(genre == "pop"){
					suggestionFiller(pop);
				} else if(genre == "country"){
					suggestionFiller(country);
				}
			}
			
			if(bandSearch(band, rock)){
				bandSearchFiller(rock, band);
			} else if(bandSearch(band, rnb)){
				bandSearchFiller(rnb, band);
			} else if(bandSearch(band, pop)){
				bandSearchFiller(pop, band);
			} else if(bandSearch(band, country)){
				bandSearchFiller(country, band);
			}
		}
	})
	
	function suggestionFiller(genre){
		$("#suggestions").text("");
		var bandHolder = "";
		for(var i = 0; i < genre.length; i++){
			bandHolder+=genre[i] + "<br/><img src='../images/paper.jpg' style='height:300px;width:375px;'/><br/>"
		}
		$("#suggestions").html(bandHolder);
	}
	
	function bandSearchFiller(genre, band){
		$("#suggestions").text("");
		var bandHolder="";
		for(var i = 0; i < genre.length; i++){				
			if(genre[i]!=band){
				bandHolder+=genre[i] + "<br/><img src='../images/paper.jpg' style='height:300px;width:375px;'/><br/>"
			} else{
				continue;				
			}
		}
		$("#suggestions").html(bandHolder);
	}
	
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
});












