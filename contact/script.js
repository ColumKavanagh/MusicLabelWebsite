function formSubmit(){	

	//stop form from submitting
  	event.preventDefault();
  	//hide form
	var form=document.getElementById("form");
	form.style.display="none";
	//hide 'Submit' button
	var button=document.getElementById("button");
	button.style.display="none";	
	//get data from form
	var name = document.getElementById("name").value;
	//insert data into paragraph and show the paragraph by inserting text into the paragraph using innerHTML.
	var p=document.getElementById("showSubmit");
	p.innerHTML="Hi "+name+". Thank you for your message. We will be in touch shortly.";
}

