using Restapi.Models;

namespace Restapi.Repositories
{
    public interface IScoreRepository
    {
        Task<IEnumerable<Score>> GetTopScoresAsync(int count);
        Task AddAsync(Score score);
        Task SaveAsync();
    }
}