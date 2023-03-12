var board = ['', '', '', '', '', '', '', '', ''];
var player = 'X';

var cells = document.querySelectorAll('.cell');
stack = ["X"]
cells.forEach(cell => {
    cell.addEventListener('click', handleClick, { once: true });
    cell.addEventListener('mouseover', handlehover,);
    cell.addEventListener('mouseleave', handleleave, );
});

function handlehover(event) {
    var index = event.target.id;
    if (board[index] == '') {
        event.target.style.color = player === 'X' ? '#66ff66' : '#1a8cff';
        event.target.textContent = player;
    }
}
function handleleave(event) {
    var index = event.target.id;
    if (board[index] == '') {
        event.target.style.color = '#000000';
        event.target.textContent = '';
    }
}

function handleClick(event) {
    var index = event.target.id;
    if (player === 'X') {
        board[index] = player;
        event.target.style.color = player === 'X' ? '#66ff66' : '#1a8cff';
        event.target.textContent = player;
        player = player === 'X' ? 'O' : 'X';
        x=winner();
        let newBoard = Object.assign([], board);
        if (x == 0)
            l=minimax(newBoard,"O");
            var cell = document.getElementById(l.index);
            board[l.index] = player;
            cell.style.color = player === 'X' ? '#66ff66' : '#1a8cff';
            cell.textContent = player;
            player = 'X';
            winner();   
    }
}

function minimax(newBoard, player){
    var availSpots = emptyIndexies(newBoard);
    if (checkWinner(newBoard)==="X"){
        return {score:-10};
     }
       else if (checkWinner(newBoard)==="O"){
       return {score:10};
       }
     else if (availSpots.length === 0){
        return {score:0};
    }
    var moves = [];

  for (var i = 0; i < availSpots.length; i++){
    var move = {};
  	move.index = availSpots[i];

    newBoard[availSpots[i]] = player;

    if (player == "O"){
      var result = minimax(newBoard, "O");
      move.score = result.score;
    }

    newBoard[availSpots[i]] = move.index;
    moves.push(move);
  }
  var bestMove;
  if(player === 'O'){
    var bestScore = -10000;
    for(var i = 0; i < moves.length; i++){
      if(moves[i].score > bestScore){
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }  
  return moves[bestMove];
}

function emptyIndexies(hboard){
    empty = [];
    for (var i = 0; i < hboard.length; i++){
        if (hboard[i] == ''){
            empty.push(i);
        }
    }
    return empty;
  }

function winner() {
    var winner = checkWinner(board);
    if (winner) {
        alert('Player ' + winner + ' wins!');
        resetGame();
        return 1;
    } else if (board.every(cell => cell !== '')) {
        alert('It\'s a tie!');
        resetGame();
        return 1;
    }
    return 0;
}
function checkWinner(nboard) {
    var lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (var i = 0; i < lines.length; i++) {
        var [a, b, c] = lines[i];
        if (nboard[a] && nboard[a] === nboard[b] && nboard[a] === nboard[c]) {
            return nboard[a];
        }
    }
    return null;
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    player = 'X';
    cells.forEach(cell => {
        cell.textContent = '';
        cell.addEventListener('click', handleClick, { once: true });
    });
}

function undoit(){
    var cell = document.getElementById(stack[0]);
    cell.textContent = '';
    board[stack[0]] = '';
    cell.addEventListener('click', handleClick, { once: true });
    if (player === 'X') {
        player = 'O';
    }
    else{    
        player = 'X';
    }
    
}

