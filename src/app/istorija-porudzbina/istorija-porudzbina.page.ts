import { Component, OnInit } from '@angular/core';
import { PorudzbinaServiceService } from '../porudzbina-service.service';
import { Korisnik } from '../modeli/korisnik.model';
import { Porudzbina } from '../modeli/porudzbina.model';
import { Recenzija } from '../modeli/recenzija.model';
import { ProizvodServisService } from '../proizvod-servis.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-istorija-porudzbina',
  templateUrl: './istorija-porudzbina.page.html',
  styleUrls: ['./istorija-porudzbina.page.scss'],
})
export class IstorijaPorudzbinaPage implements OnInit {

  public porudzbine: Porudzbina[] = [];
  public groupedPorudzbine: { [status: string]: Porudzbina[] } = {};
  public selectedPorudzbina: Porudzbina | null = null;
  public korisnik: Korisnik = {} as Korisnik;

  public recenzijeUI:Recenzija[]=[];
  // { [proizvodID: string]: Recenzija & { showForm?: boolean; file?: File } } = {};

  constructor(
    private porudzbinaService: PorudzbinaServiceService,
    private proizvodService: ProizvodServisService,
  ) { }


  ngOnInit() {
    const prijavljeniKorisnik = localStorage.getItem('ngx-webstorage|user');
    if(prijavljeniKorisnik){
      this.korisnik=JSON.parse(prijavljeniKorisnik);
      this.osveziPorudzbine();
    }
  }

  osveziPorudzbine() {
    if (this.korisnik && this.korisnik.token) {
      this.porudzbinaService.dohvatiPorudzbineZaKorisnika(this.korisnik.token).subscribe(porudzbine => {
        this.porudzbine = porudzbine;
        this.groupPorudzbineByStatus();
      });
    }
  }


  groupPorudzbineByStatus() {
    this.groupedPorudzbine = this.porudzbine.reduce((groups: { [status: string]: Porudzbina[] }, porudzbina: Porudzbina) => {
      const status = porudzbina.status;
      if (!groups[status]) {
        groups[status] = [];
      }
      groups[status].push(porudzbina);
      return groups;
    }, {});
  }

  prikaziDetalje(porudzbina: Porudzbina) {
    console.log('ovo je porudzbina', porudzbina);
    this.selectedPorudzbina = porudzbina;
  }

  dismissModal() {
    this.selectedPorudzbina = null;
  }


  formatDatum(datum: string | Date): string {
    const date = new Date(datum);
    const formattedDate = date.toLocaleDateString('sr-RS', { day: '2-digit', month: '2-digit', year: 'numeric' });
    const formattedTime = date.toLocaleTimeString('sr-RS', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    return `${formattedDate} ${formattedTime}`;
  }

formatImageUrl(url: string): string {
  return url.replace(/['"]+/g, '');
}

obrisiPorudzbinu(porudzbina: any, event: Event) {
  if(this.korisnik && this.korisnik.token){
    event.stopPropagation();
    if (confirm('Da li ste sigurni da želite da otkažete ovu porudžbinu?')) {
      console.log('ovo je prudzbina', porudzbina);
      this.porudzbinaService.otkaziPorudzbinu(porudzbina.porudzbinaID, this.korisnik.token).subscribe(() => {
        this.osveziPorudzbine();
      });
    }
  }
}


openRecenzijaForm(proizvodID: string): boolean {
  const rec = this.recenzijeUI.find(r => r.proizvodID === proizvodID);
  if (rec) {
    return (rec as any).showForm === true;
  } else {
    return false;
  }

}

getRecenzija(proizvodID: string): Recenzija {
  let rec = this.recenzijeUI.find(r => r.proizvodID === proizvodID);
  if (!rec) {
    rec = {
      kupacID: this.korisnik.kupacID,
      proizvodID,
      tekst: '',
      slika: undefined,
      datum: new Date()
    };
    this.recenzijeUI.push(rec);
  }
  return rec;
}


ostaviRecenziju(stavka: any) {
  let rec = this.recenzijeUI.find(r=> r.proizvodID===stavka.proizvodID);
    if (!rec) {
      rec = {
      kupacID:this.korisnik.kupacID,
      proizvodID:stavka.proizvodID,
      tekst:'',
      slika:undefined,
      datum: new Date()
      };
      this.recenzijeUI.push(rec);
    }
    (rec as any).showForm = !(rec as any).showForm;
  }

  cancelRecenzija(stavka: any) {
  let rec = this.recenzijeUI.find(r=> r.proizvodID===stavka.proizvodID);

    if (rec) {
      (rec as any).showForm=false;
      rec.tekst = '';
      rec.slika=undefined;
    }
  }

async saveRecenzija(stavka: any) {
  const r = this.recenzijeUI.find(r2 => r2.proizvodID === stavka.proizvodID);
  if (!r) return;

  const podaci = {
    kupacID: r.kupacID,
    proizvodID: r.proizvodID,
    tekst: r.tekst,
    slika: r.slika,
    datum: new Date().toISOString()
  };

  if (this.korisnik && this.korisnik.token) {
    this.proizvodService.sacuvajRecenziju(podaci, this.korisnik.token).subscribe(() => {
      alert('Recenzija uspešno sačuvana!');
      this.cancelRecenzija(stavka);
    });
  }
}

  async otvoriKameru(stavka: any) {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera,
    });

   const recenzija = this.recenzijeUI.find(r => r.proizvodID === stavka.proizvodID);
  if (recenzija && image?.dataUrl) {
    recenzija.slika = image.dataUrl; 
  }
}





  fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
}


/*
  dataURLtoFile(dataUrl: string, filename: string): File {
  const arr = dataUrl.split(',');

  const match = arr[0].match(/:(.*?);/);
  if (!match) {
    throw new Error('Nevalidan Data URL');
  }

  const mime = match[1]; // MIME tip
  const bstr = atob(arr[1]); // dekodiraj Base64 deo
  const n = bstr.length;
  const u8arr = new Uint8Array(n);

  for (let i = 0; i < n; i++) {
    u8arr[i] = bstr.charCodeAt(i);
  }

  return new File([u8arr], filename, { type: mime });
}
*/



}