import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
// import { AuthService } from './auth.service';
// import { Databse, set,ref ,update} from '@angular/fire/database';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PorudzbinaServiceService {

  constructor(private http: HttpClient) { }



  kreirajPorudzbinu() {
    
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


