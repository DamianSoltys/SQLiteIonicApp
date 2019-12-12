import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class ToastsService {

  constructor(public toastCtrl:ToastController) { }


  async showToast(message: string) {
    let toast = await this.toastCtrl.create({
      message: message,
      duration: 2000,
      cssClass: "toast",
      showCloseButton: true,
      closeButtonText: 'Zamknij',    
    });
    toast.present();
  }
}
