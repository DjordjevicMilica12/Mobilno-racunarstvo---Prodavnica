namespace Prodavnica_backend.Models
{
    public class Korisnik
    {
       public string? KupacID { get; set; }
       public string Ime { get; set; }
       public string Prezime { get; set; }
       public string Adresa { get; set; }
       public string Email { get; set; }
       public string Lozinka { get; set; }
       public long BrojTelefona { get; set; }
    }
}
