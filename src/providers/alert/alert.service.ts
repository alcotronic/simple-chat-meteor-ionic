import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';

@Injectable()
export class AlertService {

  constructor(private alertController: AlertController) {}

  showWithTitleOnly(title: string) {
    let alert = this.alertController.create({
      title: title,
      cssClass: 'alert-signin',
      buttons: ['Ok']
    });

    alert.onDidDismiss(() => {
      console.log('Dismissed alert');
    });

    alert.present();
  }
}
