function formSubmit(){	

	//stop form from submitting
  	event.preventDefault();
  	//hide form
	var form=document.getElementById("form");
	form.style.display="none";	
	//get data from form
	var name = document.getElementById("name").value;
	//insert data into paragraph
	document.getElementById("name").innerHTML=name;
	//show the paragraph
	var p=document.getElementById("showSubmit");
	p.style.display="block";
}

