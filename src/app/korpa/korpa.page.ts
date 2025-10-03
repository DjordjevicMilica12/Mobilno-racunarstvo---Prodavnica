import { Component, OnInit } from '@angular/core';
import { KorpaServiceService } from '../korpa-service.service';
import { Router } from '@angular/router';
import { PorudzbinaServiceService } from '../porudzbina-service.service';
import { Korisnik } from '../modeli/korisnik.model';
import { StavkaPorudzbine } from '../modeli/stavkaPorudzbine.model';
import { Porudzbina } from '../modeli/porudzbina.model';


@Component({
  selector: 'app-korpa',
  templateUrl: './korpa.page.html',
  styleUrls: ['./korpa.page.scss'],
})

export class KorpaPage implements OnInit {
  public korpa: any[] = [];
  public ukupanIznos: number = 0;
  public korisnik:Korisnik ={} as Korisnik;
  isModalOpen = false;

  constructor(
    private korpaServis:KorpaServiceService,
    private router: Router,
    private porudzbinaServis: PorudzbinaServiceService,
  ) { }
  
  ngOnInit() {
    const prijavljeniKorisnik = localStorage.getItem('ngx-webstorage|user');
    if(prijavljeniKorisnik){
      this.korisnik=JSON.parse(prijavljeniKorisnik);
    }
  
    this.korpaServis.getKorpa().subscribe(korpa => {
      this.korpa = korpa;
      this.izracunajUkupanIznos();
    });  
  }

  private izracunajUkupanIznos() {
    this.ukupanIznos = this.korpa.reduce((total, proizvod) => total + parseFloat(proizvod.price), 0);
  }
  
 

  goToCheckout() {

    if (this.korpa.length === 0) {
      window.alert('Morate dodati proizvode u korpu pre nego što nastavite sa porudžbinom.');
      return;
    }

    if (!this.korisnik) {
      this.router.navigate(['/prijava']);
      return;
    }  

    this.isModalOpen = true;

    const stavke : StavkaPorudzbine[] = this.korpa.map(proizvod => ({
        proizvodID: proizvod.id,
        nazivProizvoda: proizvod.name,
        imageUrl: proizvod.imageUrl,
        cena: proizvod.price,
    }));

    const porudzbina: Porudzbina = {
      kupacID: this.korisnik.kupacID,
      datum: new Date(),
      status: "u obradi",
      stavke: stavke
    };

    if(this.korisnik && this.korisnik.token){

      this.porudzbinaServis.kreirajPorudzbinu(porudzbina, this.korisnik.token).subscribe((porudzbinaID) => {
        console.log('Porudžbina kreirana uspešno. ID:', porudzbinaID);
        //  this.porudzbinaServis.PostaviPorudzbinaID(porudzbinaID);
      });
    }else{
      this.router.navigate(['/prijava']);
      return;
    }
      
      
      this.korpaServis.isprazniKorpu();
      this.ukupanIznos = 0;
   
  }


  setOpen(isOpen: boolean) { 
    this.isModalOpen = isOpen;
  }


  
  SacuvajPromene(){
    if(!this.korisnik ) return;

      const newData: Partial<Korisnik> = {
        kupacID:this.korisnik.kupacID,
        ime: this.korisnik.ime,
        prezime: this.korisnik.prezime,
        adresa: this.korisnik.adresa,
        brojTelefona: this.korisnik.brojTelefona
      }

    if(this.korisnik && this.korisnik.token){
      this.porudzbinaServis.izmeniPodatkeKorisnika(newData, this.korisnik.token).subscribe(() => {
        console.log('Podaci korisnika su ažurirani.');
        localStorage.setItem('ngx-webstorage|user', JSON.stringify({ ...this.korisnik }));
      });
    }else{
        this.router.navigate(['/prijava']);
    }
    }

  NastaviSaPorudzbinom() {

    alert('Uspešno je realizovana porudžbina!');

    this.korpaServis.isprazniKorpu();
    this.ukupanIznos = 0;
    this.isModalOpen = false;
  }

  ObrisiSve(){
    this.korpaServis.isprazniKorpu();
    this.ukupanIznos = 0;
  }
  
}
