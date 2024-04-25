import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  imagePreview: any;


  constructor(
    private modalController: ModalController,
    private sellerService: SellerService,
  ) { }

  handleModalClose() {
    this.modalController.dismiss();
  }

  async saveWebsite() {
    if (this.createWebSiteForm.valid) {
      const shopData: ShopCreate = {
        name: this.createWebSiteForm.get('name')?.value,
        title: this.createWebSiteForm.get('title')?.value,
        description: this.createWebSiteForm.get('description')?.value,
        address: this.createWebSiteForm.get('address')?.value,
        logo: this.createWebSiteForm.get('image')?.value,
      };
      this.handleModalClose();
      this.addShop(shopData);
    }
  }

  addShop(shopData: ShopCreate) {
    this.sellerService.addShop(shopData).subscribe({
      next: (response) => {
        this.handleModalClose();
      },
      error: (error) => {
        console.error('Error al agregar la tienda:', error);
      }
    });
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.showImagePreview(reader.result as string);
        this.createWebSiteForm.patchValue({
          image: reader.result
        });
      };
    }
  }

  showImagePreview(imageData: string) {
    // Aquí puedes mostrar la vista previa de la imagen, por ejemplo, asignándola a una variable en tu componente
    this.imagePreview = imageData;
  }

  // Función para convertir la imagen a base64
  private convertImageToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        resolve(reader.result as string);
      };
      reader.onerror = error => reject(error);
    });
  }
}
