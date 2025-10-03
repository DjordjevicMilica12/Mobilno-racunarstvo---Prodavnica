namespace Prodavnica_backend.DTOs.Korisnik
{
    public class KorisnikRegisterDto
    {
        public string Email { get; set; } = string.Empty;
        public string Ime { get; set; } = string.Empty;
        public string Prezime { get; set; } = string.Empty;
        public string Adresa { get; set; } = string.Empty;
        public long BrojTelefona { get; set; }
        public string? Token { get; set; }
        public string? Lozinka { get; set; }
    
    }
}
