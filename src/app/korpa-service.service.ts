import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KorpaServiceService {
  private korpa: any[]=[];
  private korpaSubject=new BehaviorSubject<any[]>([]);
  
  constructor() { }

  dodajProizvod(proizvod:any){
    this.korpa.push(proizvod);
    this.korpaSubject.next(this.korpa);
  }

  getKorpa(){
    return this.korpaSubject.asObservable();
  }



}
