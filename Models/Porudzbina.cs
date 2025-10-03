namespace Prodavnica_backend.Models
{
    public class Porudzbina
    {
        public string? Id { get; set; }
        public DateTime Datum { get; set; } = DateTime.UtcNow;
        public string Adresa { get; set; }
        public string KupacID { get; set; }
    }
}
