// Get the canvas and context
const canvas = document.getElementById('go-board');
const ctx = canvas.getContext('2d');

// Constants for Board Size
const BOARD_SIZE = 19;
const TILE_SIZE = canvas.width / BOARD_SIZE;

// Draw the Go Board
function drawBoard() {
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 2;

    // Draw grid lines
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
    }
}

drawBoard();