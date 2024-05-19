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
    { title: 'Odjava', url: '/odjava', icon:'log-out' },
  ];

  constructor(private router: Router, private localStorage: LocalStorageService) {}

  odjava() {
    this.localStorage.clear('token');
    this.localStorage.clear('user');
    this.localStorage.clear('userDetails');
    this.router.navigate(['/prijava']);
  }
}
