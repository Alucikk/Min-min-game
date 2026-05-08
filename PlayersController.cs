using Microsoft.AspNetCore.Mvc;
using Restapi.Models;
using Restapi.Repositories;

namespace Restapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlayersController : ControllerBase
    {
        private readonly IPlayerRepository _repository;

        public PlayersController(IPlayerRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Player>>> GetPlayers()
        {
            var players = await _repository.GetAllAsync();
            return Ok(players);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Player>> GetPlayer(int id)
        {
            var player = await _repository.GetByIdAsync(id);
            if (player == null) return NotFound();
            return Ok(player);
        }

        [HttpPost]
        public async Task<ActionResult<Player>> CreatePlayer(Player player)
        {
            await _repository.AddAsync(player);
            await _repository.SaveAsync();
            return CreatedAtAction(nameof(GetPlayer), new { id = player.Id }, player);
        }
    }
}