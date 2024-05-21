import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormGroup } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/interfaces/product.interface';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product-modal.component.html',
  styleUrls: ['./edit-product-modal.component.scss'],
})
export class EditProductModalComponent implements OnInit{
  @Input() editProductForm!: FormGroup;
  @Input() shopId!: number;
  @Input() product!: Product;
  galleryPreviews: any[] = [];

  imagePreview: any;

  environment = environment;

  constructor(
    private modalController: ModalController,
    private productService: ProductService
  ) {

  }
  ngOnInit(): void {

    this.galleryPreviews = this.editProductForm.value.gallery
    this.imagePreview = this.editProductForm.value.image
  }

  closeModal(dataToSend?: any) {
    this.modalController.dismiss(dataToSend);
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
      if(imageUrl){
        this.imagePreview = imageUrl;
      }
    };
    reader.readAsDataURL(file);
  }

  onGallerySelected(event: any) {
    const files: FileList = event.target.files;
    if (files && files.length > 0) {
      this.convertFilesToDataURL(files, (imagePreviews: string[]) => {
        this.galleryPreviews.push(...imagePreviews);
      });
    }
  }


  discardImage(index:number){
    this.galleryPreviews.splice(index,1);
  }

  convertFilesToDataURL(files: FileList, callback: (imagePreviews: string[]) => void) {
    const imagePreviews: string[] = [];
    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.onload = () => {
        const imageUrl: string = reader.result as string;
        if (imageUrl) {
          imagePreviews.push(imageUrl);
          if (imagePreviews.length === files.length) {
            callback(imagePreviews);
          }
        }
      };
      reader.readAsDataURL(files[i]);
    }
  }

  async editProduct() {
    if (this.editProductForm.valid) {

      const data = {
        shopId: this.shopId,
        name: this.editProductForm.get('name')?.value,
        brand:this.editProductForm.get('brand')?.value,
        short_description:this.editProductForm.get('shortDescription')?.value,
        description:this.editProductForm.get('description')?.value,
        price:this.editProductForm.get('price')?.value,
        avatar:this.imagePreview,
        stock_quantity:this.editProductForm.get('stockQuantity')?.value,
        galleryPreviews: this.galleryPreviews
      }


      this.productService.editProduct(this.product.id_product, data).subscribe({
        next: (response) => {
          this.closeModal(response)
        },
        error: (error: any) => {
          console.error('Error al editar el producto:', error);
        },
      });
    }
  }

  selectImage() {
    const inputElement: HTMLInputElement | null = document.querySelector('.zyro-image-selector__input');
    if (inputElement) {
      inputElement.click();
    }
  }


  getImageSrc(image: any): string {
    if (typeof image === 'string' && image.startsWith('data:image/')) {
      return image;
    }
    return this.environment.backend + image.image;
  }
}
