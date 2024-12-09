// Get elements
const canvas = document.getElementById("go-board");
const ctx = canvas.getContext("2d");
const output = document.getElementById("game-output");

// Board constants
const BOARD_SIZE = 19;
const TILE_SIZE = canvas.width / BOARD_SIZE;

// Game state
let board = Array.from(Array(BOARD_SIZE), () => Array(BOARD_SIZE).fill(0));  // 0 = empty, 1 = Black, 2 = White
let currentPlayer = 1;  // 1 = Black, 2 = White

// Star points (hoshi points) on a 19x19 board
const starPoints = [
    [3, 3], [9, 9], [15, 15],
    [3, 15], [15, 3],
    [9, 3], [3, 9], [15, 9], [9, 15]
];

// Draw the Go board with star points and coordinates
function drawBoard() {
    ctx.strokeStyle = "#333";
    ctx.lineWidth = 2;

    for (let i = 0; i < BOARD_SIZE; i++) {
        // Horizontal lines
        ctx.beginPath();
        ctx.moveTo(TILE_SIZE / 2, TILE_SIZE / 2 + i * TILE_SIZE);
        ctx.lineTo(canvas.width - TILE_SIZE / 2, TILE_SIZE / 2 + i * TILE_SIZE);
        ctx.stroke();

        // Vertical lines
        ctx.beginPath();
        ctx.moveTo(TILE_SIZE / 2 + i * TILE_SIZE, TILE_SIZE / 2);
        ctx.lineTo(TILE_SIZE / 2 + i * TILE_SIZE, canvas.height - TILE_SIZE / 2);
        ctx.stroke();

        // Draw coordinates on the edges
        ctx.font = "14px Arial";
        ctx.fillStyle = "#333";
        if (i < BOARD_SIZE) {
            // Draw row numbers
            ctx.fillText(i + 1, TILE_SIZE / 2 - 10, TILE_SIZE / 2 + i * TILE_SIZE);
            // Draw column letters
            ctx.fillText(String.fromCharCode(65 + i), TILE_SIZE / 2 + i * TILE_SIZE - 10, TILE_SIZE / 2 - 10);
        }
    }

    // Mark the star points (hoshi points)
    starPoints.forEach(point => {
        const x = point[0];
        const y = point[1];
        ctx.beginPath();
        ctx.arc(
            TILE_SIZE / 2 + x * TILE_SIZE, 
            TILE_SIZE / 2 + y * TILE_SIZE, 
            TILE_SIZE / 6, 
            0, Math.PI * 2
        );
        ctx.fillStyle = "#000";
        ctx.fill();
    });
}

// Draw a stone
function drawStone(x, y, player) {
    ctx.beginPath();
    ctx.arc(
        TILE_SIZE / 2 + x * TILE_SIZE,
        TILE_SIZE / 2 + y * TILE_SIZE,
        TILE_SIZE / 3,
        0, Math.PI * 2
    );
    ctx.fillStyle = player === 1 ? "black" : "white";
    ctx.fill();
    ctx.stroke();
}

// Handle user clicks to place stones
canvas.addEventListener('click', (event) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    // Calculate intersection coordinates
    const x = Math.floor(mouseX / TILE_SIZE);
    const y = Math.floor(mouseY / TILE_SIZE);

    // Ensure the spot is empty
    if (board[y][x] === 0) {
        // Place the stone
        board[y][x] = currentPlayer;
        drawStone(x, y, currentPlayer);

        // Switch players
        currentPlayer = currentPlayer === 1 ? 2 : 1;
    }
});

// Handle SGF file upload
document.getElementById("sgf-file").addEventListener("change", readSGFFile);

function readSGFFile(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        const sgfData = e.target.result;
        parseSGF(sgfData);
    };
    reader.readAsText(file);
}

// Parse SGF content
function parseSGF(sgfData) {
    const moves = sgfData.match(/;(B|W)([a-s]{2})/g);
    if (!moves) {
        alert("Invalid SGF file.");
        return;
    }

    let moveList = moves.map(move => {
        const color = move[1] === "B" ? "Black" : "White";
        const pos = move.match(/([a-s]{2})/)[1];
        return { color, pos };
    });

    displayMoves(moveList);
}

// Display parsed moves and generate a challenge
function displayMoves(moveList) {
    output.textContent = "Game Moves:\n";
    moveList.forEach((move, index) => {
        output.textContent += `${index + 1}. ${move.color} at ${move.pos}\n`;
    });

    // Example Challenge: Ask after first 5 moves
    const challenge = moveList.slice(0, 5);
    const nextMove = challenge[4]; // Example move

    alert(`Challenge: What is the best move after ${JSON.stringify(challenge)}`);
}

// Initialize the board
drawBoard();
