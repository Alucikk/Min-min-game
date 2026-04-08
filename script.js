const canvas = document.getElementById("GameMin");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth - 20;
canvas.height = window.innerHeight - 20;

// Гра = поле + об'єкти
class Game {
    constructor() {
        // Ігрове поле
        this.canvas = canvas;
        this.ctx = ctx;
        
        // об'єкти всередині гри
        this.cat = new Cat();
        this.pipes = [];
        
        // Стан гри
        this.score = 0;
        this.isGameOver = false;
        this.isPaused = false; // Додано стан паузи
        this.fps = 0;

        //Час
        this.lastTime = 0;
        this.deltaTime = 0;
        this.timeStep = 0;
    }
    spawnPipe() {
        // Труби не з'являються, якщо гра закінчена або на паузі
        if (!this.isGameOver && !this.isPaused) {
            this.pipes.push(new Pipe());
        }
        let randomDelay = Math.random() * (4125 - 2560) + 2560;
        setTimeout(() => this.spawnPipe(), randomDelay);
    }
    reset() {
        this.cat = new Cat();
        this.pipes = [];
        this.score = 0;
        this.isGameOver = false;
        this.isPaused = false; // Скидаємо паузу при рестарті
        this.lastTime = 0;
        this.deltaTime = 0;
        this.timeStep = 0;
        document.getElementById("gameOverScreen").classList.add("hidden");
        this.spawnPipe();
        requestAnimationFrame((t) => this.loop(t));
    }
    // DRAW для ігрового поля
    drawUI() {
        this.ctx.fillStyle = "darkblue";
        this.ctx.font = "bold 28px Times New Roman";
        this.ctx.fillText("Рахунок: " + this.score, 30, 60);
        
        let fpsText = "FPS: " + (this.fps || 0);
        this.ctx.fillText(fpsText, this.canvas.width - this.ctx.measureText(fpsText).width - 30, 60);

        // Візуалізація паузи
        if (this.isPaused && !this.isGameOver) {
            this.ctx.fillStyle = "rgba(0, 0, 0, 0.3)"; // Напівпрозорий фон
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.fillStyle = "black";
            this.ctx.font = "bold 55px Times New Roman";
            this.ctx.textAlign = "center";
            this.ctx.fillText("ПАУЗА", this.canvas.width / 2, this.canvas.height / 2);
            this.ctx.textAlign = "start"; // Повертаємо вирівнювання
        }
    }

    loop(timestamp) {
        if (this.isGameOver) return;

        //Розрахунок часу
        this.deltaTime = timestamp - (this.lastTime || timestamp);
        this.lastTime = timestamp;

        // Оновлюємо логіку тільки якщо немає паузи
        if (!this.isPaused) {
            this.timeStep = Math.min(this.deltaTime, 100) / 16.6;
            this.fps = Math.round(1000 / this.deltaTime);

            // Очищення поля
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

            // Оновлення котика
            this.cat.update(this.timeStep);

            // Оновлення перешкод
            for (let i = this.pipes.length - 1; i >= 0; i--) {
                let p = this.pipes[i];
                p.update(this.timeStep);

                // Перевірка рахунку
                if (!p.passed && p.x + p.width < this.cat.x) {
                    this.score++;
                    p.passed = true;
                }
                // Перевірка зіткнення
                if (this.cat.x + this.cat.width > p.x && this.cat.x < p.x + p.width && 
                   (this.cat.y < p.top || this.cat.y + this.cat.height > p.top + p.gap)) {
                    this.end();
                }
                // Видалення труб
                if (p.x + p.width < 0) this.pipes.splice(i, 1);
            }
        }

        // Малювання відбувається завжди (навіть на паузі)
        if (this.isPaused) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
        
        this.cat.draw();
        this.pipes.forEach(p => p.draw());
        this.drawUI();

        requestAnimationFrame((t) => this.loop(t));
    }
    togglePause() {
        if (!this.isGameOver) {
            this.isPaused = !this.isPaused;
        }
    }
    end() {
        this.isGameOver = true;
        document.getElementById("finalScore").innerText = this.score;
        document.getElementById("gameOverScreen").classList.remove("hidden");
    }
}
// Запуск
const myGame = new Game();

window.addEventListener("keydown", (e) => {
    if (e.code === "Space") {
        e.preventDefault();
        // Стрибаємо тільки якщо гра не на паузі
        if (!myGame.isGameOver && !myGame.isPaused) myGame.cat.velocity = myGame.cat.jump;
    }

    // Обробка клавіші Escape для паузи
    if (e.code === "Escape") {
        myGame.togglePause();
    }
});
function resetGame() {
    myGame.reset();
}
// Перший запуск
myGame.reset();