var xmlHttp = createXmlHttpRequestObject();

function createXmlHttpRequestObject(){
	var xmlHttp;
	
	if(window.ActiveXObject){
		try{
			xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
		}catch(e){
			xmlHttp = false;
		}
	}
	else{
		try{
			xmlHttp = new xmlHttpRequest();
		}catch(e){
			xmlHttp = false;
		}
	}
	
	if(!xmlHttp)
		alert("Can't create that object!");
	else
		return xmlHttp;
}

function process(){
	if(xmlHttp.readyState==0 || xmlHttp.readyState==4){
		food = encodeURIComponent(document.getElementById("userinput").value);
		xmlHttp.open("GET", "foodstore.php?food=" + food, true);
		xmlHttp.onreadystatechange = handleServerResponse;
		xmlHttp.send(null);
	}
	else{
		setTimeout('process()',1000);
	}
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