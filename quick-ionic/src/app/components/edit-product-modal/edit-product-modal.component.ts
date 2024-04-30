import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormGroup } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/interfaces/product.interface';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product-modal.component.html',
  styleUrls: ['./edit-product-modal.component.scss'],
})
export class EditProductModalComponent {
  @Input() editProductForm!: FormGroup;
  @Input() shopId!: number;
  @Input() product!: Product;

  imagePreview: any;

  constructor(
    private modalController: ModalController,
    private productService: ProductService
  ) {

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
        stock_quantity:this.editProductForm.get('stockQuantity')?.value
      }

      console.log(data)

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
}
