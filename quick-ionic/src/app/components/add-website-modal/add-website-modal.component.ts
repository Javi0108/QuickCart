import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormGroup } from '@angular/forms';
import { SellerService } from 'src/app/services/seller.service';
import { ShopCreate, ShopData } from 'src/app/interfaces/shop.interface';

@Component({
  selector: 'app-add-website-modal',
  templateUrl: './add-website-modal.component.html',
  styleUrls: ['./add-website-modal.component.scss'],
})
export class AddWebsiteModalComponent {

  @Input() createWebSiteForm!: FormGroup;

  constructor(
    private modalController: ModalController,
    private sellerService: SellerService,
  ) { }

  closeModal() {
    this.modalController.dismiss();
  }

  async submitForm() {
    if (this.createWebSiteForm.valid) {
      const logoBase64 = await this.convertImageToBase64(this.createWebSiteForm.get('image')?.value);
      const shopData: ShopCreate = {
        shop_name: this.createWebSiteForm.get('shop_name')?.value,
        title: this.createWebSiteForm.get('title')?.value,
        description: this.createWebSiteForm.get('description')?.value,
        address: this.createWebSiteForm.get('address')?.value,
        logo: logoBase64,
      };
  
      this.sellerService.addShop(shopData).subscribe({
        next: (response) => {
          this.modalController.dismiss();
        },
        error: (error: any) => {
          console.error('Error al crear la tienda:', error);
        }
      });
    }
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.createWebSiteForm.patchValue({
        image: file // Establece el objeto File completo como el valor del campo de entrada de archivos
      });
      this.createWebSiteForm.get('image')?.updateValueAndValidity(); // Actualiza la validez del control de formulario
    }
  }

  // Función para convertir la imagen a base64
  private convertImageToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  }

}
