namespace Prodavnica_backend.DTOs.Korpa
{
    public class KorpaDto
    {
        public List<StavkeKorpeDto> Items { get; set; } = new List<StavkeKorpeDto>();
        public decimal UkupnaCena { get; set; }
        public int UkupnoStavki { get; set; }
    }
}
