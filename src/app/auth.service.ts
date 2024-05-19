import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { from } from 'rxjs';
import { switchMap } from 'rxjs/operators';

interface Korisnik {
  ime: string;
  prezime: string;
  adresa: string;
  email: string;
  lozinka: string;
  brojTelefona: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {}

  register(korisnik: Korisnik) {
    return from(this.afAuth.createUserWithEmailAndPassword(korisnik.email, korisnik.lozinka)).pipe(
      switchMap(({ user }) => {
        if (user) {
          return this.firestore.collection('users').doc(user.uid).set({
            ime: korisnik.ime,
            prezime: korisnik.prezime,
            adresa: korisnik.adresa,
            email: korisnik.email,
            brojTelefona: korisnik.brojTelefona
          });
        } else {
          throw new Error('Nema korisničkog ID-a');
        }
      })
    );
  }

  // login(email: string, lozinka: string) {
  //   return from(this.afAuth.signInWithEmailAndPassword(email, lozinka));
  // }

  // logout() {
  //   return from(this.afAuth.signOut());
  // }
}
