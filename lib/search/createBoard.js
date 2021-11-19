function createBoard(pgn) {
    const n = window.nboards;

    let boardN = 'board'+n;

    let boardContainer = document.getElementById('boards');
    let board = document.createElement('div');
    board.classList.add('column')
    board.setAttribute('id', boardN);

    boardContainer.appendChild(board);

    PGNV.pgnView(boardN,{ pgn, pieceStyle: 'merida' });

    window.nboards += 1;
}
