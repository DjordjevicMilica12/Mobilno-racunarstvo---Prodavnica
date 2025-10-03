using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using Prodavnica_backend.DTOs.Korisnik;
using Prodavnica_backend.DTOs.Porudzbina;
using Prodavnica_backend.Services;

namespace Prodavnica_backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PorudzbinaController: ControllerBase
    {

        private readonly PorudzbinaService porudzbinaService;
        private readonly AuthService authService;

        public PorudzbinaController(PorudzbinaService porudzbinaService, AuthService authService)
        {
            this.porudzbinaService = porudzbinaService;
            this.authService = authService; 
        }
        [Authorize]
        [HttpPost]
        public async Task<IActionResult> addPorudzbina([FromBody] PorudzbinaDto podaci)
        {
            
            var kupacId = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
            if (kupacId == null) return Unauthorized(new { message = "Nije dobar token" });

            podaci.kupacID = kupacId;

            var porudzbina= await porudzbinaService.kreirajPorudzbinu(podaci);
            if (porudzbina == null)
            {
                return BadRequest(new { message = "greska prilikom kreiranja porudzbine" });
            }

            return Ok(porudzbina);

        }

        [Authorize]
        [HttpGet]
        public async Task<IActionResult> getPorudzbineByIdKorisnika()      ///vrati se
        {
            var kupacId = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;

            if (kupacId == null) return Unauthorized(new { message = "nije dobar korisnik" });

            var porudzbine = await porudzbinaService.getPorudzbineByIdKorisnika(kupacId);

            return Ok(porudzbine);

        }

        [Authorize]
        [HttpPatch("{porudzbinaId}/otkazi")]
        public async Task<IActionResult> otkaziPorudzbinu([FromRoute] string porudzbinaId)
        {
            var kupacId = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;

            if (kupacId==null) return Unauthorized(new { message = "nije dobar korisnik" });

            var uspeh = await porudzbinaService.otkaziPorudzbinu(porudzbinaId, kupacId);

            if (!uspeh)
                return BadRequest(new { message = "Neuspešno otkazivanje porudžbine" });

            return Ok(new { message = "Porudžbina uspešno otkazana" });
        }



    }
}
