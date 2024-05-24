import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
// import { AuthService } from './auth.service';
// import { Databse, set,ref ,update} from '@angular/fire/database';
import { map, switchMap, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PorudzbinaServiceService {

  constructor(private http: HttpClient) { }
  private trenutnaPorudzbinaID: string | null = null;

 

  kreirajPorudzbinu(porudzbina: any, stavke: any[]): Observable<any> {
    return this.http.post<any>(`${environment.firebaseConfig.databaseURL}/porudzbine.json`, porudzbina).pipe(
      switchMap(response => {
        const porudzbinaID = response.name;
        const stavkeRequests = stavke.map((stavka, index) => {
          // stavka.redniBroj = index + 1;
          return this.http.put(`${environment.firebaseConfig.databaseURL}/porudzbine/${porudzbinaID}/stavke/${index}.json`, stavka);
        });
        return forkJoin(stavkeRequests).pipe(map(() => porudzbinaID));
      })
    );
  }

  PostaviPorudzbinaID(porudzbinaID: string) {
    this.trenutnaPorudzbinaID = porudzbinaID;
  }

  dajTrenutniIDPorudzbine(): string | null {
    return this.trenutnaPorudzbinaID;
  }

  obrisiPorudzbinu(porudzbinaId: string): Observable<any> {
    return this.http.delete<any>(`${environment.firebaseConfig.databaseURL}/porudzbine/${porudzbinaId}.json`);
  }


  izmeniPodatkeKorisnika(newData: any) {
    const localId = localStorage.getItem('ngx-webstorage|localid');
    const cleanedUserLocalId = localId ? localId.replace(/"/g, '') : null;
    const token = localStorage.getItem('ngx-webstorage|token');
    console.log(localId);
    console.log(token);
    if (!token) {
      console.log("nije prijavljen");
    }
    console.log(newData);

    return this.http
      .patch(`${environment.firebaseConfig.databaseURL}/users/${cleanedUserLocalId}.json?token=${token}`, newData)
      .pipe(
        tap(() => {
          console.log('Podaci korisnika su uspešno ažurirani.');
          // console.log(`${environment.firebaseConfig.databaseURL}/users/${localId}.json?token=${token}`, newData);
        })
      );
  }


  dohvatiPorudzbineZaKorisnika(localId: string): Observable<any[]> {
    return this.http.get<{ [key: string]: any }>(`${environment.firebaseConfig.databaseURL}/porudzbine.json`).pipe(
      map(porudzbine => {
        const korisnikovePorudzbine = [];
        const cleanedUserLocalId = localId ? localId.replace(/"/g, '') : null; 
        for (const key in porudzbine) {
          if (porudzbine[key]?.kupacID === cleanedUserLocalId) {
            korisnikovePorudzbine.push({ ...porudzbine[key], id: key });
          }
        }
        console.log('korisnikove porudzbine:', korisnikovePorudzbine); 
        return korisnikovePorudzbine.length > 0 ? korisnikovePorudzbine : [];
      })
    );
  }



} 


