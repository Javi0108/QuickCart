import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShopData } from 'src/app/interfaces/shop.interface';
import { ShopService } from 'src/app/services/shop.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-web-page-edit',
  templateUrl: './web-page-edit.page.html',
  styleUrls: ['./web-page-edit.page.scss'],
})
export class WebPageEditPage implements OnInit {

  shopData!: ShopData;
  shopId!: number;


  //CAMPOS EDITABLES QUE HAY QUE GUARDAR EN LA BASE DE DATOS PERO AUN SON PROVICIONALES

  bannerImage: File | null;

  //
  products = [
    { name: 'Fancy Product', price: '$40.00 - $80.00', image: 'https://pyxis.nymag.com/v1/imgs/96f/1ef/ac93d2b422a1c5de953dc39764579a306c-ONGold.jpg' },
    { name: 'Special Item', price: '$18.00', image: 'https://pyxis.nymag.com/v1/imgs/96f/1ef/ac93d2b422a1c5de953dc39764579a306c-ONGold.jpg' },
    { name: 'Sale Item', price: '$25.00', image: 'https://pyxis.nymag.com/v1/imgs/96f/1ef/ac93d2b422a1c5de953dc39764579a306c-ONGold.jpg' },
    { name: 'Popular Item', price: '$40.00', image: 'https://pyxis.nymag.com/v1/imgs/96f/1ef/ac93d2b422a1c5de953dc39764579a306c-ONGold.jpg' },
    { name: 'Sale Item', price: '$25.00', image: 'https://pyxis.nymag.com/v1/imgs/96f/1ef/ac93d2b422a1c5de953dc39764579a306c-ONGold.jpg' },
    { name: 'Fancy Product', price: '$120.00 - $280.00', image: 'https://pyxis.nymag.com/v1/imgs/96f/1ef/ac93d2b422a1c5de953dc39764579a306c-ONGold.jpg' },
    { name: 'Special Item', price: '$18.00', image: 'https://pyxis.nymag.com/v1/imgs/96f/1ef/ac93d2b422a1c5de953dc39764579a306c-ONGold.jpg' },
    { name: 'Popular Item', price: '$40.00', image: 'https://pyxis.nymag.com/v1/imgs/96f/1ef/ac93d2b422a1c5de953dc39764579a306c-ONGold.jpg' },
    { name: 'Fancy Product', price: '$40.00 - $80.00', image: 'https://pyxis.nymag.com/v1/imgs/96f/1ef/ac93d2b422a1c5de953dc39764579a306c-ONGold.jpg' },
    { name: 'Special Item', price: '$18.00', image: 'https://pyxis.nymag.com/v1/imgs/96f/1ef/ac93d2b422a1c5de953dc39764579a306c-ONGold.jpg' },
    { name: 'Sale Item', price: '$25.00', image: 'https://pyxis.nymag.com/v1/imgs/96f/1ef/ac93d2b422a1c5de953dc39764579a306c-ONGold.jpg' },
    { name: 'Popular Item', price: '$40.00', image: 'https://pyxis.nymag.com/v1/imgs/96f/1ef/ac93d2b422a1c5de953dc39764579a306c-ONGold.jpg' },
    { name: 'Sale Item', price: '$25.00', image: 'https://pyxis.nymag.com/v1/imgs/96f/1ef/ac93d2b422a1c5de953dc39764579a306c-ONGold.jpg' },
    { name: 'Fancy Product', price: '$120.00 - $280.00', image: 'https://pyxis.nymag.com/v1/imgs/96f/1ef/ac93d2b422a1c5de953dc39764579a306c-ONGold.jpg' },
    { name: 'Special Item', price: '$18.00', image: 'https://pyxis.nymag.com/v1/imgs/96f/1ef/ac93d2b422a1c5de953dc39764579a306c-ONGold.jpg' },
    { name: 'Popular Item', price: '$40.00', image: 'https://pyxis.nymag.com/v1/imgs/96f/1ef/ac93d2b422a1c5de953dc39764579a306c-ONGold.jpg' }
  ];

  constructor(private route: ActivatedRoute, private shopService: ShopService, private cdr: ChangeDetectorRef) { 
    this.bannerImage = null;
  }

  ngOnInit() {
    const shopIdString = this.route.snapshot.paramMap.get('id');
    if (shopIdString) {
      this.shopId = +shopIdString;
      this.getShop(); // Llama al método para obtener los datos de la tienda
    } else {
      console.error('No se proporcionó un ID de tienda válido.');
    }
  }

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

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.bannerImage = file;
      this.cdr.detectChanges(); // Notifica a Angular que se han producido cambios
      console.log('Archivo seleccionado:', file);
    }
  }

  getImageUrl(file: File | null): string {
    if (file) {
      return URL.createObjectURL(file);
    }
    return '';
  }

  updateTitle(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.shopData!.title = inputElement.value;
  }
  
  updateShopName(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.shopData!.name = inputElement.value;
  }
  
  updateDescription(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.shopData!.description = inputElement.value;
  }
  
}
