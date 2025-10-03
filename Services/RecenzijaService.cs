using Prodavnica_backend.DTOs.Recenzija;

namespace Prodavnica_backend.Services
{
    public class RecenzijaService
    {
        private readonly HttpClient http;
        private readonly string firebase;

        public RecenzijaService (HttpClient http, IConfiguration firebase)
        {
           this.http = http;
            this.firebase = firebase["Firebase:name"];
        }

        internal async Task<RecenzijaDto> napraviRecenziju(RecenzijaDto podaci)
        {
            var url =$"{firebase}recenzije.json";

            var response= await http.PostAsJsonAsync(url, podaci);
            if (!response.IsSuccessStatusCode) return null;

            return podaci;
        }

        internal async Task<List<RecenzijaDto>> vratiRecenziju(string id)
        {
            var url = $"{firebase}recenzije.json";

            var recenzijeSve = await http.GetFromJsonAsync<Dictionary<string, RecenzijaDto>>(url);

         
            var recenzije = recenzijeSve
              .Where(r => r.Value.proizvodID == id)
              .Select(r =>
              {
                  r.Value.recenzijaID = r.Key;
                  return r.Value;
              }).ToList();

            return recenzije;
        }
    }
}
