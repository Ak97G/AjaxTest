var xmlHttp = createXmlHttpRequestObject();

function createXmlHttpRequestObject(){
	xmlHttp = new xmlHttpRequest();
}	

function process(){

		food = encodeURIComponent(document.getElementById("userinput").value);
		xmlHttp.open("GET", "foodstore.php?food=" + food, true);
		xmlHttp.onreadystatechange = handleServerResponse;
		xmlHttp.send(null);
}

function handleServerResponse(){
	if(xmlHttp.readyState==4 && xmlHttp.status==200){
		xmlResponse = xmlHttp.responseXML;
		xmlDocumentElement = xmlResponse.documentElement;
		message = xmlDocumentElement.firstChild.data;
		document.getElementById("underinput").innerHTML = '<span style="color:red">' + message + '</span>';
		setTimeout('process()',1000);
	}
	else{
		alert('Something went wrong!');
	}
}