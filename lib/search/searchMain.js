//Builds the API call and sends it to sendRequest
function getUserGames() {
	if(document.getElementById("numOfGamesValue").value > 500) {
		alert("Please enter a number smaller than 500");
	} else {
		document.getElementById("loadingText").style.visibility = "";
		document.getElementById("submitButton").disabled = true;
		var filterQuery = buildFilterQuery();
		sendRequest(filterQuery);
	}
}

//Function that receives payload
function handleResponse() {
	var payload = this.responseText;
	var gameObjectArray = parseResponse(payload);
	gameObjectArray = filterResultsByOpening(gameObjectArray);
	searchResults(gameObjectArray);
	document.getElementById("loadingText").style.visibility = "hidden";
	document.getElementById("submitButton").disabled = false;
}

//Returns the list of game objects containing the entered opening name
function filterResultsByOpening(gameObjectArray) {
	var newGameObjectArray = [];
	var openingName = document.getElementById("opening").value;
	for(var i=0; i<gameObjectArray.length; i++) {
		if(gameObjectArray[i].opening.name.toLowerCase().includes(openingName.toLowerCase())) {
			newGameObjectArray.push(gameObjectArray[i]);
		}
	}
	return newGameObjectArray;
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
	return gameObjectArray;
}

//Function to build query string for API request
function buildFilterQuery() {
	var queryString = "";
	var color = "";
	var numGames = "";
	var user = document.getElementById("username").value;
	if (user.length > 0) {
		user = document.getElementById("username").value + "?opening=true";
		if(document.getElementById("colors").value != "both") {
			color = "&color=" + document.getElementById("colors").value;
		}
		if(document.getElementById("numOfGamesValue").value) {
			numGames = "&max=" + document.getElementById("numOfGamesValue").value;
		}
		queryString = user + color + numGames;
		//console.log(queryString);
		return queryString;
	} else {
		alert("Please enter a username");
	}
}