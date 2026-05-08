using Microsoft.AspNetCore.Mvc;
using Restapi.Models;
using Restapi.Repositories;

namespace Restapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ScoresController : ControllerBase
    {
        private readonly IScoreRepository _repository;

        public ScoresController(IScoreRepository repository)
        {
            _repository = repository;
        }

        // Отримати Топ-10 рекордів
        [HttpGet("top")]
        public async Task<ActionResult<IEnumerable<Score>>> GetTopScores()
        {
            var scores = await _repository.GetTopScoresAsync(10);
            return Ok(scores);
        }

        // Зберегти новий результат гри
        [HttpPost]
        public async Task<ActionResult<Score>> AddScore(Score score)
        {
            await _repository.AddAsync(score);
            await _repository.SaveAsync();
            return Ok(score);
        }
    }
}