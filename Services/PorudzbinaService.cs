using Prodavnica_backend.DTOs.Porudzbina;
using System.Security.AccessControl;

namespace Prodavnica_backend.Services
{
    public class PorudzbinaService
    {
        private readonly HttpClient http;
        private readonly string firebase;

        public PorudzbinaService (HttpClient http, IConfiguration firebase)
        {
            this.http = http;
            this.firebase = firebase["Firebase:name"];
        }

        internal async Task<List<PorudzbinaDto>> getPorudzbineByIdKorisnika(string idKorisnika)
        {
            var url = $"{firebase}porudzbine.json";
            
            var porudzbineDist= await http.GetFromJsonAsync<Dictionary<string, PorudzbinaDto>>(url);
           
            var korisnikovePorudzbine = porudzbineDist
                .Where(p=> p.Value.kupacID == idKorisnika)
                .Select(p =>
                {
                    p.Value.porudzbinaID = p.Key;
                    return p.Value;
                }).ToList();

            return korisnikovePorudzbine;
        }

        internal async Task<bool> otkaziPorudzbinu(string porudzbinaId, string kupacId)
        {
            var url = $"{firebase}porudzbine/{porudzbinaId}.json";
            var porudzbina = await http.GetFromJsonAsync<PorudzbinaDto>(url);
            if (porudzbina == null || porudzbina.kupacID != kupacId)
            {
                return false;
            }


            var izmenjeniPodaci = new Dictionary<string, object>
            {
                ["status"] = "otkazane"
            };

            var response = await http.PatchAsJsonAsync(url, izmenjeniPodaci);

            return response.IsSuccessStatusCode;
        }


        internal async Task<string> kreirajPorudzbinu(PorudzbinaDto podaci)
        {

            PorudzbinaDto porudzbinaDto = new PorudzbinaDto()
            {
              kupacID = podaci.kupacID,
              status = podaci.status,
              datum=podaci.datum
            };

            var response = await http.PostAsJsonAsync($"{firebase}porudzbine.json", porudzbinaDto);
            if (!response.IsSuccessStatusCode) return null;

            var result= await response.Content.ReadFromJsonAsync<Dictionary<string, string>>();

            if (result == null || !result.ContainsKey("name")) return null;

            string porudzbinaId = result["name"];   

            for(int i=0; i<podaci.stavke.Count; i++)
            {
                await http.PutAsJsonAsync($"{firebase}porudzbine/{porudzbinaId}/stavke/{i}.json", podaci.stavke[i]);
            }

            return porudzbinaId;

        }
    }
}
