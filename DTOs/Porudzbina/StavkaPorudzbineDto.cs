namespace Prodavnica_backend.DTOs.Porudzbina
{
    public class StavkaPorudzbineDto
    {
            public string proizvodID { get; set; } = string.Empty;
            public string nazivProizvoda { get; set; } = string.Empty;
            public decimal cena { get; set; }
            public string imageUrl { get; set; } = string.Empty;

    }
}
