import { Component, OnInit } from '@angular/core';
import { KorpaServiceService } from '../korpa-service.service';

@Component({
  selector: 'app-korpa',
  templateUrl: './korpa.page.html',
  styleUrls: ['./korpa.page.scss'],
})
export class KorpaPage implements OnInit {
  public korpa: any[] = [];
  public ukupanIznos: number = 0;
  public prom: string="ddd";

  constructor(private korpaServis:KorpaServiceService) { }

  ngOnInit() {
    this.korpaServis.getKorpa().subscribe(korpa => {
      this.korpa = korpa;
      this.izracunajUkupanIznos();
    });
  }

  private izracunajUkupanIznos() {
    this.ukupanIznos = this.korpa.reduce((total, proizvod) => total + parseFloat(proizvod.price), 0);
  }
  
  isModalOpen = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  Poruci(){
    
  }

}
