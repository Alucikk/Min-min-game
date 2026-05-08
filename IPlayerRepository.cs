using Restapi.Models;

namespace Restapi.Repositories
{
    public interface IPlayerRepository
    {
        Task<IEnumerable<Player>> GetAllAsync();
        Task<Player?> GetByIdAsync(int id);
        Task AddAsync(Player player);
        Task SaveAsync();
    }
}