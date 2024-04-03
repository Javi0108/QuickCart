import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Shop, ShopData } from 'src/app/interfaces/shop.interface';
import { ShopService } from 'src/app/services/shop.service';

@Component({
  selector: 'app-web-page',
  templateUrl: './web-page.page.html',
  styleUrls: ['./web-page.page.scss'],
})
export class WebPagePage implements OnInit {
  shopData: ShopData | undefined;
  shopId: number | undefined;

  //PROVICIONAL

  products = [
    { name: 'Fancy Product', price: '$40.00 - $80.00', image: 'https://dummyimage.com/450x300/dee2e6/6c757d.jpg' },
    { name: 'Special Item', price: '$18.00', image: 'https://dummyimage.com/450x300/dee2e6/6c757d.jpg' },
    { name: 'Sale Item', price: '$25.00', image: 'https://dummyimage.com/450x300/dee2e6/6c757d.jpg' },
    { name: 'Popular Item', price: '$40.00', image: 'https://dummyimage.com/450x300/dee2e6/6c757d.jpg' },
    { name: 'Sale Item', price: '$25.00', image: 'https://dummyimage.com/450x300/dee2e6/6c757d.jpg' },
    { name: 'Fancy Product', price: '$120.00 - $280.00', image: 'https://dummyimage.com/450x300/dee2e6/6c757d.jpg' },
    { name: 'Special Item', price: '$18.00', image: 'https://dummyimage.com/450x300/dee2e6/6c757d.jpg' },
    { name: 'Popular Item', price: '$40.00', image: 'https://dummyimage.com/450x300/dee2e6/6c757d.jpg' }
  ];

  constructor(private route: ActivatedRoute, private shopService: ShopService) { }

  ngOnInit() {
    const shopIdString = this.route.snapshot.paramMap.get('id');
    if (shopIdString) {
      this.shopId = +shopIdString;
      this.getShop(); // Llama al método para obtener los datos de la tienda
    } else {
      console.error('No se proporcionó un ID de tienda válido.');
    }
  }

  // Método para obtener los datos de la tienda y manejar la suscripción
  getShop() {
    this.shopService.getShopById(this.shopId!).subscribe({
      next: (shopData) => {
        this.shopData = shopData;
        console.log(shopData)
        if (!this.shopData) {
          console.error('No se encontró la tienda con el ID proporcionado.');
        }
      },
      error: (error) => {
        console.error('Error al obtener los datos de la tienda:', error);
      }
    });
  }
  

}
