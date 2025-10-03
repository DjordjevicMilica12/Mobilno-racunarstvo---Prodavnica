using Google.Rpc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Prodavnica_backend.DTOs.Korisnik;
using Prodavnica_backend.Models;
using Prodavnica_backend.Services;

namespace Prodavnica_backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class KorisnikController : ControllerBase
    {
        private readonly KorisnikService korisnikService;
        private readonly AuthService authService;
        public KorisnikController(KorisnikService korisnikService, AuthService authService)
        {
            this.authService = authService; 
            this.korisnikService = korisnikService;
        }
        [Authorize]
        [HttpPatch]
        public async Task<IActionResult> izmeniPodatke([FromBody] KorisikDto podaci)
        {
            var kupacId = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
            if (kupacId == null) { 
            return Unauthorized(new { message="Neispravan token"});
            }

            podaci.KupacID = kupacId;
            var korisnik= await korisnikService.izmeniPodatke(podaci);

            if (korisnik == null)
            {
                return BadRequest(new { message = "greska prilikom kreiranja porudzbine" });
            }

            return Ok(korisnik);

        }




    }
}
