import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

interface Korisnik {
  ime: string;
  prezime: string;
  adresa: string;
  email: string;
  lozinka: string;
  brojTelefona: string;
}

interface Odgovor {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  localId: string;
  expiresIn: string;
  registered?: boolean;
}

@Component({
  selector: 'app-nalog-registracija',
  templateUrl: './nalog-registracija.page.html',
  styleUrls: ['./nalog-registracija.page.scss'],
})
export class NalogRegistracijaPage {

  korisnik: Korisnik = {
    ime: '',
    prezime: '',
    adresa: '',
    email: '',
    lozinka: '',
    brojTelefona: ''
  };

  constructor(private router: Router, private http: HttpClient) { }

  registrujSe() {
    if (this.validirajPodatke()) {
      this.register(this.korisnik).subscribe((odgovor) => {
        console.log('Uspešno ste se registrovali!', odgovor);
        this.sacuvajPodatkeUDatabase(odgovor.localId, this.korisnik);
        this.router.navigate(['/prijava']);
      }, (error) => {
        console.error('Greška prilikom registracije:', error);
        alert("Niste lepo popunili polja!");
      });
    }
  }

  private register(korisnik: Korisnik) {
    return this.http.post<Odgovor>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseConfig.firebaseAPIKey}`,
      { email: korisnik.email, password: korisnik.lozinka, returnSecureToken: true });
  }

  private sacuvajPodatkeUDatabase(userId: string, korisnik: Korisnik) {

    this.http.put(`https://prodavnica-mob-rac-default-rtdb.europe-west1.firebasedatabase.app/users/${userId}.json`, korisnik)
    .subscribe(
      () => {
        console.log('Podaci su uspešno sačuvani u Realtime Database-u.');
      },
      (error) => {
        console.error('Došlo je do greške prilikom čuvanja podataka u Realtime Database-u:', error);
      }
    );
  
  }

  validirajPodatke(): boolean {
    if (!this.korisnik.ime || !this.korisnik.prezime || !this.korisnik.adresa || !this.korisnik.email || !this.korisnik.lozinka || !this.korisnik.brojTelefona) {
      console.error('Molimo popunite sva polja!');
      return false;
    }
    return true;
  }

  preusmeriNaPrijavu() {
    this.router.navigate(['/prijava']);
  }
}
