import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
// import { AuthService } from './auth.service';
// import { Databse, set,ref ,update} from '@angular/fire/database';
import { map, switchMap, tap } from 'rxjs/operators';
import { Observable, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PorudzbinaServiceService {

  constructor(private http: HttpClient) { }



  // kreirajPorudzbinu(porudzbina: any): Observable<string> {
  //   return this.http.post<any>(`${environment.firebaseConfig.databaseURL}/porudzbine.json`, porudzbina).pipe(
  //     map(response => response.name) // Firebase vraća ID kao 'name'
  //   );
  // }

  // dodajStavkePorudzbine(porudzbinaID: string, stavke: any[]): Observable<void[]> {
  //   const stavkeRequests = stavke.map((stavka, index) => {
  //     stavka.redniBroj = index + 1;
  //     return this.http.post<void>(`${environment.firebaseConfig.databaseURL}/stavkePorudzbine/${porudzbinaID}.json`, stavka);
  //   });
  //   return forkJoin(stavkeRequests);
  // }

  kreirajPorudzbinu(porudzbina: any, stavke: any[]): Observable<any> {
    return this.http.post<any>(`${environment.firebaseConfig.databaseURL}/porudzbine.json`, porudzbina).pipe(
      switchMap(response => {
        const porudzbinaID = response.name; // Firebase vraća ID kao 'name'
        const stavkeRequests = stavke.map((stavka, index) => {
          // stavka.redniBroj = index + 1;
          return this.http.put(`${environment.firebaseConfig.databaseURL}/porudzbine/${porudzbinaID}/stavke/${index}.json`, stavka);
        });
        return forkJoin(stavkeRequests).pipe(map(() => porudzbinaID));
      })
    );
  }



  obrisiPorudzbinu(id: string) {
    
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




} 


