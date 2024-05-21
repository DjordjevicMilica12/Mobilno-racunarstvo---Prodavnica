// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { HttpClient } from '@angular/common/http';
// import { environment } from 'src/environments/environment';
// import { LocalStorageService } from 'ngx-webstorage';

// interface PrijavaPodaci {
//   email: string;
//   password: string;
//   returnSecureToken: boolean;
// }

// interface Odgovor {
//   kind: string;
//   idToken: string;
//   email: string;
//   refreshToken: string;
//   localId: string;
//   expiresIn: string;
// }

// @Component({
//   selector: 'app-nalog',
//   templateUrl: './nalog.page.html',
//   styleUrls: ['./nalog.page.scss'],
// })
// export class NalogPage implements OnInit {
//   prijavaPodaci: PrijavaPodaci = {
//     email: '',
//     password: '',
//     returnSecureToken: true
//   };

//   constructor(private router: Router, private http: HttpClient, private localStorage: LocalStorageService) { }

//   ngOnInit() {}

//   ulogujSe() {
//     this.prijaviKorisnika(this.prijavaPodaci).subscribe((odgovor) => {
//       console.log('Uspešno ste se ulogovali!', odgovor);
//       this.localStorage.store('token', odgovor.idToken);
//       this.localStorage.store('user', { email: odgovor.email, localId: odgovor.localId });
//       this.router.navigate(['/Pocetna']);
//     }, (error) => {
//       console.error('Greška prilikom prijave:', error);
//     });
//   }
  
//   private prijaviKorisnika(podaci: PrijavaPodaci) {
//     return this.http.post<Odgovor>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseConfig.firebaseAPIKey}`, podaci);
//   }

//   redirectedToRegister() {
//     this.router.navigate(['/registracija']);
//   }
// }

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

interface KorisnikPodaci {
  email: string;
  lozinka:string;
  adresa:string;
  ime:string;
  prezime:string;
  brojTelefona:string;
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
      this.preuzmiDodatnePodatkeKorisnika(odgovor.localId).subscribe((korisnikPodaci) => {
        console.log('Uspešno preuzeti dodatni podaci korisnika:', korisnikPodaci);
        this.localStorage.store('user', korisnikPodaci);
        this.localStorage.store('localId', odgovor.localId);
        this.router.navigate(['/Pocetna']);
      }, (error) => {
        console.error('Greška prilikom preuzimanja dodatnih podataka korisnika:', error);
      });
    }, (error) => {
      console.error('Greška prilikom prijave:', error);
    });
  }
  
  private prijaviKorisnika(podaci: PrijavaPodaci) {
    return this.http.post<Odgovor>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseConfig.firebaseAPIKey}`, podaci);
  }

  private preuzmiDodatnePodatkeKorisnika(localId: string) {
    return this.http.get<KorisnikPodaci>(`https://prodavnica-mob-rac-default-rtdb.europe-west1.firebasedatabase.app/users/${localId}.json`);
  }

  redirectedToRegister() {
    this.router.navigate(['/registracija']);
  }
}
