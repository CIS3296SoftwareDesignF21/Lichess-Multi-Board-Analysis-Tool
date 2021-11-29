function createBoard(pgn, black, white, date) {
    const n = window.nboards;
	if(n > 10) {
		alert("You've reached the maximum number of boards available");
	} else {
		document.getElementById("boardControls").style.display = "inherit";
    
    let boardN = 'board' + n;

    let boardContainer = document.getElementById('boards');
    let board = document.createElement('div');
    let innerBoard = document.createElement('div');

    let xButton = document.createElement('button');
    xButton.innerHTML = 'X';
    xButton.id = 'xButton';
    xButton.onclick = function () {
        boardContainer.removeChild(board);
    };
    board.appendChild(xButton);

    let info = document.createElement('div');
    info.innerHTML = "Black: " + black
            + "\nWhite: " + white
            + "\nDate: " + date;
    board.appendChild(info);

    innerBoard.classList.add('column')
    innerBoard.setAttribute('id', boardN);
    board.appendChild(innerBoard);

		boardContainer.appendChild(board);

		PGNV.pgnView(boardN,{ pgn, pieceStyle: 'merida' });
		window.nboards += 1;
	}
}

function viewCustomGame(){
  let inputFile = document.getElementById('customGameId').value;
  
  var inputArr = inputFile.split(']');
  let whiteName = inputArr[3].split('"')[1];
  let blackName = inputArr[4].split('"')[1];
  let pgnN = inputArr[10];
  let date = inputArr[2].split('"')[1];

  createBoard(pgnN, blackName, whiteName, date);

}