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
      title: ['', Validators.required],
      description: ['', Validators.required],
      address: ['', Validators.required],
      image: [null, Validators.required]
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.loadProducts();
    });
  }


  loadProducts() {
    this.productService.getProducts().subscribe(
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
      componentProps: { createProductForm: this.createProductForm }
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
  }

  showDetail(id: number) {
    console.log('Show detail of product with ID:', id);
  }

}