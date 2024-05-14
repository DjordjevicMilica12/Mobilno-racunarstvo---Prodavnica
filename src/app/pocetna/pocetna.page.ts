import { Component } from '@angular/core';

@Component({
  selector: 'app-pocetna',
  templateUrl: './pocetna.page.html',
  styleUrls: ['./pocetna.page.scss'],
})
export class PocetnaPage {
  slides = [
    { image: 'https://brendly-prod.s3.eu-central-1.amazonaws.com/5988/10566/3/108805/pictures/3/Bela.jpg?u=2022-05-27T17:58:46.011Z&cacheblock=true', content: 'Slide 1' },
    { image: 'https://brendly-prod.s3.eu-central-1.amazonaws.com/5988/10566/3/108815/pictures/3/Crna.jpg?u=2022-05-31T00:25:18.860Z&cacheblock=true', content: 'Slide 2' },
    { image: 'https://brendly-prod.s3.eu-central-1.amazonaws.com/5988/10566/3/108819/pictures/3/Bela.jpg?u=2022-05-31T00:12:20.922Z&cacheblock=true', content: 'Slide 3' },
    { image: 'https://brendly-prod.s3.eu-central-1.amazonaws.com/5988/10566/4/108856/pictures/4/Bela.jpg?u=2022-10-01T17:42:12.130Z&cacheblock=true', content: 'Slide 4' },

    { image: 'https://brendly-prod.s3.eu-central-1.amazonaws.com/5988/10566/4/108873/pictures/4/Teget.jpg?u=2022-05-27T19:16:11.033Z&cacheblock=true', content: 'Slide 1' },
    { image: 'https://brendly-prod.s3.eu-central-1.amazonaws.com/5988/10566/3/109040/pictures/3/Bela.jpg?u=2022-10-01T15:33:53.098Z&cacheblock=true', content: 'Slide 2' },
    { image: 'https://brendly-prod.s3.eu-central-1.amazonaws.com/5988/10566/3/109041/pictures/3/Crna.jpg?u=2022-10-01T19:27:45.831Z&cacheblock=true', content: 'Slide 3' },
    { image: 'https://brendly-prod.s3.eu-central-1.amazonaws.com/5988/10566/3/109119/pictures/3/Crna.jpg?u=2022-10-01T18:25:49.958Z&cacheblock=true', content: 'Slide 4' },
    
  ];
  currentSlide = 0;

  constructor() {
    setInterval(() => {
      this.nextSlide();
    }, 2000);
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
  }
}
