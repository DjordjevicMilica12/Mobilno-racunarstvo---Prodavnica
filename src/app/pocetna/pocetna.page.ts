import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProizvodServisService } from '../proizvod-servis.service';
import { Proizvod } from '../modeli/proizvod.model';

@Component({
  selector: 'app-pocetna',
  templateUrl: './pocetna.page.html',
  styleUrls: ['./pocetna.page.scss'],
})
export class PocetnaPage implements OnInit{
  public products: Proizvod[] = [];


  currentSlide = 0;
  
  ngOnInit() {
    this.productService.getProducts().subscribe((data: Proizvod[]) => {
      this.products = data;
    });
  }


  constructor(private router: Router,  private productService: ProizvodServisService) 
  {
    setInterval(() => {
      this.nextSlide();
    }, 2000);
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.products.length;
  }

  RedirectToMuskaKolekcija() {
    this.router.navigate(['/folder/Muskarci']);
  }

  RedirectToZenskaKolekcija(){
    this.router.navigate(['/folder/Zene']);
  }


  redirectedToKorpa(){
    this.router.navigate(['/korpa']);
  }
  redirectedToNalog(){
    this.router.navigate(['/nalog']);
  }



}
