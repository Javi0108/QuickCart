import { Component, OnInit } from '@angular/core';
import { Shop, ShopData } from 'src/app/interfaces/shop.interface';
import { SellerService } from 'src/app/services/seller.service';

@Component({
  selector: 'app-seller-shops',
  templateUrl: './seller-shops.page.html',
  styleUrls: ['./seller-shops.page.scss'],
})
export class SellerShopsPage implements OnInit {
  pageloaded: boolean;
  shops: ShopData[] = [];

  constructor(private sellerService: SellerService) { 
    this.pageloaded = false;
  }

  ngOnInit() {
    this.getShops();
  }

  ngAfterViewInit() {
    this.pageloaded = true;
  }

  getShops() {
    this.sellerService.getshops().subscribe({
      next: (response) => {
        this.shops = response; // Asignar los datos de las tiendas al arreglo 'shops'
        console.log(this.shops)
      },
      error: (error) => {
        console.error('Error al obtener las tiendas:', error);
      }
    });
  }

  addShop(newShopData: any) {
    this.sellerService.addshop(newShopData).subscribe({
      next: (response) => {
        // Si la tienda se agrega correctamente, actualiza la lista de tiendas
        this.getShops();
      },
      error: (error) => {
        console.error('Error al agregar la tienda:', error);
      }
    });
  }

  removeShop(shopId: number) {
    this.sellerService.removeshop(shopId).subscribe({
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
    this.sellerService.editshop(shopId, updatedShopData).subscribe({
      next: (response) => {
        // Si la tienda se edita correctamente, actualiza la lista de tiendas
        this.getShops();
      },
      error: (error) => {
        console.error('Error al editar la tienda:', error);
      }
    });
  }
}
