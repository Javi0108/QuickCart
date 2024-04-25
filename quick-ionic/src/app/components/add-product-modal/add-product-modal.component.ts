import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product-modal.component.html',
  styleUrls: ['./add-product-modal.component.scss'],
})
export class AddProductModalComponent {
  createProductForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private modalController: ModalController,
    private productService: ProductService
  ) {
    this.createProductForm = this.formBuilder.group({
      name: ['', Validators.required],
      brand: [''],
      shortDescription: [''],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      image: [''],
      stockQuantity: ['', [Validators.required, Validators.min(0)]],
    });
  }

  closeModal() {
    this.modalController.dismiss();
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.createProductForm.patchValue({
      image: file,
    });
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
