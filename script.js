class UIGame {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        // Знаходимо елементи екранів у HTML
        this.gameOverScreen = document.getElementById("gameOverScreen");
        this.finalScoreElement = document.getElementById("finalScore");
    }
    // Малюємо текст+інтерфейс на полотні
    render(score, fps, isPaused, isGameOver, playerName, highScore, difficulty) {
        this.ctx.fillStyle = "darkblue"; 
        this.ctx.font = "bold 24px Times New Roman"; 
        const diffLabels = { "easy": "Легкий", "medium": "Середній", "hard": "Складний" };
        
        // Рядок з усією інформацією про гравця
        let infoText = `Гравець: ${playerName} | Рівень: ${diffLabels[difficulty]} | Рахунок: ${score} | Рекорд: ${highScore}`;
        this.ctx.fillText(infoText, 30, 45);
        
        // Малюємо FPS окремо
        let fpsText = "FPS: " + (fps || 0);
        this.ctx.fillText(fpsText, this.canvas.width - this.ctx.measureText(fpsText).width - 30, 45);

        // Якщо пауза — напис по центру
        if (isPaused && !isGameOver) {
            this.ctx.fillStyle = "rgba(0, 0, 0, 0.3)"; // Затемнення
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.fillStyle = "black";
            this.ctx.font = "bold 55px Times New Roman";
            this.ctx.textAlign = "center";
            this.ctx.fillText("ПАУЗА", this.canvas.width / 2, this.canvas.height / 2);
            this.ctx.textAlign = "start"; // Повертаємо вирівнювання назад
        }
    }
    //Вікно програшу
    showGameOver(score, record) {
        this.finalScoreElement.innerHTML = score + "<br><small>Ваш рекорд: " + record + "</small>";
        this.gameOverScreen.classList.remove("hidden");
    }
    // Ховаємо вікно програшу
    hideGameOver() {
        this.gameOverScreen.classList.add("hidden");
    }
}
class Game {
    constructor() {
        this.canvas = document.getElementById("GameMin");
        this.ctx = this.canvas.getContext("2d");
        // Підлаштовуємо розмір під вікно
        this.canvas.width = window.innerWidth - 20;
        this.canvas.height = window.innerHeight - 20;

        this.ui = new UIGame(this.canvas, this.ctx);
        
        this.playerName = "";
        this.highScore = 0;
        this.difficulty = "easy"; 

        this.init();
        this.bindEvents();
    }

    // Налаштування профілю+завантаження рекорду
    setProfile(name, difficulty) {
        this.playerName = name || "Гравець";
        this.difficulty = difficulty || "easy";
        
        // Ключ для збереження саме для цього гравця і рівня
        let storageKey = "MinMin_Rec_" + this.playerName + "_" + this.difficulty;
        let saved = localStorage.getItem(storageKey);
        this.highScore = saved ? parseInt(saved) : 0;
        
        document.getElementById("authScreen").classList.add("hidden");
        this.reset();
    }

    // Оновлення рекорду в пам'яті
    updateHighScore() {
        if (this.score > this.highScore) {
            this.highScore = this.score;
            let storageKey = "MinMin_Rec_" + this.playerName + "_" + this.difficulty;
            localStorage.setItem(storageKey, this.highScore);
        }
    }
    // Початкові налаштування гри
    init() {
        this.cat = new Cat();
        this.pipes = [];
        this.score = 0;
        this.isGameOver = false;
        this.isPaused = false;
        this.lastTime = 0;
        this.fps = 0;
    }
    // Керування клавішами
    bindEvents() {
        window.addEventListener("keydown", (e) => {
            if (e.code === "Space") {
                e.preventDefault();
                // Стрибок
                if (!this.isGameOver && !this.isPaused) this.cat.velocity = this.cat.jump;
            }
            if (e.code === "Escape") this.isPaused = !this.isPaused; // Пауза
        });
    }
    // Створення нових перешкод
    spawnPipe() {
        if (!this.isGameOver && !this.isPaused) {
            this.pipes.push(new Pipe(this.canvas.width, this.canvas.height));
        }
        // Швидкість появи труб залежить від рівня
        let baseDelay = 3200;
        if (this.difficulty === "medium") baseDelay = 2400;
        if (this.difficulty === "hard") baseDelay = 1700;
        
        let delay = Math.random() * (baseDelay * 1.3 - baseDelay * 0.7) + baseDelay * 0.7;
        this.spawnTimer = setTimeout(() => this.spawnPipe(), delay);
    }
    // Перезапуск гри
    reset() {
        clearTimeout(this.spawnTimer);
        this.init();
        this.ui.hideGameOver();
        this.spawnPipe();
        requestAnimationFrame((t) => this.loop(t));
    }
    // Оновлення всієї логіки
    update(deltaTime) {
        if (this.isPaused || this.isGameOver) return;

        let timeStep = Math.min(deltaTime, 100) / 16.6;
        this.fps = Math.round(1000 / deltaTime);

        // Множник швидкості для труб
        let speedMultiplier = 1;
        if (this.difficulty === "medium") speedMultiplier = 1.4;
        if (this.difficulty === "hard") speedMultiplier = 1.9;

        this.cat.update(timeStep, this.canvas.height);

        for (let i = this.pipes.length - 1; i >= 0; i--) {
            let p = this.pipes[i];
            p.update(timeStep * speedMultiplier);

            // Нарахування очок
            if (!p.passed && p.x + p.width < this.cat.x) {
                this.score++;
                p.passed = true;
            }
            // Перевірка зіткнення
            if (this.cat.x + this.cat.width > p.x && this.cat.x < p.x + p.width && 
               (this.cat.y < p.top || this.cat.y + this.cat.height > p.top + p.gap)) {
                this.isGameOver = true;
                this.updateHighScore(); 
                this.ui.showGameOver(this.score, this.highScore);
            }
            // Видаляємо труби, що вилетіли за екран
            if (p.x + p.width < 0) this.pipes.splice(i, 1);
        }
    }
    // Малювання всього на екрані
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.cat.draw(this.ctx);
        this.pipes.forEach(p => p.draw(this.ctx, this.canvas.height));
        
        this.ui.render(this.score, this.fps, this.isPaused, this.isGameOver, this.playerName, this.highScore, this.difficulty);
    }
    // Головний ігровий цикл
    loop(timestamp) {
        if (this.isGameOver) return;

        let deltaTime = timestamp - (this.lastTime || timestamp);
        this.lastTime = timestamp;

        this.update(deltaTime);
        this.draw();

        requestAnimationFrame((t) => this.loop(t));
    }
}
const myGame = new Game();
// Кнопка старту в меню
function startWithProfile() {
    let nameInput = document.getElementById("playerName").value;
    let diffInput = document.querySelector('input[name="difficulty"]:checked').value;
    myGame.setProfile(nameInput, diffInput);
}
// Кнопка "спробувати ще раз"
function resetGame() {
    myGame.reset();
}