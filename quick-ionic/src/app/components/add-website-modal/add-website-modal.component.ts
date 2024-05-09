import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormGroup } from '@angular/forms';
import { SellerService } from 'src/app/services/seller.service';
import { ShopCreate, ShopData } from 'src/app/interfaces/shop.interface';
import { NotificationToastService } from 'src/app/services/notification-toast.service';

@Component({
  selector: 'app-add-website-modal',
  templateUrl: './add-website-modal.component.html',
  styleUrls: ['./add-website-modal.component.scss'],
})
export class AddWebsiteModalComponent {

  @Input() createWebSiteForm!: FormGroup;
  imagePreview: any;
  file: File | null = null;
  waitingAnswer?: boolean;

  constructor(
    private modalController: ModalController,
    private sellerService: SellerService,
    private notificationToastService: NotificationToastService
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
        logo: this.imagePreview,
      };
      this.addShop(shopData);
    }
  }

  addShop(shopData: ShopCreate) {
    this.waitingAnswer = true;
    this.sellerService.addShop(shopData).subscribe({
      next: (response) => {
        this.waitingAnswer = false;
        this.notificationToastService.presentToast(
          'Store successfully created',
          'success',
          '../../assets/check.svg'
        );
        this.handleModalClose();
      },
      error: (error) => {
        this.notificationToastService.presentToast(
          'An error occurred while creating the store',
          'danger',
          '../../assets/exclamation.svg'
        );
      }
    });
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.convertFileToDataURL(file);
    }
  }

  convertFileToDataURL(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      const imageUrl: string = reader.result as string;
      if (imageUrl) {
        this.imagePreview = imageUrl
      }
    };
    reader.readAsDataURL(file);
  }

  showImagePreview(imageData: string) {
    this.imagePreview = imageData;
  }


  changeImage(event: any) {
    this.file = event.target.files[0];
    if (this.file) {
      this.convertFileToDataURL(this.file);
    }
  }

  selectImage() {
    const inputElement: HTMLInputElement | null = document.querySelector('.zyro-image-selector__input');
    if (inputElement) {
      inputElement.click();
    }
  }
}
