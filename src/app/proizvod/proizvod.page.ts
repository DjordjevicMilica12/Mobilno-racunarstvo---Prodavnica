import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-proizvod',
  templateUrl: './proizvod.page.html',
  styleUrls: ['./proizvod.page.scss'],
})
export class ProizvodPage implements OnInit {
  
  public productName: string| null = null;

  constructor(private route: ActivatedRoute, private location: Location) {}

  ngOnInit() {
    this.productName = this.route.snapshot.paramMap.get('name');  //to je iz url ako name nije pronadjeno? 
  }

  goBack() {
    this.location.back();
  }

}
