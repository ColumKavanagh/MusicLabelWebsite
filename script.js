//*****Raw Javascript to run when the DOM has finished loading on every page (Daniel Morrissey)
window.addEventListener("DOMContentLoaded", init);
//What the 'init' function does:
function init(){
	//Adding copyright year on 'Footer' of ALL PAGES
	let currentDate = document.getElementById("currentYear");
	currentDate.innerHTML = "&copy; " + new Date().getFullYear();
	var button1 = document.getElementById('formButton');
	//Adding event listeners to the button on the  form on the 'Contact' page
	if(button1!=null){
		button1.addEventListener('click', validateForm);
		button1.addEventListener('click', formSubmit);
	}
}

/****POP-UP ON HOMEPAGE (Ciara O'Malley, Colum Kavanagh and Daniel Morrissey)
Raw javascript to load and operate the pop-up*/ 
/*Functions to set the animation of the popup on the homepage 
screen and making sure the popup only loads once per day per user*/
function fin(el){
	if(el != null){
		el.style.display = "block";
	}
	var i = 0;
	fadeIn(el, i);
}
function fadeIn(el, i){
	i+=0.01;
	seto(el, i);
	if(i<1){
		setTimeout(function(){fadeIn(el, i);}, 10);
	}
}
function seto(el, i){
	el.style.opacity = i;
}
let cookie_expire = 0; // days
let cookie = localStorage.getItem("list-builder");
if(cookie == undefined || cookie == null) {
	cookie = 0;
}
let listBuilder = document.getElementById("list-builder");
let delay = 200; // milliseconds
if(((new Date()).getTime() - cookie) / (1000 * 60 * 60 * 24) > cookie_expire) {
	
	var popupBox = document.getElementById("popup-box");
	if(popupBox != null){
		setTimeout(fin(popupBox), delay);
	}
	var popUpClose = document.getElementsByClassName("popup-close");
	if(typeof(popUpClose) != undefined){
		popUpClose[0].addEventListener("click", closePopup);
	}			
	var submitButton = document.getElementById("submitButton");
	if(submitButton != null){
		submitButton.addEventListener("click", submitPopup);
	}
}

//Validating the info inputted into the popup form by the user
let validPopupDetails = false;
function validateFormPopUp(){
	var popupEmail = document.getElementById("popup-email").value;
	var popupName = document.getElementById("popup-name").value;
	var popupEmailDom = document.getElementById("popup-email");
	var popupNameDom = document.getElementById("popup-name");
		//Name and a valid email address are required
		if (popupName.length==0) {
			alert("Please enter your name.");
			popupNameDom.focus();
			event.preventDefault;
		}else if(popupEmail.length==0) {
			alert("Please enter your email address.");
			popupEmailDom.focus();
		} else if (!(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(popupEmail))) {
			alert("Please enter a valid email address.");
			popupEmailDom.focus();
		} else {
			validPopupDetails = true; // Can submit the form data to the hypthetical server
		}
}
//Sumbitting the popup
function submitPopup(){ /*In a real-life scenario, a POST method would be used to send the data 
	inputted by the user into the popup form securely to a server on the backend via an HTTP request*/
	validateFormPopUp();
	event.preventDefault();
	if (validPopupDetails){
		var popupBoxContent = document.getElementById("popup-box-content");
		var popUpClose = document.getElementsByClassName("popup-close");		
		popupBoxContent.innerHTML = "<img src='images/close.png' class='popup-close'/><p style='text-align: center'> Thank you for subscribing to the Bass-ic Records newsletter!</p>";
		if(popUpClose != null){
			popUpClose[0].addEventListener("click", closePopup);
		}
	}
}
//Closing the popup
function closePopup(){
	var somePopUpBox = document.getElementById("popup-box");
	listBuilder.style.display = "none";
	somePopUpBox.style.display = "none";
	localStorage.setItem("list-builder", (new Date()).getTime());
}

/****HOMEPAGE SLIDESHOW: (Colum Kavanagh)
Raw Javascript for showing/hiding homepage slideshow and adjusting the interval between each slide, Colum Kavanagh*/
var slideshow = document.getElementById("bass-icCarousel");
var slideshowButton = document.getElementById("slideshowButton")
function toggleSlideshow(){ //used in an 'onclick' attribute of the relevant buttoon in the html file
	if(slideshow.hidden==true){
		slideshow.removeAttribute("hidden");
		var x = document.getElementsByClassName("carousel-item");
		for (i = 0; i < x.length; i++) {
		x[i].setAttribute("data-bs-interval", "2000");//setting the interval between each slide to 2 seconds rather than the longer default time-length from Bootstrap
		}
		slideshowButton.innerHTML="Hide Slideshow"
	}else{
		slideshow.setAttribute("hidden", "true");
		slideshowButton.innerHTML="View Slideshow"
	}
}

/****RECOMMENDATIONS TOOL: (Daniel Morrissey)
JQuery for 'Recommendations' tool; user can search via genre from a drop down menu or search a band via text input (case sensitive), Daniel Morrissey 21118701*/
$(document).ready(function(){
	let bands = ["rise against", "green day", "metallica", "taylor swift", "pink", "justin bieber", "rihanna", "beyonce", "drake", "johnny cash", "john denver", "steve earle"];
	let venue = ["Croke Park", "Old Trafford", "Turners Cross"];
	let rock = ["rise against", "green day", "metallica"];
	let rnb = ["rihanna", "beyonce", "drake"];
	let pop = ["taylor swift", "pink", "justin bieber"];
	let country = ["johnny cash", "john denver", "steve earle"];
	$(document).on("submit", "#recommendForm", function(event){
		//Prevents submission
		event.preventDefault();
		//Brings in genre/artist, converts it to lowercase and removes white space at start and end
		var genre = $("#genreList").val().toLowerCase().trim();
		var band = $("#band").val().toLowerCase().trim();
		//First if checks if only letters brought in
		if(/[^a-zA-Z]+$/.test(band)){
			$("#suggestions").text("Only letters are allowed").css("color", "#ff0000").css("border-style", "none");
		} else if(genre.length>0 && band.length>0){
		//Prevents searching both genre and artist at same time
			$("#suggestions").text("Either select a music genre or search similar artists").css("color", "#ff0000").css("border-style", "none");
		} else {
		//Search based off of genre
			if(genre.length==0 && band.length==0){
				$("#suggestions").text("Please select a genre or enter an artist or band").css("color", "#ff0000").css("border-style", "none");
			} else{
			//Shows bands in respect to their genre
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
			
		//Search based off of band name
		if(band.length==0 && genre.length == 0){
			//Prevents searching both genre and artist at same time
			$("#suggestions").text("Please select a genre OR enter an artist/band name.").css("color", "#ff0000").css("border-style", "none");
		} else{
			//Each if statement searches a band in each genre and if true will show similar bands but won't show band in input
			if(bandSearch(band, rock)){
				bandSearchFiller(rock, band, "Rock");
			} else if(bandSearch(band, rnb)){
				bandSearchFiller(rnb, band, "RnB");
			} else if(bandSearch(band, pop)){
				bandSearchFiller(pop, band, "Pop");
			} else if(bandSearch(band, country)){
				bandSearchFiller(country, band, "Country");
			} else if(genre.length==0 && band.length>0) {
				//If search brings no result
				$("#suggestions").text("No artist or band was found").css("color", "#ff0000").css("border-style", "none");
			}
		}
		}
	})
	
	//Function that shows band recommendations based on the select tag
	function suggestionFiller(genre, musicGenre){
		//Empties suggestion paragraph
		$("#suggestions").text("").css("color", "#000000");
		var bandHolder = "";
		//Adds the results to bandHolder
		for(var i = 0; i < genre.length; i++){
			bandHolder+= "<h3><i style='text-transform:capitalize'>" + genre[i] + "</i></h3>" + "<br/>Music Genre: " + musicGenre + "<br/><br/><img src='../images/" + genre[i] +".webp' class='suggestion' style='border-radius:0.5em;height:300px;display:block;margin-left:auto;margin-right:auto;' alt='image of band (not actually bands to avoid copyright issues)'/><br/>"
		}
		//Shows the results and shows show/hide button
		$("#suggestions").html(bandHolder);
		$("#suggestions").css("border-style", "solid").css("padding", "1em");
		$("#recommendShowHide").css("visibility", "visible");
	}
	//Function that shows band recommendations based on text input, skips the text input band. Structured similar to suggestionFiller method. Daniel 
	function bandSearchFiller(genre, band, musicGenre){
		$("#suggestions").text("").css("color", "#000000");
		var bandHolder="";
		for(var i = 0; i < genre.length; i++){				
			if(genre[i]!=band){
				bandHolder+="<h3><i style='text-transform:capitalize'>" + genre[i] + "</i></h3>" + "<br/>Music Genre: " + musicGenre + "<br/><br/><img src='../images/" + genre[i] + ".webp' class='suggestion' style='border-radius:0.5em;height:300px;display:block;margin-left:auto;margin-right:auto;' alt='image of band (not actually bands to avoid copyright issues)'/><br/>"
			} else{
				continue;				
			}
		}
		$("#suggestions").html(bandHolder);
		$("#suggestions").css("border-style", "solid").css("padding", "1em");
		$("#recommendShowHide").css("visibility", "visible");
	}
	//Function that searches for a band in each genre array, if found counter is incremented and loop stops. If counter is 1 return true.
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

/****GIGS TOOL: (Daniel Morrissey)
JQuery for 'Gigs' tool;
	Function that shows past gigs sorted by date (most recent first, got help from stackoverflow for the sort)*/
	function gigFiller(band, genre, venue){
		$("#resultGig").text("").css("color", "#000000");
		var bandGigHolder="";
		//Array that will be filled with 3 random dates
		var date = [randomDate(new Date(2015, 0, 1), new Date()), randomDate(new Date(2015, 0, 1), new Date()), randomDate(new Date(2015, 0, 1), new Date())];
		//Will sort array with most recent date first
		date.sort(function(a,b){
			var da = new Date(a).getTime();
			var db = new Date(b).getTime();
  
			return db < da ? -1 : db > da ? 1 : 0
		});
		for(var i = 0; i < genre.length; i++){
			bandGigHolder+="<h3><i style='text-transform:capitalize'>" + band + "</i></h3> <p>Venue: <i>" + venue[i] + "</i><br />" + date[i].toDateString() + "</p><img src='../images/" + band + ".webp' class='suggestion' style='border-radius:0.5em;height:300px;display:block;margin-left:auto;margin-right:auto;' alt='image of a gig (not actually gigs to avoid copyright issues)'/><br/>";
		}
		//Switch to include the relevant YouTube iFrame of a live event
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
		$("#instructionGigClose").css("visibility", "visible");
	}
	
	//Random date generator
	function randomDate(start, end) {
		return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
	}
	
	//Function that shows events
	$(document).on("submit", "#formGig", function(event){
		event.preventDefault();
		var bandGig = $("#bandGig").val().toLowerCase().trim();
		if(/[^a-zA-Z]+$/.test(bandGig)){
			$("#resultGig").text("Only letters are allowed").css("color", "#ff0000").css("border-style", "none");
		} else if(bandGig.length == 0){
			$("#resultGig").text("Please select an artist or band").css("color", "#ff0000").css("border-style", "none");
		} else {
			//Each if statement searches a band in each genre and if true will show past events in order of date most recent first
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
	
	//Toggles the user visibility of the show/hide button - Daniel Morrissey
	$(document).on("click", "#instructionGigClose", function(){
		$("#resultGig").toggle("slow");
	})
	$(document).on("click", "#recommendShowHide", function(){
		$("#suggestions").toggle("slow");
	})
});

/****CONTACT FORM (Ciara O'Malley & Colum Kavanagh)
Verify email address is valid using this JS arrow function called 'emailIsValid' (used in validateForm(); function below)*/
const emailIsValid = email => {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
//Form validation using raw Javascript
let valid = false;
function validateForm(){
	const form = document.getElementById("form");
	const email = document.getElementById('email').value;
	var emailDOM = document.getElementById('email');
	const name = document.getElementById('name');
	const message = document.getElementById('message').value;
	var messageDOM = document.getElementById('message');
	event.preventDefault();
	//Email address required
	if (email.length==0) {
		alert("Please enter your email address.");
		emailDOM.focus();
		event.preventDefault();
	//Return false;
	} else if (!emailIsValid(email)) {
		alert("Please enter a valid email address.");
		emailDOM.focus();
	} else if (message === "") {
	//Message content required
		alert("Please enter your message.");
		messageDOM.focus();
	} else {
		valid = true; // Can submit the form data to the server
	}
}

function formSubmit(){	//In a real-life scenario, a POST method would be used to send the data inputted by the user into the form securely to a server on the backend via n HTTP request
	//Get email data from form
	if(valid==true){
		var email = document.getElementById("email").value;
		//Hide form
		var form=document.getElementById("form");
		form.style.display="none";
		//Hide 'Submit' button
		var button=document.getElementById("formButton");
		button.style.display="none";
		//Insert data into paragraph and show the paragraph by inserting text into the paragraph using innerHTML.
		var p=document.getElementById("showSubmit");
		p.innerHTML="Thank you for your message. We will be in touch via "+email+" shortly.";
	}
}





