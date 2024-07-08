const canvas = document.getElementById('tetris');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const startButton = document.getElementById('start-button');

const ROWS = 20;
const COLS = 10;
const BLOCK_SIZE = 20;

let board = createBoard();
let score = 0;
let gameOver = false;
let intervalId;

const SHAPES = [
    [[1, 1, 1, 1]],
    [[1, 1], [1, 1]],
    [[1, 1, 1], [0, 1, 0]],
    [[1, 1, 1], [1, 0, 0]],
    [[1, 1, 1], [0, 0, 1]],
    [[1, 1, 0], [0, 1, 1]],
    [[0, 1, 1], [1, 1, 0]]
];

let currentShape;
let currentX;
let currentY;

function createBoard() {
    return Array.from({length: ROWS}, () => Array(COLS).fill(0));
}

function drawBoard() {
    board.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value) {
                ctx.fillStyle = 'blue';
                ctx.fillRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
                ctx.strokeStyle = 'white';
                ctx.strokeRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
            }
        });
    });
}

function drawShape() {
    currentShape.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value) {
                ctx.fillStyle = 'red';
                ctx.fillRect((currentX + x) * BLOCK_SIZE, (currentY + y) * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
                ctx.strokeStyle = 'white';
                ctx.strokeRect((currentX + x) * BLOCK_SIZE, (currentY + y) * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
            }
        });
    });
}

function newShape() {
    currentShape = SHAPES[Math.floor(Math.random() * SHAPES.length)];
    currentX = Math.floor(COLS / 2) - Math.floor(currentShape[0].length / 2);
    currentY = 0;

    if (collision()) {
        gameOver = true;
    }
}

function collision() {
    for (let y = 0; y < currentShape.length; y++) {
        for (let x = 0; x < currentShape[y].length; x++) {
            if (currentShape[y][x] && (board[currentY + y] && board[currentY + y][currentX + x]) !== 0) {
                return true;
            }
        }
    }
    return false;
}

function merge() {
    currentShape.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value) {
                board[currentY + y][currentX + x] = value;
            }
        });
    });
}

function rotate() {
    const rotated = currentShape[0].map((_, index) =>
        currentShape.map(row => row[index]).reverse()
    );
    const prevShape = currentShape;
    currentShape = rotated;
    if (collision()) {
        currentShape = prevShape;
    }
}

function moveDown() {
    currentY++;
    if (collision()) {
        currentY--;
        merge();
        newShape();
        clearLines();
    }
}

function moveLeft() {
    currentX--;
    if (collision()) {
        currentX++;
    }
}

function moveRight() {
    currentX++;
    if (collision()) {
        currentX--;
    }
}

function clearLines() {
    let linesCleared = 0;
    for (let y = ROWS - 1; y >= 0; y--) {
        if (board[y].every(value => value !== 0)) {
            board.splice(y, 1);
            board.unshift(Array(COLS).fill(0));
            linesCleared++;
        }
    }
    score += linesCleared * 100;
    scoreElement.textContent = score;
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBoard();
    drawShape();
}

function gameLoop() {
    if (!gameOver) {
        moveDown();
        draw();
    } else {
        clearInterval(intervalId);
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'white';
        ctx.font = '20px Arial';
        ctx.fillText('Game Over', canvas.width / 2 - 40, canvas.height / 2);
    }
}

function startGame() {
    if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
    } else {
        newShape();
        intervalId = setInterval(gameLoop, 500);
    }
}

document.addEventListener('keydown', event => {
    if (!gameOver && intervalId) {
        switch (event.keyCode) {
            case 37: moveLeft(); break;
            case 38: rotate(); break;
            case 39: moveRight(); break;
            case 40: moveDown(); break;
        }
        draw();
    }
});

startButton.addEventListener('click', startGame);