using Microsoft.AspNetCore.Mvc;
using Restapi.Models;
using Restapi.Repositories;

namespace Restapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LevelsController : ControllerBase
    {
        private readonly ILevelRepository _repository;

        public LevelsController(ILevelRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Level>>> GetLevels()
        {
            return Ok(await _repository.GetAllAsync());
        }
    }
}