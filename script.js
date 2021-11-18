window.addEventListener("DOMContentLoaded", init);

function init(){
	let currentDate = document.getElementById("currentYear");
	currentDate.innerHTML = "&copy;" + new Date().getFullYear();
}