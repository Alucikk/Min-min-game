using Microsoft.EntityFrameworkCore;
using Restapi.Models; 
using Restapi.Repositories;

var builder = WebApplication.CreateBuilder(args);

// ПІДКЛЮЧАЄМО SQLITE
builder.Services.AddDbContext<GameDbContext>(options =>
    options.UseSqlite("Data Source=MinMin.db")); 

builder.Services.AddControllers();
// Реєстрація репозиторіїв
builder.Services.AddScoped<IPlayerRepository, PlayerRepository>();
builder.Services.AddScoped<IScoreRepository, ScoreRepository>();
builder.Services.AddScoped<ILevelRepository, LevelRepository>();
var app = builder.Build();

// ЦЕЙ БЛОК АВТОМАТИЧНО СТВОРИТЬ ТАБЛИЦІ ПРИ ЗАПУСКУ
//using (var scope = app.Services.CreateScope())
//{
//    var db = scope.ServiceProvider.GetRequiredService<GameDbContext>();
//    db.Database.EnsureCreated();
//}

app.MapControllers();
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    var context = services.GetRequiredService<GameDbContext>();

    // Перевіряємо, чи в таблиці "Рівні" порожньо
    if (!context.Levels.Any())
    {
        context.Levels.AddRange(
            new Level { Name = "Ліс котиків", Difficulty = "Легко" },
            new Level { Name = "Занедбаний замок", Difficulty = "Середньо" },
            new Level { Name = "Космічна станція", Difficulty = "Важко" }
        );
        context.SaveChanges();
    }
}
app.Run();