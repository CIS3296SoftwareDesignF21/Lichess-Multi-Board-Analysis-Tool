function nextAllBoards() {
	var nextButtons = document.getElementsByClassName("pgnvbutton next");
	for(var i=0; i<nextButtons.length; i++) {
		var buttonId = nextButtons[i].id;
		document.getElementById(buttonId).click();
	}
}

function backAllBoards() {
	var backButtons = document.getElementsByClassName("pgnvbutton prev");
	for(var i=0; i<backButtons.length; i++) {
		var buttonId = backButtons[i].id;
		document.getElementById(buttonId).click();
	}
}

function firstAllBoards() {
	var firstButtons = document.getElementsByClassName("pgnvbutton first");
	for(var i=0; i<firstButtons.length; i++) {
		var buttonId = firstButtons[i].id;
		document.getElementById(buttonId).click();
	}
}

function lastAllBoards() {
	var lastButtons = document.getElementsByClassName("pgnvbutton last");
	for(var i=0; i<lastButtons.length; i++) {
		var buttonId = lastButtons[i].id;
		document.getElementById(buttonId).click();
	}
}

function flipAllBoards() {
	var flipButtons = document.getElementsByClassName("pgnvbutton flipper");
	for(var i=0; i<flipButtons.length; i++) {
		var buttonId = flipButtons[i].id;
		document.getElementById(buttonId).click();
	}
}