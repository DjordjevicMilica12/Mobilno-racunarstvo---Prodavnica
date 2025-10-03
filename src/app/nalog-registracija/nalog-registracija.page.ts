import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Korisnik } from '../modeli/korisnik.model';
import { environment } from 'src/environments/environment';

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
    kupacID: '',
    ime: '',
    prezime: '',
    adresa: '',
    email: '',
    lozinka: '',
    brojTelefona: null
  };

  constructor(private router: Router, private http: HttpClient) { }

  private url=environment.apiUrl;

  registrujSe() {
    if (this.validirajPodatke()) {
      this.register(this.korisnik).subscribe((odgovor) => {

        console.log('Uspešno ste se registrovali!', odgovor);
        
        this.router.navigate(['/prijava']);
      }, (error) => {
        console.error('Greška prilikom registracije:', error);
        alert("Niste lepo popunili polja!");
      });
    }
  }

  private register(korisnik: Korisnik) {
    return this.http.post<Odgovor>(`${this.url}/auth/register`,korisnik);
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
