import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { ShopEdit } from 'src/app/interfaces/shop.interface';
import { SellerService } from 'src/app/services/seller.service';

@Component({
  selector: 'app-edit-website-modal',
  templateUrl: './edit-website-modal.component.html',
  styleUrls: ['./edit-website-modal.component.scss'],
})
export class EditWebsiteModalComponent implements OnInit {

  @Input() editWebSiteForm!: FormGroup;
  @Input() imagePreview: any;
  file: File | null = null;

  constructor(
    private modalController: ModalController,
    private sellerService: SellerService
  ) { }

  ngOnInit() { }

  handleModalClose() {
    this.modalController.dismiss();
  }

  async editWebsite() {
    if (this.editWebSiteForm.valid) {
      const shopData: ShopEdit = {
        id_shop: this.editWebSiteForm.get('id_shop')?.value,
        name: this.editWebSiteForm.get('name')?.value,
        title: this.editWebSiteForm.get('title')?.value,
        description: this.editWebSiteForm.get('description')?.value,
        address: this.editWebSiteForm.get('address')?.value,
        logo: this.imagePreview,
      };
      console.log(this.imagePreview)
      this.editShop(shopData);
    }
  }


  editShop(shopData: ShopEdit) {
    this.sellerService.editShop(shopData.id_shop, shopData).subscribe({
      next: (response) => {
        this.handleModalClose();
      },
      error: (error) => {
        console.error('Error al agregar la tienda:', error);
      }
    });
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
