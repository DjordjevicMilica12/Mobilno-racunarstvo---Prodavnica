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

    if (this.korpa.length === 0) {
      window.alert('Morate dodati proizvode u korpu pre nego što nastavite sa porudžbinom.');
      return;
    }

    if (this.isUserLoggedIn()) {
      this.isModalOpen = true;

      const userId = localStorage.getItem('ngx-webstorage|localid');
      if (userId) {
        const userObjId = JSON.parse(userId);

        const porudzbina = {
          //datum: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
          kupacID: userObjId,
          datum: new Date(),
        };

        const stavke = this.korpa.map(proizvod => ({
          proizvodID: proizvod.id
        }));

        this.porudzbinaServis.kreirajPorudzbinu(porudzbina, stavke).subscribe((porudzbinaID) => {
          console.log('Porudžbina kreirana uspešno. ID:', porudzbinaID);
          this.porudzbinaServis.PostaviPorudzbinaID(porudzbinaID);
          // this.router.navigate(['/Pocetna']);
        });
      }

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

  obrisiPorudzbinu(){
    const porudzbinaID = this.porudzbinaServis.dajTrenutniIDPorudzbine();
    if (porudzbinaID) {
      this.porudzbinaServis.obrisiPorudzbinu(porudzbinaID).subscribe(() => {
        alert('Porudžbina je uspešno obrisana.');
        this.korpaServis.isprazniKorpu();
        this.ukupanIznos = 0;
        this.isModalOpen = false;
      });
    } else {
      alert('Nema aktivne porudžbine za brisanje.');
    }
}
  
}
