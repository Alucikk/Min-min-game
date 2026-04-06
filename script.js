const canvas = document.getElementById("GameMin");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth - 20;
canvas.height = window.innerHeight - 20;

let lastTime = 0;
let deltaTime = 0;
let fps = 0;
let frameCount = 0;
let fpsTimer = 0;

let score = 0;
let catY = 150;
let velocity = 0;
let gravity = 0.3;
let jump = -6;
let pipes = [];
let pipeWidth = 55;
let pipeGap = 200;
let pipeSpeed = 1.7;
let isGameOver = false; 

function createPipe() {
    if (isGameOver) return; 
    let pipeHeight = Math.random() * (canvas.height - pipeGap - 100) + 50;
    pipes.push({ x: canvas.width, top: pipeHeight, passed: false });
}
function spawnPipes() {
    if (!isGameOver) {
        createPipe();
    }
    
    let randomDelay = Math.random() * (4125 - 2560) + 2560;
    setTimeout(spawnPipes, randomDelay);
}
spawnPipes();

function resetGame() {
    score = 0;
    catY = canvas.height / 2;
    velocity = 0;
    pipes = [];
    isGameOver = false;
    lastTime = 0; 
    document.getElementById("gameOverScreen").classList.add("hidden"); 
    requestAnimationFrame(draw); 
}

function updatePhysics(dt) {
    if (isGameOver) return;
    if (dt > 100) dt = 16.6;
    const timeStep = dt / 16.6;

    velocity += gravity * timeStep;
    catY += velocity * timeStep;

    for (let i = 0; i < pipes.length; i++) {
        pipes[i].x -= pipeSpeed * timeStep;
    }
}

function calculateFPS(dt) {
    fpsTimer += dt;
    frameCount++;
    if (fpsTimer >= 1000) { 
        fps = frameCount;
        frameCount = 0;
        fpsTimer = 0;
    }
}

function draw(timestamp) {
    if (isGameOver) return; 
    if (!lastTime) lastTime = timestamp;
    deltaTime = timestamp - lastTime;
    lastTime = timestamp;
    updatePhysics(deltaTime);
    calculateFPS(deltaTime);

    ctx.clearRect(0, 0, canvas.width, canvas.height); 

    if (catY < 0) catY = 0;
    if (catY + 45 > canvas.height) {
        catY = canvas.height - 45;
        velocity = 0; 
    } 

    for (let i = 0; i < pipes.length; i++) {
        let p = pipes[i];
        ctx.fillStyle = "purple"; 
        ctx.fillRect(p.x, 0, pipeWidth, p.top); 
        ctx.fillRect(p.x, p.top + pipeGap, pipeWidth, canvas.height); 

        if (55 + 45 > p.x && 55 < p.x + pipeWidth && 
           (catY < p.top || catY + 45 > p.top + pipeGap)) {
            gameOver();
            return; 
        }
        if (!p.passed && p.x + pipeWidth < 55) {
            score++;
            p.passed = true;
        }
        if (p.x + pipeWidth < 0) {
            pipes.splice(i, 1);
            i--;
        }
    }
    ctx.save();
    ctx.translate(55, catY);
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.moveTo(3, 8); ctx.quadraticCurveTo(13, -25, 23, 8); 
    ctx.moveTo(22, 8); ctx.quadraticCurveTo(32, -25, 42, 8); 
    ctx.fill(); 

    ctx.fillStyle = "#FFC0CB"; 
    ctx.beginPath();
    ctx.moveTo(7, 8); ctx.quadraticCurveTo(13, -15, 19, 8); 
    ctx.moveTo(26, 8); ctx.quadraticCurveTo(32, -15, 38, 8); 
    ctx.fill();

    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.roundRect(0, 0, 45, 45, 12); 
    ctx.fill(); 

    ctx.beginPath(); ctx.arc(0, 35, 5, 0, 7); ctx.fill();

    ctx.fillStyle = "yellow";
    ctx.beginPath(); ctx.arc(15, 18, 7, 0, 7); ctx.arc(30, 18, 7, 0, 7); ctx.fill();

    ctx.fillStyle = "black";
    ctx.beginPath(); ctx.arc(15, 18, 3.5, 0, 7); ctx.arc(30, 18, 3.5, 0, 7); ctx.fill();

    ctx.fillStyle = "#FFC0CB"; 
    ctx.beginPath(); ctx.arc(22.5, 28, 2.5, 0, 7); ctx.fill();

    ctx.strokeStyle = "white"; 
    ctx.lineWidth = 0.8; 
    ctx.beginPath();
    ctx.moveTo(19, 30); ctx.lineTo(12, 30); 
    ctx.moveTo(18, 33); ctx.lineTo(10, 34); 
    ctx.moveTo(26, 30); ctx.lineTo(33, 30); 
    ctx.moveTo(27, 33); ctx.lineTo(35, 34);
    ctx.stroke();
    ctx.restore();

    ctx.fillStyle = "darkblue";
    ctx.font = "bold 28px Times New Roman"; // Трохи більший і жирний
    ctx.fillText("Рахунок: " + score, 30, 60);

    ctx.fillStyle = "darkblue"; 
    ctx.font = "bold 28px Times New Roman"; 
    
    let fpsText = "FPS: " + fps;
    let textWidth = ctx.measureText(fpsText).width;
    
    ctx.fillText(fpsText, canvas.width - textWidth - 30, 60);

    requestAnimationFrame(draw);
}

window.addEventListener("keydown", function(event) {
    if (event.code === "Space") {
        event.preventDefault();  
        if (!isGameOver) {
            velocity = jump;
        }
    }
});
function gameOver() {
    isGameOver = true;
    const screen = document.getElementById("gameOverScreen");
    const scoreText = document.getElementById("finalScore");
    scoreText.innerText = score; 
    screen.classList.remove("hidden"); 
}
requestAnimationFrame(draw);