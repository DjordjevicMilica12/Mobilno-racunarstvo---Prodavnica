import { Component, OnInit } from '@angular/core';
import { KorpaServiceService } from '../korpa-service.service';
import { Router } from '@angular/router';
import { PorudzbinaServiceService } from '../porudzbina-service.service';

@Component({
  selector: 'app-korpa',
  templateUrl: './korpa.page.html',
  styleUrls: ['./korpa.page.scss'],
})
export class KorpaPage implements OnInit {
  public korpa: any[] = [];
  public ukupanIznos: number = 0;
  public prom: string="ddd";

  public ime: string="";
  public prezime: string="";
  public adresa: string="";
  public brojTelefona: string="";
  public email: string="";
  public lozinka: string="";

  constructor(
    private korpaServis:KorpaServiceService,
    private router: Router,
    private porudzbinaServis: PorudzbinaServiceService,
    ) { }

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

  goToCheckout() {
    if (this.isUserLoggedIn()) {
      this.isModalOpen=true;
    } else {
      this.router.navigate(['/prijava']); 
    }
  }

  setOpen(isOpen: boolean) { 
    this.isModalOpen = isOpen;
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
  
  SacuvajPromene(){
    const userLocalId = localStorage.getItem('ngx-webstorage|localid');
    const userJSON = localStorage.getItem('ngx-webstorage|user');
    if (userLocalId && userJSON) {
      const userObj = JSON.parse(userJSON);
      const newData = {
        ime: this.ime,
        prezime: this.prezime,
        adresa: this.adresa,
        brojTelefona: this.brojTelefona,
        email:userObj.email,
        lozinka:userObj.lozinka,
      }

      this.porudzbinaServis.izmeniPodatkeKorisnika(newData).subscribe(() => {
        console.log('Podaci korisnika su ažurirani.');
      });
    }
  }



}
