import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/interfaces/product.interface';
import { ProductService } from 'src/app/services/product.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-shop-catalog',
  templateUrl: './shop-catalog.page.html',
  styleUrls: ['./shop-catalog.page.scss'],
})
export class ShopCatalogPage implements OnInit {
  
  
  @Input() shopName!: string;
  shopId!: number;
  products: Product[] = [];
  pageloaded: boolean;
  searchTerm: string = '';
  filteredProducts: Product[] = [];

  public environment = environment;
  constructor(private productService: ProductService, private route: ActivatedRoute) {
    this.pageloaded = false;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.shopId = + params['id'];
      this.shopName = params['name'];
      this.loadProducts(this.shopId);
    });
  }

  loadProducts(shopId: number) {
    console.log(shopId)
    this.productService.getShopProducts(shopId).subscribe(
      (response) => {
        this.products = response;
        this.filteredProducts = response;
        this.pageloaded = true;
        console.log(this.products)
      },
      (error) => {
        console.error('Error al cargar los productos:', error);
      }
    );
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
          product.brand!.toLowerCase().includes(searchTerm);
      });
    }
  }


}
