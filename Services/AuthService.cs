    using Google.Cloud.Firestore;
    using Google.Cloud.Firestore.V1;
    using Prodavnica_backend.DTOs.Korisnik;

    namespace Prodavnica_backend.Services
    {
        public class AuthService
        {
            private readonly HttpClient http;
            private readonly string firebase;

            public AuthService(HttpClient http, IConfiguration firebase)
            {
                this.http = http;
                this.firebase = firebase["Firebase:name"];
            }


            public async Task<KorisikDto> getKorisnikByEmail (KorisnikLoginDto podaci)
            {
                var url = $"{firebase}users.json";
                var korisnici = await http.GetFromJsonAsync<Dictionary<string, KorisikDto>>(url);

                if (korisnici == null) return null;

                var user = korisnici
                    .FirstOrDefault(x => x.Value.Email == podaci.Email && x.Value.Lozinka == podaci.Lozinka);

                if (string.IsNullOrEmpty(user.Key)) return null;

                user.Value.KupacID = user.Key;
                Console.WriteLine($"Korisnik pronađen: {System.Text.Json.JsonSerializer.Serialize(user.Value)}");

                return user.Value;
            }

            internal async Task AzurirajToken(string kupacID, string token)
            {
                var url = $"{firebase}users/{kupacID}.json";

                var podaci = new {Token = token};

                var response = await http.PatchAsJsonAsync(url, podaci);

                if (!response.IsSuccessStatusCode)
                    throw new Exception($"Neuspešno ažuriranje tokena za korisnika {kupacID}");
            }

            internal async Task<bool> proveriToken(string kupacID, string token)
            {
                var url = $"{firebase}users/{kupacID}.json";
                var korisnik = await http.GetFromJsonAsync<KorisikDto>(url);

                if(korisnik == null) return false;

                if(korisnik.Token == token) return true;

                return false;
            
            }

            internal async Task<KorisnikRegisterDto> sacuvajNovogKorisnika(KorisnikRegisterDto podaci)
            {
            
                var url =$"{firebase}users.json";

                var response = await http.PostAsJsonAsync(url, podaci);

                if(!response.IsSuccessStatusCode) return null;

                return podaci;


            }
        }
    }
