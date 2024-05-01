import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController, AlertController } from '@ionic/angular';
import { Product } from 'src/app/interfaces/product.interface';
import { ProductService } from 'src/app/services/product.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddProductModalComponent } from 'src/app/components/add-product-modal/add-product-modal.component';


@Component({
  selector: 'app-products-management',
  templateUrl: './products-management.page.html',
  styleUrls: ['./products-management.page.scss'],
})
export class ProductsManagementPage {
  pageloaded: boolean;
  products: any[] = [];
  createProductForm: FormGroup;
  shopId!: number;


  constructor(
    private modalController: ModalController,
    private alertController: AlertController,
    private route: ActivatedRoute,
    private productService: ProductService,
    private formBuilder: FormBuilder
  ) {
    this.pageloaded = false;

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

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.shopId = + params['id'];
      this.loadProducts(this.shopId);
    });
  }

  loadProducts(shopId: number) {
    this.productService.getShopProducts(shopId).subscribe(
      (response) => {
        this.products = response;
      },
      (error) => {
        console.error('Error loading products:', error);
      }
    );
  }

  async openAddModal() {
    const modal = await this.modalController.create({
      component: AddProductModalComponent,
      cssClass: 'add-product-modal',
      componentProps: { createProductForm: this.createProductForm, shopId: this.shopId }
    });
  
    modal.onDidDismiss().then((data) => {
      if (data && data.data) {
        this.products.push(data.data)
        console.log('Data received from modal:', data.data);
      }
    });
  
    return await modal.present();
  }

  async openEditModal(product: Product) {

  }

  async confirmDelete(id: number) {
    const alert = await this.alertController.create({
      header: 'Confirm Delete',
      message: 'Are you sure you want to delete this product?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary'
        },
        {
          text: 'Delete',
          handler: () => {
            this.deleteProduct(id);
          }
        }
      ]
    });
    await alert.present();
  }

  deleteProduct(id: number) {
    console.log('Delete product with ID:', id);
    this.products = this.products.filter(product => product.id_product !== id);
    this.productService.deleteProduct(id).subscribe({
      next: (response) => {
        console.log(response)
        this.loadProducts(this.shopId);
      },
      error: (error:any)=> {
        console.error('Error deleting product:', error);
      }
    });
  }

  showDetail(id: number) {
    console.log('Show detail of product with ID:', id);
  }

}