import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from 'ngx-webstorage';

interface PrijavaPodaci {
  email: string;
  password: string;
  returnSecureToken: boolean;
}

interface Odgovor {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  localId: string;
  expiresIn: string;
}

@Component({
  selector: 'app-nalog',
  templateUrl: './nalog.page.html',
  styleUrls: ['./nalog.page.scss'],
})
export class NalogPage implements OnInit {
  prijavaPodaci: PrijavaPodaci = {
    email: '',
    password: '',
    returnSecureToken: true
  };

  constructor(private router: Router, private http: HttpClient, private localStorage: LocalStorageService) { }

  ngOnInit() {}

  ulogujSe() {
    this.prijaviKorisnika(this.prijavaPodaci).subscribe((odgovor) => {
      console.log('Uspešno ste se ulogovali!', odgovor);
      this.localStorage.store('token', odgovor.idToken);
      this.localStorage.store('user', { email: odgovor.email, localId: odgovor.localId });
      this.router.navigate(['/Pocetna']);
    }, (error) => {
      console.error('Greška prilikom prijave:', error);
    });
  }
  
  private prijaviKorisnika(podaci: PrijavaPodaci) {
    return this.http.post<Odgovor>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseConfig.firebaseAPIKey}`, podaci);
  }

  redirectedToRegister() {
    this.router.navigate(['/registracija']);
  }
}
