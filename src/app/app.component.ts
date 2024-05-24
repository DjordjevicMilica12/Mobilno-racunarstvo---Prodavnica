import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Početna', url: '/Pocetna', icon: 'home'},
    { title: 'Muška kolekcija', url: '/folder/Muskarci', icon: 'man' },
    { title: 'Ženska kolekcija', url: '/folder/Zene', icon: 'woman' },
    { title: 'Istorija porudzbina', url: '/istorija-porudzbina', icon:'book'},  
    { title: 'Odjava', url: '/odjava', icon:'log-out' },
  ];

  constructor(private router: Router, private localStorage: LocalStorageService) {}
  public ime: string="";
  public prezime: string="";
  public adresa: string="";
  public brojTelefona: string="";



  odjava() {
    this.localStorage.clear('token');
    this.localStorage.clear('user');
    this.localStorage.clear('userDetails');
    this.localStorage.clear('localId');
    this.router.navigate(['/prijava']);
  }

  navigate() {
    if (!this.isUserLoggedIn()) {
      this.router.navigate(['/prijava']);
    } else {
      this.router.navigate(['/istorija-porudzbina']);
    }
  }

  isUserLoggedIn(): boolean {
    const userJSON = localStorage.getItem('ngx-webstorage|user');
    if (userJSON) {
      const userObj = JSON.parse(userJSON);
      const email = userObj.email;
      const lozinka = userObj.lozinka;

      this.ime = userObj.ime;
      this.prezime = userObj.prezime;
      this.adresa = userObj.adresa;
      this.brojTelefona = userObj.brojTelefona;

      return !!email && !!lozinka;
    }
    return false;
  }


}
