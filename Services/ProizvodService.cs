
using Prodavnica_backend.DTOs.Proizvod;

namespace Prodavnica_backend.Services
{
    public class ProizvodService
    {
        private readonly HttpClient http;
        private readonly string firebase;


       public ProizvodService (HttpClient http, IConfiguration firebase)
        {
            this.http = http;
            this.firebase = firebase["Firebase:name"];
        }

        internal async Task<List<ProizvodDto>> getProizvode()
        {
            var url = $"{firebase}proizvodi.json";
            var proizvodiDict= await http.GetFromJsonAsync<Dictionary<string, ProizvodDto>> (url);

            if (proizvodiDict == null) return null;

            var proizvodi = proizvodiDict.Select(p =>
            {
                p.Value.Id = p.Key;
                return p.Value;
            }).ToList();

            return proizvodi;

        }
    }
}
