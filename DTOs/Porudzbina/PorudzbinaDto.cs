namespace Prodavnica_backend.DTOs.Porudzbina
{
    public class PorudzbinaDto
    {
        public string? porudzbinaID { get; set;  }
        public string kupacID { get; set; } = string.Empty;
        public List<StavkaPorudzbineDto> stavke { get; set; } = new List<StavkaPorudzbineDto>();
        public string status { get; set; } = "u obradi";
        public DateTime datum { get; set; } = DateTime.UtcNow;
    }
}
