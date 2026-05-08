using Microsoft.EntityFrameworkCore;
using Restapi.Models;

namespace Restapi.Repositories
{
    public class PlayerRepository : IPlayerRepository
    {
        private readonly GameDbContext _context;

        public PlayerRepository(GameDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Player>> GetAllAsync() => await _context.Players.ToListAsync();

        public async Task<Player?> GetByIdAsync(int id) => await _context.Players.FindAsync(id);

        public async Task AddAsync(Player player) => await _context.Players.AddAsync(player);

        public async Task SaveAsync() => await _context.SaveChangesAsync();
    }
}