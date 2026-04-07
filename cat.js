// Персонаж
class Cat {
    constructor() {
        this.x = 55;
        this.y = 150;
        this.width = 45;
        this.height = 45;
        this.velocity = 0;
        this.gravity = 0.3;
        this.jump = -6;
    }
    update(timeStep) {
        this.velocity += this.gravity * timeStep;
        this.y += this.velocity * timeStep;
        // Стеля і підлога, межі
        if (this.y < 0) this.y = 0;
        if (this.y + this.height > canvas.height) {
            this.y = canvas.height - this.height;
            this.velocity = 0;
        }
    }
    // DRAW для котика
    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        
        // Вушка
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

        // Тіло
        ctx.fillStyle = "black";
        ctx.beginPath();
        ctx.roundRect(0, 0, this.width, this.height, 12); 
        ctx.fill(); 

        // Очі
        ctx.beginPath(); ctx.arc(0, 35, 5, 0, 7); ctx.fill();
        ctx.fillStyle = "yellow";
        ctx.beginPath(); ctx.arc(15, 18, 7, 0, 7); ctx.arc(30, 18, 7, 0, 7); ctx.fill();
        ctx.fillStyle = "black";
        ctx.beginPath(); ctx.arc(15, 18, 3.5, 0, 7); ctx.arc(30, 18, 3.5, 0, 7); ctx.fill();

        // Ніс та вусики
        ctx.fillStyle = "#FFC0CB"; 
        ctx.beginPath(); ctx.arc(22.5, 28, 2.5, 0, 7); ctx.fill();
        ctx.strokeStyle = "white"; 
        ctx.lineWidth = 0.8; 
        ctx.beginPath();
        ctx.moveTo(19, 30); ctx.lineTo(12, 30); ctx.moveTo(18, 33); ctx.lineTo(10, 34); 
        ctx.moveTo(26, 30); ctx.lineTo(33, 30); ctx.moveTo(27, 33); ctx.lineTo(35, 34);
        ctx.stroke();

        ctx.restore();
    }
}