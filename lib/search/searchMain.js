//Builds the API call and sends it to sendRequest
//SEARCH FILTER FUNCTION WILL MODIFY queryString HERE
function getUserGames() {
	var user = document.getElementById("username").value;
	var queryString = "";
	if(user.length > 0) {
		queryString += user;
		queryString += "?max=5&opening=true"
		sendRequest(queryString);
	} else {
		alert("Please enter a username");
	}
}

//Function that receives payload
//CALL UI FUNCTION HERE
function handleResponse() {
	var payload = this.responseText;
	var gameObjectArray = parseResponse(payload);
        searchResults(gameObjectArray);
        
}

//Function to handle the submission of the request
function sendRequest(queryString) {
	var reqURL = "https://lichess.org/api/games/user/" + queryString;
	var req = new XMLHttpRequest();
	req.addEventListener("load", handleResponse);
	req.open("GET", reqURL);
	req.setRequestHeader("Accept", "application/x-ndjson");
	req.send();
	req.onloadend = function() {
		if(req.status == 404) {
			alert("User does not exist. Please enter a valid user.");
		}
	}
}

//Parses payload into an array of objects where each object contains all data from one game
function parseResponse(payload) {
	var gameArray = payload.split("\n");
	var gameObjectArray = [];
	for(var i in gameArray) {
		if(gameArray[i].length > 0) {
			gameObjectArray.push(JSON.parse(gameArray[i]));
		}
	}
	console.log(gameObjectArray[0]);				//to view game object structure
	console.log(gameObjectArray[0].opening.name);	//example of accessing game object properties
	return gameObjectArray;
}

