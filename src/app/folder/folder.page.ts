import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProizvodServisService } from '../proizvod-servis.service';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string = '';
  public products: any[] = [];
  public maleProducts: any[] = [];
  public femaleProducts: any[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private productService: ProizvodServisService
  ) {}

  ngOnInit() {
    this.productService.getProducts().subscribe((data: any[]) => {
      this.products = data;
      this.maleProducts = this.products.filter(product => product.pol === 'muski');
      this.femaleProducts = this.products.filter(product => product.pol === 'zenski');
      this.checkFolderURL();
    });
  }

  handleInput(event: any) {
    const query = event.target.value.toLowerCase();
    // filter za musk
    this.maleProducts = this.products
      .filter(product => product.pol === 'muski')
      .filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
      );
    // filter za zens
    this.femaleProducts = this.products
      .filter(product => product.pol === 'zenski')
      .filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
      );
  }

  redirectedToProduct(product: any) {
    this.router.navigate(['/proizvod', product.name], {
      state: { product }
    });
  }

  checkFolderURL() {
    const folderUrl = this.router.url;
    if (folderUrl.includes('Zene')) {
      this.femaleProducts = this.products.filter(product => product.pol === 'zenski');
      this.maleProducts = [];
    } else if (folderUrl.includes('Muskarci')) {
      this.maleProducts = this.products.filter(product => product.pol === 'muski');
      this.femaleProducts = [];
    }
  }
}
