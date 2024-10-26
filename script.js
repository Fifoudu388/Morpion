let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let scoreX = 0;
let scoreO = 0;
let gameActive = true;

const boardElement = document.getElementById('board');
const messageElement = document.getElementById('message');
const scoreXElement = document.getElementById('scoreX');
const scoreOElement = document.getElementById('scoreO');

function setMode(selectedMode) {
    if (selectedMode === 'multijoueur') {
        // Gérer le mode multijoueur ici
        alert("Fonctionnalité à implémenter pour le partage de lien.");
    } else {
        startGame();
    }
}

function startGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    messageElement.innerText = '';
    renderBoard();
}

function renderBoard() {
    boardElement.innerHTML = '';
    board.forEach((cell, index) => {
        const cellElement = document.createElement('div');
        cellElement.classList.add('cell');
        cellElement.innerText = cell;
        cellElement.onclick = () => handleCellClick(index);
        boardElement.appendChild(cellElement);
    });
}

function handleCellClick(index) {
    if (board[index] || !gameActive) return;
    board[index] = currentPlayer;
    checkWinner();
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    renderBoard();
}

function checkWinner() {
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            messageElement.innerText = `${board[a]} a gagné!`;
            updateScore(board[a]);
            gameActive = false;
            return;
        }
    }

    if (!board.includes('')) {
        messageElement.innerText = 'Match nul!';
        gameActive = false;
    }
}

function updateScore(winner) {
    if (winner === 'X') {
        scoreX++;
    } else if (winner === 'O') {
        scoreO++;
    }
    scoreXElement.innerText = scoreX;
    scoreOElement.innerText = scoreO;
}

function restartGame() {
    startGame();
}

function resetScores() {
    scoreX = 0;
    scoreO = 0;
    scoreXElement.innerText = scoreX;
    scoreOElement.innerText = scoreO;
    startGame();
}

// Initialiser le jeu
startGame();
