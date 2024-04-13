import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'notification-toast',
  template: 'notification-toast.component.html',
})
export class NotificationToastComponent {
  constructor(private toastController: ToastController) {}

  async presentToast(message: string) {
    let toast = await this.toastController.create({
      message: message,
      position: "top"
    });

    toast.present();
  }
}