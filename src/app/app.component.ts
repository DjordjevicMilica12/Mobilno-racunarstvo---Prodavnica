import { Component } from '@angular/core';
import { Router } from '@angular/router';

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
    //{ title: 'Bileten', url: '/folder/Bileten', icon:newspaper' },
  ];


}
