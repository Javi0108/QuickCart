import { Injectable, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class NotificationToastService{

    constructor(private notificationToast: ToastController) {}

    async presentToast(message: string, color: string, icon: string) {
        const toast = await this.notificationToast.create({
          message: message,
          duration: 3000,
          position: 'top',
          color: color,
          icon: icon
        });
        toast.present();
      }
}