let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let scoreX = 0;
let scoreO = 0;
let gameActive = true;
let mode = 'ami';
let aiDifficulty = 'facile';

const boardElement = document.getElementById('board');
const messageElement = document.getElementById('message');
const scoreXElement = document.getElementById('scoreX');
const scoreOElement = document.getElementById('scoreO');
const shareLinkElement = document.getElementById('share-link');

function setMode(selectedMode) {
    mode = selectedMode;
    if (mode === 'multijoueur') {
        // Charger l'état du jeu à partir de l'URL
        loadGameState();
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
    updateShareLink();
}

function handleCellClick(index) {
    if (board[index] || !gameActive) return;
    board[index] = currentPlayer;
    checkWinner();
    if (mode === 'ami' || mode === 'multijoueur') {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    } else {
        aiMove();
    }
    saveGameState();
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

function aiMove() {
    let availableIndices = board.map((cell, index) => cell ? null : index).filter(index => index !== null);

    if (aiDifficulty === 'facile') {
        const randomIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
        board[randomIndex] = currentPlayer;
    } else if (aiDifficulty === 'moyen') {
        // Implémentez une logique AI moyenne ici
        // Pour l'exemple, on choisit aléatoirement
        const randomIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
        board[randomIndex] = currentPlayer;
    } else if (aiDifficulty === 'difficile') {
        // Implémentez une logique AI difficile ici (Minimax par exemple)
        // Pour l'exemple, on choisit aléatoirement
        const randomIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
        board[randomIndex] = currentPlayer;
    }
    
    checkWinner();
    currentPlayer = 'X'; // Revenir au joueur X
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

function updateShareLink() {
    const gameState = JSON.stringify({ board, currentPlayer, scoreX, scoreO });
    const encodedState = btoa(gameState);
    shareLinkElement.innerHTML = `Partagez ce lien pour jouer : <a href="?state=${encodedState}">${window.location.href.split('?')[0]}?state=${encodedState}</a>`;
}

function loadGameState() {
    const params = new URLSearchParams(window.location.search);
    const state = params.get('state');
    if (state) {
        const decodedState = atob(state);
        const { board: loadedBoard, currentPlayer: loadedPlayer, scoreX: loadedScoreX, scoreO: loadedScoreO } = JSON.parse(decodedState);
        board = loadedBoard;
        currentPlayer = loadedPlayer;
        scoreX = loadedScoreX;
        scoreO = loadedScoreO;
        gameActive = true;
        renderBoard();
    } else {
        startGame();
    }
}

function saveGameState() {
    if (mode === 'multijoueur') {
        const gameState = JSON.stringify({ board, currentPlayer, scoreX, scoreO });
        const encodedState = btoa(gameState);
        history.replaceState(null, '', `?state=${encodedState}`);
    }
}

// Initialiser le jeu
loadGameState();
