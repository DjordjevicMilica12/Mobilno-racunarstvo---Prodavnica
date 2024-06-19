import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  implements OnInit {
  constructor(private router: Router) {}
  
  ngOnInit() {}

  redirectedToKorpa(){
    this.router.navigate(['/korpa']);
  }
  redirectedToNalog(){
      this.router.navigate(['/prijava']);
  }
  redirectedToPocetna(){
    this.router.navigate(['/Pocetna']);
  }



}
