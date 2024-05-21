import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormGroup } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product-modal.component.html',
  styleUrls: ['./add-product-modal.component.scss'],
})
export class AddProductModalComponent implements OnInit{
  @Input() createProductForm!: FormGroup;
  @Input() shopId!: number;
  imagePreview: any;
  galleryPreviews: any[] = [];

  constructor(
    private modalController: ModalController,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.createProductForm.reset();
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
  
  selectImage() {
    const inputElement: HTMLInputElement | null = document.querySelector('.zyro-image-selector__input');
    if (inputElement) {
      inputElement.click();
    }
  }
  
  onGallerySelected(event: any) {
    const files: FileList = event.target.files;
    if (files && files.length > 0) {
      this.convertFilesToDataURL(files, (imagePreviews: string[]) => {
        this.galleryPreviews = imagePreviews;
      });
    }
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

  async createProduct() {
    console.log("fkdskbdfkjgbkdf")
    if (this.createProductForm.valid) {

      const data = {
        shopId: this.shopId,
        name: this.createProductForm.get('name')?.value,
        brand:this.createProductForm.get('brand')?.value,
        short_description:this.createProductForm.get('shortDescription')?.value,
        description:this.createProductForm.get('description')?.value,
        price:this.createProductForm.get('price')?.value,
        avatar:this.imagePreview,
        stock_quantity:this.createProductForm.get('stockQuantity')?.value,
        galleryPreviews: this.galleryPreviews
      }

      this.productService.addProduct(data).subscribe({
        next: (response) => {
          this.closeModal(response)
        },
        error: (error: any) => {
          console.error('Error al crear el producto:', error);
        },
      });
    }
  }
}
