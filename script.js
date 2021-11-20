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
	
	//need to create more Functions
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
		var band = $("#band").val();
		if(bandSearch(band, rock)){
			$("#suggestions").text("");
			var bandHolder="";
			for(var i = 0; i < rock.length; i++){				
				if(rock[i]!=band){
					bandHolder+=rock[i] + "<br/><img src='../images/paper.jpg' style='height:300px;width:375px;'/><br/>"
				} else{
					continue;				
				}
			}
			$("#suggestions").html(bandHolder);
		} else if(bandSearch(band, rnb)){
			$("#suggestions").text("");
			var bandHolder="";
			for(var i = 0; i < rnb.length; i++){				
				if(rnb[i]!=band){
					bandHolder+=rnb[i] + "<br/><img src='../images/paper.jpg' style='height:300px;width:375px;'/><br/>"
				} else{
					continue;				
				}
			}
			$("#suggestions").html(bandHolder);
		} else if(bandSearch(band, pop)){
			$("#suggestions").text("");
			var bandHolder="";
			for(var i = 0; i < pop.length; i++){				
				if(pop[i]!=band){
					bandHolder+=pop[i] + "<br/><img src='../images/paper.jpg' style='height:300px;width:375px;'/><br/>"
				} else{
					continue;				
				}
			}
			$("#suggestions").html(bandHolder);
		} else if(bandSearch(band, country)){
			$("#suggestions").text("");
			var bandHolder="";
			for(var i = 0; i < country.length; i++){				
				if(country[i]!=band){
					bandHolder+=country[i] + "<br/><img src='../images/paper.jpg' style='height:300px;width:375px;'/><br/>"
				} else{
					continue;				
				}
			}
			$("#suggestions").html(bandHolder);
		}
	})
	
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












