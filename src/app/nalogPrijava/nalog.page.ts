import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nalog',
  templateUrl: './nalog.page.html',
  styleUrls: ['./nalog.page.scss'],
})
export class NalogPage implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  redirectedToRegister(){
    this.router.navigate(['/registracija']);
  }

}
