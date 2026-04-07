// Перешкоди
class Pipe {
    constructor() {
        this.width = 55;
        this.gap = 200;
        this.x = canvas.width;
        this.top = Math.random() * (canvas.height - this.gap - 100) + 50;
        this.speed = 1.7;
        this.passed = false;
    }
    update(timeStep) {
        this.x -= this.speed * timeStep;
    }
    // DRAW для перешкод
    draw() {
        ctx.fillStyle = "purple"; 
        ctx.fillRect(this.x, 0, this.width, this.top); 
        ctx.fillRect(this.x, this.top + this.gap, this.width, canvas.height); 
    }
}