namespace Prodavnica_backend.DTOs.Recenzija
{
    public class RecenzijaDto
    {
        public string? recenzijaID { get; set; }
        public string kupacID { get; set; }

        public string proizvodID { get; set; }
        public string tekst { get; set; }
        public string? slika { get; set; }
        public string? datum { get; set; }
    }
}
