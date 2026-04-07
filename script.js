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
        this.fps = 0;

        //Час
        this.lastTime = 0;
        this.deltaTime = 0;
        this.timeStep = 0;
    }
    spawnPipe() {
        if (!this.isGameOver) {
            this.pipes.push(new Pipe());
            let randomDelay = Math.random() * (4125 - 2560) + 2560;
            setTimeout(() => this.spawnPipe(), randomDelay);
        }
    }
    reset() {
        this.cat = new Cat();
        this.pipes = [];
        this.score = 0;
        this.isGameOver = false;
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
    }
    loop(timestamp) {
        if (this.isGameOver) return;
        //Розрахунок часу
        this.deltaTime = timestamp - (this.lastTime || timestamp);
        this.lastTime = timestamp;
        // Розрахунок кроку, адаптованого під 60 FPS
        this.timeStep = Math.min(this.deltaTime, 100) / 16.6;
        this.fps = Math.round(1000 / this.deltaTime);

        // Очищення поля
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        // Оновлення та малювання котика за допомогою внутрішнього timeStep
        this.cat.update(this.timeStep);
        this.cat.draw();
        // Оновлення та малювання перешкод
        for (let i = this.pipes.length - 1; i >= 0; i--) {
            let p = this.pipes[i];
            p.update(this.timeStep);
            p.draw();
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
            // Видалення труб, що вилетіли за поле
            if (p.x + p.width < 0) this.pipes.splice(i, 1);
        }
        // Малювання елементів поля
        this.drawUI();

        requestAnimationFrame((t) => this.loop(t));
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
        if (!myGame.isGameOver) myGame.cat.velocity = myGame.cat.jump;
    }
});
function resetGame() {
    myGame.reset();
}
// Перший запуск
myGame.reset();