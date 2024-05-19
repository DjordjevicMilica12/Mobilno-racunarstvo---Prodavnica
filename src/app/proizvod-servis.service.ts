import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from '../environments/environment';

interface ProductData {
  name: string;
  price: string;
  description: string;
  imageUrl: string;
  pol:string;
}

@Injectable({
  providedIn: 'root'
})
export class ProizvodServisService {

  constructor(private http: HttpClient) {}

  getProducts(): Observable<any[]> {
    return this.http.get<{ [key: string]: ProductData }>(`${environment.firebaseConfig.databaseURL}/proizvodi.json`)
      .pipe(
        map((productsData: any) => {
          const products: any[] = [];
          for (const key in productsData) {
            products.push({
              id: key,
              name: productsData[key].name,
              price: productsData[key].price,
              description: productsData[key].description,
              imageUrl: productsData[key].imageUrl,
              pol:productsData[key].pol,
            });
          }
          return products;
        })
      );
  }
}
