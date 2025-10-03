import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Proizvod } from './modeli/proizvod.model';
import { environment} from 'src/environments/environment';
import { Recenzija } from './modeli/recenzija.model';

@Injectable({
  providedIn: 'root'
})

export class ProizvodServisService {
  private url= environment.apiUrl;
  sacuvajRecenziju(formData: Recenzija, token: string) {
   return this.http.post(`${this.url}/recenzija`, formData, {
    headers:{Authorization: `Bearer ${token}`}
   });
  }

  constructor(private http: HttpClient) {}



  getProducts(): Observable<Proizvod[]> {
    return this.http.get<Proizvod[]>(`${this.url}/proizvod`); //http://localhost:5069/api/proizvod
  }

  getRecenzijeZaProizvod(proizvodID: string): Observable<Recenzija[]> {
  return this.http.get<Recenzija[]>(`${this.url}/recenzija/${proizvodID}`);
}



}
