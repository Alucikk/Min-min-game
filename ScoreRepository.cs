using Microsoft.EntityFrameworkCore;
using Restapi.Models;

namespace Restapi.Repositories
{
    public class ScoreRepository : IScoreRepository
    {
        private readonly GameDbContext _context;

        public ScoreRepository(GameDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Score>> GetTopScoresAsync(int count)
        {
            return await _context.Scores
                .Include(s => s.Player) // Завантажуємо дані гравця разом з рекордом
                .OrderByDescending(s => s.Value)
                .Take(count)
                .ToListAsync();
        }

        public async Task AddAsync(Score score) => await _context.Scores.AddAsync(score);

        public async Task SaveAsync() => await _context.SaveChangesAsync();
    }
}