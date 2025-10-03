using Microsoft.AspNetCore.Mvc;
using Prodavnica_backend.DTOs.Proizvod;
using Prodavnica_backend.Models;
using Prodavnica_backend.Services;

namespace Prodavnica_backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProizvodController: ControllerBase
    {
        private readonly ProizvodService proizvod;

        public ProizvodController(ProizvodService proizvodService)
        {
            proizvod = proizvodService;
        }

        [HttpGet] 
        public async Task<IActionResult> getProducts()
        {
            var proizvodi = await proizvod.getProizvode();
            return Ok(proizvodi);

        }

    }
}
