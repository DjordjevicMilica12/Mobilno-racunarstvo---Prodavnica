import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { KorpaServiceService } from '../korpa-service.service';

@Component({
  selector: 'app-proizvod',
  templateUrl: './proizvod.page.html',
  styleUrls: ['./proizvod.page.scss'],
})
export class ProizvodPage implements OnInit {
  
  public productName: string | null = null;
  public product: any;
  clicked: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private router: Router,
    private korpaServis: KorpaServiceService,
  ) {}

  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      this.product = navigation.extras.state['product'];
    } else {
      this.product = null; // Ili neka druga default vrednost
    }
  }


  goBack() {
    this.location.back();
  }

  dodajUKorpu()
  {
    this.korpaServis.dodajProizvod(this.product);
    this.clicked = true;
    setTimeout(() => {
      this.clicked = false;
    }, 300);
  }


}
