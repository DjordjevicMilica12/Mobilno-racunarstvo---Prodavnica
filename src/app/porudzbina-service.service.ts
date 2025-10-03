import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, forkJoin } from 'rxjs';
import { Porudzbina } from './modeli/porudzbina.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PorudzbinaServiceService {

  constructor(private http: HttpClient) { }
  private trenutnaPorudzbinaID: string | null = null;
  private url= environment.apiUrl;
 

  kreirajPorudzbinu(porudzbina: Porudzbina, token:string): Observable<any> {
    return this.http.post<any>(`${this.url}/porudzbina`, porudzbina, {
      headers: { Authorization: `Bearer ${token}` },
      responseType: 'text' as 'json'
      }
    );
  }

 /* PostaviPorudzbinaID(porudzbinaID: string) {
    this.trenutnaPorudzbinaID = porudzbinaID;
  }

  dajTrenutniIDPorudzbine(): string | null {
    return this.trenutnaPorudzbinaID;
  }*/

  izmeniPodatkeKorisnika(newData: any, token:string) {
    return this.http.patch(`${this.url}/korisnik`, newData, {
      headers: { Authorization: `Bearer ${token}`}
    });
  }


  dohvatiPorudzbineZaKorisnika(token:string): Observable<any[]> {
      return this.http.get<Porudzbina[]>(`${this.url}/porudzbina`,{ //${this.url}/porudzbina?idKorisnika=${idKorisnika}
        headers:{ Authorization: `Bearer ${token}`}
      });
    }

  otkaziPorudzbinu(porudzbinaId: string, token: string): Observable<void> {
   return this.http.patch<void>(`${this.url}/porudzbina/${porudzbinaId}/otkazi`, {}, {
    headers: {Authorization: `Bearer ${token}`}
   });
  }
} 


