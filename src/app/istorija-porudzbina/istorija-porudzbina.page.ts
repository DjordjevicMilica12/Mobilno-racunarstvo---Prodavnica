import { Component, OnInit } from '@angular/core';
import { PorudzbinaServiceService } from '../porudzbina-service.service';

@Component({
  selector: 'app-istorija-porudzbina',
  templateUrl: './istorija-porudzbina.page.html',
  styleUrls: ['./istorija-porudzbina.page.scss'],
})
export class IstorijaPorudzbinaPage implements OnInit {

  public porudzbine: any[] = [];
  public groupedPorudzbine: { [status: string]: any[] } = {};
  public selectedPorudzbina: any = null;

  constructor(private porudzbinaService: PorudzbinaServiceService) { }

  ngOnInit() {
    // const userId = localStorage.getItem('ngx-webstorage|localid');

    // if (userId) {
    //   this.porudzbinaService.dohvatiPorudzbineZaKorisnika(userId).subscribe(porudzbine => {
    //     this.porudzbine = porudzbine;
    //     this.groupPorudzbineByStatus();
    //   });
    // }

  
    this.osveziPorudzbine();
  }

  osveziPorudzbine() {
    const userId = localStorage.getItem('ngx-webstorage|localid');

    if (userId) {
      this.porudzbinaService.dohvatiPorudzbineZaKorisnika(userId).subscribe(porudzbine => {
        this.porudzbine = porudzbine;
        this.groupPorudzbineByStatus();
      });
    }
  }


  groupPorudzbineByStatus() {
    this.groupedPorudzbine = this.porudzbine.reduce((groups, porudzbina) => {
      const status = porudzbina.status;
      if (!groups[status]) {
        groups[status] = [];
      }
      groups[status].push(porudzbina);
      return groups;
    }, {});
  }

  prikaziDetalje(porudzbina: any) {
    this.selectedPorudzbina = porudzbina;
  }

  dismissModal() {
    this.selectedPorudzbina = null;
  }


  formatDatum(datum: string): string {
    const date = new Date(datum);
    const formattedDate = date.toLocaleDateString('sr-RS', { day: '2-digit', month: '2-digit', year: 'numeric' });
    const formattedTime = date.toLocaleTimeString('sr-RS', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    return `${formattedDate} ${formattedTime}`;
  }

  // Add this method to your IstorijaPorudzbinaPage component
formatImageUrl(url: string): string {
  // If the url is already a valid string, this might be redundant, but adding it for the sake of clarity.
  return url.replace(/['"]+/g, '');
}

obrisiPorudzbinu(porudzbina: any, event: Event) {
  event.stopPropagation(); // Da se spreči prikazivanje detalja pri klik na ikonicu
  if (confirm('Da li ste sigurni da želite da obrišete ovu porudžbinu?')) {
    this.porudzbinaService.otkaziPorudzbinu(porudzbina.id).subscribe(() => {
      this.osveziPorudzbine();
    });
  }
}


}
