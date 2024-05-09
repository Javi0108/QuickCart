import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product.interface';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products-catalog',
  templateUrl: './products-catalog.page.html',
  styleUrls: ['./products-catalog.page.scss'],
})
export class ProductsCatalogPage implements OnInit, AfterViewInit {
  products: Product[] = [];
  pageloaded: boolean;
  searchTerm: string = '';
  filteredProducts: Product[] = [];

  constructor(private productService: ProductService) { 
    this.pageloaded = false;
  }

  ngOnInit() {
    this.loadProducts();
  }

  ngAfterViewInit() {
    this.pageloaded = true;
  }

  loadProducts() {
    this.productService.getProducts().subscribe(
      (response) => {
        this.products = response;
        this.filteredProducts = response;
      },
      (error) => {
        console.error('Error loading products:', error);
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
