import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Shop, ShopData } from 'src/app/interfaces/shop.interface';
import { SellerService } from 'src/app/services/seller.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-web-page-catalog',
  templateUrl: './web-page-catalog.page.html',
  styleUrls: ['./web-page-catalog.page.scss'],
})
export class WebPageCatalogPage implements OnInit {

  shops: Shop[] = [];
  searchTerm: string = '';
  filteredShops: Shop[] = [];

  public environment = environment;
  constructor(private route: ActivatedRoute, private sellerService: SellerService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const sellerId = params['sellerId'];
      if (sellerId) {
        this.getShopsBySeller(sellerId);
      } else {
        this.getAllShops();
      }
    });
  }

  getShopsBySeller(sellerId: number) {
    this.sellerService.getShopsBySeller(sellerId).subscribe({
      next: (response) => {
        this.shops = response;
        this.filteredShops = response;
      },
      error: (error) => {
        console.error('Error fetching shops by seller:', error);
      }
    });
  }

  getAllShops() {
    this.sellerService.getShops().subscribe({
      next: (response) => {
        this.shops = response;
        this.filteredShops = response;
      },
      error: (error) => {
        console.error('Error fetching shops by seller:', error);
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
