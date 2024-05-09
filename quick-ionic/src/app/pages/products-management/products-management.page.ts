import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController, AlertController } from '@ionic/angular';
import { Product } from 'src/app/interfaces/product.interface';
import { ProductService } from 'src/app/services/product.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddProductModalComponent } from 'src/app/components/add-product-modal/add-product-modal.component';
import { EditProductModalComponent } from 'src/app/components/edit-product-modal/edit-product-modal.component';


@Component({
  selector: 'app-products-management',
  templateUrl: './products-management.page.html',
  styleUrls: ['./products-management.page.scss'],
})
export class ProductsManagementPage {
  @Input() shopName!:string;
  searchTerm: string = '';
  pageloaded: boolean;
  products: any[] = [];
  createProductForm: FormGroup;
  editProductForm!: FormGroup;
  shopId!: number;
  filteredProducts: Product[] = [];


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
      gallery: ['']
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.shopId = + params['id'];
      this.loadProducts(this.shopId);
    });
  }

  ngAfterViewInit() {
    this.pageloaded = true;
  }


  loadProducts(shopId: number) {
    this.productService.getShopProducts(shopId).subscribe(
      (response) => {
        this.products = response;
        this.filteredProducts = response;
        console.log(this.products)
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
      }
    });
  
    return await modal.present();
  }

  async openEditModal(product: Product) {

    this.editProductForm = this.formBuilder.group({
      name: [product.name, Validators.required],
      brand: [product.brand],
      shortDescription: [product.short_description],
      description: [product.description, Validators.required],
      price: [product.price, [Validators.required, Validators.min(0)]],
      image: [product.avatar],
      stockQuantity: [product.stock_quantity, [Validators.required, Validators.min(0)]],
      gallery: [product.images]
    });

    console.log("openModal", product)

    const modal = await this.modalController.create({
      component: EditProductModalComponent,
      cssClass: 'edit-product-modal',
      componentProps: { editProductForm: this.editProductForm, product: product, shopId: this.shopId }
    });
  
    modal.onDidDismiss().then((data) => {
      if (data && data.data) {
        const updatedProduct = data.data;
        const index = this.products.findIndex(p => p.id_product === updatedProduct.id_product);
        if (index !== -1) {
          this.products.splice(index, 1, updatedProduct);
        }
        console.log('Data received from modal:', data.data);
      }
    });
  
    return await modal.present();
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
    this.products = this.products.filter(product => product.id_product !== id);
    this.productService.deleteProduct(id).subscribe({
      next: (response) => {
        this.loadProducts(this.shopId);
      },
      error: (error:any)=> {
        console.error('Error deleting product:', error);
      }
    });
  }

   /**
   * Método para manejar el cambio en el término de búsqueda
   * @param event Evento de cambio de la barra de búsqueda
   */
    onSearchChange(event: any) {
      const searchTerm = event.target.value.toLowerCase();
      if (!searchTerm.trim()) {
        this.filteredProducts = this.products;
      } else {
        this.filteredProducts = this.products.filter((product) => {
          return product.name.toLowerCase().includes(searchTerm) ||
          product.brand.toLowerCase().includes(searchTerm);
        });
      }
    }

}