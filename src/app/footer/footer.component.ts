import { Component, HostListener } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  isScrolledToBottom: boolean = false;

  constructor(private alertController: AlertController) {}

  goToInstagram() {
    window.location.href = 'https://www.instagram.com/error.shop.rs?igsh=M2tmbzE0dWttZTVo';
  }

  goToTikTok(){
    window.location.href = 'https://www.tiktok.com/@kclothing.shop?_t=8mJuBunRZIc';
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Mejl je error404@gmail.com',
      buttons: ['OK']
    });

    await alert.present();

}
}
