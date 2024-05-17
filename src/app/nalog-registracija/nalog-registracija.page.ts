import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nalog-registracija',
  templateUrl: './nalog-registracija.page.html',
  styleUrls: ['./nalog-registracija.page.scss'],
})
export class NalogRegistracijaPage implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  redirectedToPrijava(){
    this.router.navigate(['/prijava']);
  }
}
