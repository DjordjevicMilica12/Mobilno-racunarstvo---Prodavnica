import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { KorpaServiceService } from '../korpa-service.service';
import { ProizvodServisService } from '../proizvod-servis.service';
import { Recenzija } from '../modeli/recenzija.model';
import { Proizvod } from '../modeli/proizvod.model';

@Component({
  selector: 'app-proizvod',
  templateUrl: './proizvod.page.html',
  styleUrls: ['./proizvod.page.scss'],
})
export class ProizvodPage implements OnInit {
  
  public productName: string | null = null;
  public product: Proizvod= {} as Proizvod;
  clicked: boolean = false;
  formatiranOpis: string = '';
  public recenzije: Recenzija[] = [];
  
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private router: Router,
    private korpaServis: KorpaServiceService,
    private proizvodServis:ProizvodServisService,
  ) {}

  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    //u folderu smo poslali state - proudct! objekat ceo saljemo
    if (navigation?.extras?.state) {
      this.product = navigation.extras.state['product'];
      this.ucitajRecenzije(this.product.id);
    }
  }

    
 ucitajRecenzije(proizvodID: string) {
  this.proizvodServis.getRecenzijeZaProizvod(proizvodID).subscribe({
    next: (data: Recenzija[]) => {
      this.recenzije = data;
    },
    error: (err) => {
      console.warn('Nema recenzija za ovaj proizvod');
      this.recenzije = []; // prikaži prazan spisak
    }
  });
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
