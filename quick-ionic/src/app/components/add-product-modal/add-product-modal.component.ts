import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormGroup } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product-modal.component.html',
  styleUrls: ['./add-product-modal.component.scss'],
})
export class AddProductModalComponent {
  @Input() createProductForm!: FormGroup;
  imagePreview: any;

  constructor(
    private modalController: ModalController,
    private productService: ProductService
  ) {

  }

  closeModal() {
    this.modalController.dismiss();
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

  async submitForm() {
    if (this.createProductForm.valid) {
      const formData: FormData = new FormData();
      formData.append('name', this.createProductForm.get('name')?.value);
      formData.append('brand', this.createProductForm.get('brand')?.value);
      formData.append('short_description', this.createProductForm.get('shortDescription')?.value);
      formData.append('description', this.createProductForm.get('description')?.value);
      formData.append('price', this.createProductForm.get('price')?.value);
      formData.append('avatar', this.createProductForm.get('image')?.value);
      formData.append('stock_quantity', this.createProductForm.get('stockQuantity')?.value);

      this.productService.addProduct(formData).subscribe({
        next: (response) => {
          this.modalController.dismiss();
        },
        error: (error: any) => {
          console.error('Error al crear el producto:', error);
        },
      });
    }
  }
}
