import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from 'ngx-webstorage';
import { Korisnik } from '../modeli/korisnik.model';
import { environment } from 'src/environments/environment';


interface PrijavaPodaci {
  email: string;
  lozinka: string;
}

@Component({
  selector: 'app-nalog',
  templateUrl: './nalog.page.html',
  styleUrls: ['./nalog.page.scss'],
})
export class NalogPage implements OnInit {

  prijavaPodaci: PrijavaPodaci = {
    email: '',
    lozinka: ''
  };

  constructor(
    private router: Router,
    private http: HttpClient,
    private localStorage: LocalStorageService
  ) {}

  ngOnInit() {}

  private url= environment.apiUrl;

  ulogujSe() {
    this.prijaviKorisnika(this.prijavaPodaci).subscribe({
      next: (korisnik: any) => {
        console.log('Uspešno ste se ulogovali!', korisnik);

       
        this.localStorage.store('user', korisnik);

        this.router.navigate(['/Pocetna']);
      },
      error: (err) => {
        console.error('Greška prilikom prijave:', err);
      }
    });
  }

  private prijaviKorisnika(podaci: PrijavaPodaci) {
    return this.http.post<Korisnik>(`${this.url}/auth/login`,podaci);
  }

  redirectedToRegister() {
    this.router.navigate(['/registracija']);
  }
}
