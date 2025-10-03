using Microsoft.AspNetCore.Mvc;
using Prodavnica_backend.DTOs.Recenzija;
using Prodavnica_backend.Services;

namespace Prodavnica_backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RecenzijaController: ControllerBase
    {
        private RecenzijaService recenzijaService;
        private AuthService authService;
        public RecenzijaController(RecenzijaService recenzijaService, AuthService authService)
        {
            this.authService = authService;
            this.recenzijaService = recenzijaService;
        }

        [HttpPost]
        public async Task<IActionResult> postaviRecenziju([FromBody] RecenzijaDto podaci)
        {
            var kupacId = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;

            if(kupacId==null) Unauthorized ( new {message="nije dobar korisnik"});

            var recenzija = await recenzijaService.napraviRecenziju(podaci);
            if (recenzija == null)
            {
                return BadRequest(new { message = "Nije uspesno cuvanje recenzije" });
            }

            return Ok(recenzija);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> vratiRecenziju(string id)
        {
            var recenzija = await recenzijaService.vratiRecenziju(id);
            if (recenzija == null || recenzija.Count == 0)
            {
                return NotFound(new { message = "Nema recenzija za ovaj proizvod" });
            }

            return Ok(recenzija);
        }

    }
}
