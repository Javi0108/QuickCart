import { Component, OnInit } from '@angular/core';
import { AddWebsiteModalComponent } from 'src/app/components/add-website-modal/add-website-modal.component';
import { ModalController } from '@ionic/angular';
import { ShopData } from 'src/app/interfaces/shop.interface';
import { SellerService } from 'src/app/services/seller.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-seller-shops',
  templateUrl: './seller-shops.page.html',
  styleUrls: ['./seller-shops.page.scss'],
})
export class SellerShopsPage implements OnInit {
  pageloaded: boolean;
  searchTerm: string = '';
  shops: ShopData[] = [];
  createWebSiteForm: FormGroup;
  filteredShops: ShopData[] = [];

  constructor(
    private sellerService: SellerService,
    private modalController: ModalController,
    private formBuilder: FormBuilder,
  ) {
    this.pageloaded = false;

    this.createWebSiteForm = this.formBuilder.group({
      name: ['', Validators.required],
      title: ['', Validators.required],
      description: ['', Validators.required],
      address: ['', Validators.required],
      image: [null, Validators.required]
    });
  }

  ngOnInit() {
    this.getShops();
  }

  ngAfterViewInit() {
    this.pageloaded = true;
  }

  async openAddWebsiteModal() {
    const modal = await this.modalController.create({
      component: AddWebsiteModalComponent,
      cssClass: 'add-website-modal',
      componentProps: {
        createWebSiteForm: this.createWebSiteForm,
      }
    });

    modal.onDidDismiss().then(() => {
      this.getShops();
    });

    return await modal.present();
  }


  getShops() {
    this.sellerService.getShops().subscribe({
      next: (response) => {
        this.shops = response;
        this.filteredShops = response;
      },
      error: (error) => {
        console.error('Error al obtener las tiendas:', error);
      }
    });
  }

  removeShop(shopId: number) {
    this.sellerService.removeShop(shopId).subscribe({
      next: (response) => {
        // Si la tienda se elimina correctamente, actualiza la lista de tiendas
        this.getShops();
      },
      error: (error) => {
        console.error('Error al eliminar la tienda:', error);
      }
    });
  }

  editShop(shopId: number, updatedShopData: any) {
    this.sellerService.editShop(shopId, updatedShopData).subscribe({
      next: (response) => {
        // Si la tienda se edita correctamente, actualiza la lista de tiendas
        this.getShops();
      },
      error: (error) => {
        console.error('Error al editar la tienda:', error);
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
      this.filteredShops = this.shops;
    } else {
      this.filteredShops = this.shops.filter((shop) => {
        return shop.name.toLowerCase().includes(searchTerm) ||
          shop.title.toLowerCase().includes(searchTerm) ||
          shop.description.toLowerCase().includes(searchTerm);
      });
    }
  }
}
