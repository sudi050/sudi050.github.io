var board = ['', '', '', '', '', '', '', '', ''];
var player = 'X';
console.log("Connected") 
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

    stack[0] = index
    console.log(stack[0],index)
    board[index] = player;
    event.target.style.color = player === 'X' ? '#66ff66' : '#1a8cff';
    event.target.textContent = player;
    player = player === 'X' ? 'O' : 'X';

    var winner = checkWinner();
    if (winner) {
        alert('Player ' + winner + ' wins!');
        resetGame();
    } else if (board.every(cell => cell !== '')) {
        alert('It\'s a tie!');
        resetGame();
    }
}

function checkWinner() {
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
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
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

