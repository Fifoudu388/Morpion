let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let mode = 'ami';
let gameActive = true;

const boardElement = document.getElementById('board');
const messageElement = document.getElementById('message');

function setMode(selectedMode) {
    mode = selectedMode;
    startGame();
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
    if (mode !== 'ami' && currentPlayer === 'O') {
        aiMove();
    }
    renderBoard();
}

function aiMove() {
    // Logique simple pour l'IA
    const availableIndices = board.map((cell, index) => cell ? null : index).filter(index => index !== null);
    if (availableIndices.length > 0) {
        const randomIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
        board[randomIndex] = currentPlayer;
        checkWinner();
        currentPlayer = 'X'; // Revenir au joueur X
        renderBoard();
    }
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
            gameActive = false;
            return;
        }
    }

    if (!board.includes('')) {
        messageElement.innerText = 'Match nul!';
        gameActive = false;
    }
}

function restartGame() {
    startGame();
}

// Initialiser le jeu
startGame();
