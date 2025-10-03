namespace Prodavnica_backend.Models
{
    public class StavkaPorudzbine
    {
        public string? Id { get; set; }
        public string PorudzbinaID { get; set; }
        public int RedniBroj { get; set; }
        public string ProizvodID { get; set; }
    }
}
