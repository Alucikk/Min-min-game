class Pipe {
    constructor(canvasWidth, canvasHeight) {
        this.width = 55; // Ширина труби
        this.gap = 200; // Прохід для котика
        this.x = canvasWidth; // Починає рух з правого краю
        // Випадкова висота верхньої частини
        this.top = Math.random() * (canvasHeight - this.gap - 100) + 50;
        
        this.speed = 1.7; // Швидкість руху
        this.passed = false; // Чи пролетів котик повз цю трубу
    }

    /**
     * Оновлення позиції труби
     */
    update(timeStep) {
        // Рух труби вліво з урахуванням часу та складності
        this.x -= this.speed * timeStep;
    }

    /**
     * Малювання перешкод
     */
    draw(ctx, canvasHeight) {
        ctx.fillStyle = "purple"; 
        // Малюємо верхню трубу
        ctx.fillRect(this.x, 0, this.width, this.top); 
        // Малюємо нижню трубу (до самого низу екрана)
        ctx.fillRect(this.x, this.top + this.gap, this.width, canvasHeight - (this.top + this.gap)); 
    }
}