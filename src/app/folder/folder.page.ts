import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string = '';
  public products: { name: string; description: string; imageUrl: string; }[] = [];
  public filteredProducts: { name: string; description: string; imageUrl: string; }[] = [];
  constructor(private activatedRoute: ActivatedRoute, private appComponent: AppComponent, private router: Router) {}

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id') as string;
    const foundPage = this.appComponent.appPages.find(page => page.url === `/folder/${id}`);
    if (foundPage) {
      this.folder = foundPage.title;
          this.products = [
            {
              name: 'Majca LAGANO',
              description: 'Pamuk/Viskoza',
              imageUrl: 'https://brendly-prod.s3.eu-central-1.amazonaws.com/5988/10566/3/108805/pictures/3/Bela.jpg?u=2022-05-27T17:58:46.011Z&cacheblock=true'
            },
            {
              name: 'Proizvod2',
              description: 'Opis proizvoda 2',
              imageUrl: 'https://brendly-prod.s3.eu-central-1.amazonaws.com/5988/10566/3/108805/pictures/3/Bela.jpg?u=2022-05-27T17:58:46.011Z&cacheblock=true'
            },
            {
              name: 'Proizvod3',
              description: 'Opis proizvoda 1',
              imageUrl: 'https://brendly-prod.s3.eu-central-1.amazonaws.com/5988/10566/3/108805/pictures/3/Bela.jpg?u=2022-05-27T17:58:46.011Z&cacheblock=true'
            },
            {
              name: 'Proizvod 4',
              description: 'Opis proizvoda 2',
              imageUrl: 'https://brendly-prod.s3.eu-central-1.amazonaws.com/5988/10566/3/108805/pictures/3/Bela.jpg?u=2022-05-27T17:58:46.011Z&cacheblock=true'
            },
            {
              name: 'Proizvod5',
              description: 'Opis proizvoda 1',
              imageUrl: 'https://brendly-prod.s3.eu-central-1.amazonaws.com/5988/10566/3/108805/pictures/3/Bela.jpg?u=2022-05-27T17:58:46.011Z&cacheblock=true'
            },
            {
              name: 'Proizvod6',
              description: 'Opis proizvoda 2',
              imageUrl: 'https://brendly-prod.s3.eu-central-1.amazonaws.com/5988/10566/3/108805/pictures/3/Bela.jpg?u=2022-05-27T17:58:46.011Z&cacheblock=true'
            },
            {
              name: 'Proizvod7',
              description: 'Opis proizvoda 1',
              imageUrl: 'https://brendly-prod.s3.eu-central-1.amazonaws.com/5988/10566/3/108805/pictures/3/Bela.jpg?u=2022-05-27T17:58:46.011Z&cacheblock=true'
            },
            {
              name: 'Proizvod8',
              description: 'Opis proizvoda 2',
              imageUrl: 'https://brendly-prod.s3.eu-central-1.amazonaws.com/5988/10566/3/108805/pictures/3/Bela.jpg?u=2022-05-27T17:58:46.011Z&cacheblock=true'
            },{
              name: 'Proizvod9',
              description: 'Opis proizvoda 1',
              imageUrl: 'https://brendly-prod.s3.eu-central-1.amazonaws.com/5988/10566/3/108805/pictures/3/Bela.jpg?u=2022-05-27T17:58:46.011Z&cacheblock=true'
            },
            {
              name: 'Proizvod10',
              description: 'Opis proizvoda 2',
              imageUrl: 'https://brendly-prod.s3.eu-central-1.amazonaws.com/5988/10566/3/108805/pictures/3/Bela.jpg?u=2022-05-27T17:58:46.011Z&cacheblock=true'
            },{
              name: 'Proizvod11',
              description: 'Opis proizvoda 2',
              imageUrl: 'https://brendly-prod.s3.eu-central-1.amazonaws.com/5988/10566/3/108805/pictures/3/Bela.jpg?u=2022-05-27T17:58:46.011Z&cacheblock=true'
            },
            
          ];

          
        
      }
      this.filteredProducts = this.products;
  }

  handleInput(event: any) {
    const query = event.target.value.toLowerCase();
    this.filteredProducts = this.products.filter(product => 
      product.name.toLowerCase().includes(query) || 
      product.description.toLowerCase().includes(query)
    );
  }

  redirectedToProduct(name:string){
    this.router.navigate(['/proizvod', name]);
  }

}
