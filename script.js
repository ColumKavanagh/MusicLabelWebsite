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
		if(genre.length==0){
			$("#suggestions").text("");
		} else{
			if(genre == "rock"){
				$("#suggestions").text("");
				var bandHolder = "";
				for(var i = 0; i < rock.length; i++){
					bandHolder+=rock[i] + "<br/><img src='../images/paper.jpg' style='height:300px;width:375px;'/><br/>"
				}
				$("#suggestions").html(bandHolder);
			} else if(genre == "rnb"){
				$("#suggestions").text("");
				var bandHolder = "";
				for(var i = 0; i < rnb.length; i++){
					bandHolder+=rnb[i] + "<br/><img src='../images/paper.jpg' style='height:300px;width:375px;'/><br/>"
				}
				$("#suggestions").html(bandHolder);
			} else if(genre == "pop"){
				$("#suggestions").text("");
				var bandHolder = "";
				for(var i = 0; i < pop.length; i++){
					bandHolder+=pop[i] + "<br/><img src='../images/paper.jpg' style='height:300px;width:375px;'/><br/>"
				}
				$("#suggestions").html(bandHolder);
			} else if(genre == "country"){
				$("#suggestions").text("");
				var bandHolder = "";
				for(var i = 0; i < country.length; i++){
					bandHolder+=country[i] + "<br/><img src='../images/paper.jpg' style='height:300px;width:375px;'/><br/>"
				}
				$("#suggestions").html(bandHolder);
			}
		}
		/*
		var band = $("#band").val().toLowerCase();
		if(band.length==0){
			$("#suggestions").text("");
		} else {
			$("#suggestions").text("");
			var counter = 0;
			var index;
			for(var i = 0; i < bands.length; i++){
				if(band==bands[i].toLowerCase()){
					if(rock.findIndex())
				}
			}
		}*/
	})
});