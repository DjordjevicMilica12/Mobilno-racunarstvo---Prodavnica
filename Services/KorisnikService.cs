
using Prodavnica_backend.DTOs.Korisnik;

namespace Prodavnica_backend.Services
{
    public class KorisnikService
    {
        private readonly HttpClient http;
        private readonly string firebase;

        public KorisnikService(HttpClient http, IConfiguration firebase)
        {
            this.http = http;
            this.firebase = firebase["Firebase:name"];
        }

        internal async Task<KorisikDto> izmeniPodatke(KorisikDto podaci)
        {
            var url = $"{firebase}users/{podaci.KupacID}.json";

            var izmenjeniPodaci = new Dictionary<string, object>();

            if (!string.IsNullOrEmpty(podaci.Ime))
                izmenjeniPodaci["ime"] = podaci.Ime;
            if (!string.IsNullOrEmpty(podaci.Prezime))
                izmenjeniPodaci["prezime"] = podaci.Prezime;
            if (!string.IsNullOrEmpty(podaci.Email))
                izmenjeniPodaci["email"] = podaci.Email;
            if (!string.IsNullOrEmpty(podaci.Adresa))
                izmenjeniPodaci["adresa"] = podaci.Adresa;
            if (podaci.BrojTelefona != 0)
                izmenjeniPodaci["brojTelefona"] = podaci.BrojTelefona;

            var response = await http.PatchAsJsonAsync(url, izmenjeniPodaci);

            if (!response.IsSuccessStatusCode) return null;

            var izmenjeniKorisnik = await http.GetFromJsonAsync<KorisikDto>(url);

            return izmenjeniKorisnik;
        }
    }
}
