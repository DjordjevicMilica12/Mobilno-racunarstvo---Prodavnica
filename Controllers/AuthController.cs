using Microsoft.AspNetCore.Mvc;
using Prodavnica_backend.DTOs.Korisnik;
using Prodavnica_backend.Services;
using Microsoft.Extensions.Configuration;
using System.Text;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;


namespace Prodavnica_backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AuthService authService;
        private readonly IConfiguration configuration;

        public AuthController(AuthService authService, IConfiguration configuration)
        {
            this.authService = authService;
            this.configuration = configuration;
        }

        [HttpPost("login")] 
        public async Task<IActionResult> Login([FromBody] KorisnikLoginDto loginDto)
        {
            var korisnik = await authService.getKorisnikByEmail(loginDto);
            if (korisnik == null)
            {
                return Unauthorized(new
                {
                    message = "Neispravan email ili lozinka"
                });
            }
            var key = Encoding.ASCII.GetBytes(configuration["Jwt:Key"]);

            var token = new JwtSecurityToken(
                claims: new[] {
                     new Claim(ClaimTypes.NameIdentifier, korisnik.KupacID)
                    },
                    expires: DateTime.UtcNow.AddDays(1),
                    signingCredentials: new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256)
                );

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);

           // await authService.AzurirajToken(korisnik.KupacID, korisnik.Token);

            korisnik.Token = jwt;

            return Ok(korisnik);
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] KorisnikRegisterDto podaci)
        {
            var korisnik = await authService.sacuvajNovogKorisnika(podaci);

            if (korisnik == null)
            {
                return BadRequest(new
                {
                    message = "Došlo je do greške prilikom registracije korisnika"
                });
            }

            return Ok(korisnik);
        }




    }
}