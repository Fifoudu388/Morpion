let gameBoard = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let isGameOver = false;
let gameMode = '';

// Initialiser le jeu
function setMode(mode) {
    gameMode = mode;
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    isGameOver = false;
    document.querySelectorAll('.cell').forEach(cell => cell.textContent = '');
    document.getElementById("message").textContent = `Mode : ${mode.toUpperCase()}`;
    if (mode === 'multiplayer-link') {
        startOnlineGame();
    }
}

// Joueur fait un mouvement
function handleCellClick(e) {
    const cellIndex = Array.from(e.target.parentNode.children).indexOf(e.target);
    if (gameBoard[cellIndex] === '' && !isGameOver) {
        gameBoard[cellIndex] = currentPlayer;
        e.target.textContent = currentPlayer;
        checkWinner();
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

// Vérification du gagnant
function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    
    winPatterns.forEach(pattern => {
        const [a, b, c] = pattern;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            document.getElementById("message").textContent = `Le joueur ${currentPlayer} a gagné !`;
            isGameOver = true;
        }
    });
    
    if (!gameBoard.includes('') && !isGameOver) {
        document.getElementById("message").textContent = "Match nul !";
        isGameOver = true;
    }
}

// Mode multijoueur avec partage de lien
function startOnlineGame() {
    const gameId = Math.random().toString(36).substring(2, 10);
    document.getElementById("message").textContent = `Partagez ce lien : https://votre-jeu-de-morpion.com/game/${gameId}`;
    // Initialiser la communication avec un serveur pour synchroniser les coups.
}

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
