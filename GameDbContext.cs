using Microsoft.EntityFrameworkCore;

namespace Restapi.Models;

public class GameDbContext : DbContext
{
    public GameDbContext(DbContextOptions<GameDbContext> options) : base(options) { }

    public DbSet<Player> Players { get; set; }
    public DbSet<Level> Levels { get; set; } // Додано
    public DbSet<Score> Scores { get; set; } // Додано
}