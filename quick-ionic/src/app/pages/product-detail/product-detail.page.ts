import { Component } from '@angular/core';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
})
export class ProductDetailPage {
  selectedImage: string | null = null; // Debes inicializar o definir según tus necesidades
  product: any = {}; // Aquí deberías tener un tipo definido para 'product' según tu estructura de datos
  // Otros miembros de la clase y métodos necesarios

  selectImage(image: any) {
    this.selectedImage = image.img;
  }

  addToCart() {
    // Lógica para agregar al carrito
  }
}