using Microsoft.EntityFrameworkCore;
using Restapi.Models;

namespace Restapi.Repositories
{
    public interface ILevelRepository
    {
        Task<IEnumerable<Level>> GetAllAsync();
    }

    public class LevelRepository : ILevelRepository
    {
        private readonly GameDbContext _context;
        public LevelRepository(GameDbContext context) => _context = context;

        public async Task<IEnumerable<Level>> GetAllAsync() => await _context.Levels.ToListAsync();
    }
}