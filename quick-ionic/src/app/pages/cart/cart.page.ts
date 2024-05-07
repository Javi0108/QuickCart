import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { Order } from '../../interfaces/cart.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  cart: Order | null = null;
  orderId!: number;

  constructor(private route: ActivatedRoute, private orderService: OrderService) { }

  
  ngOnInit() {
    const orderId = this.route.snapshot.paramMap.get('id');
    if (orderId) {
      this.orderId = +orderId;
      this.loadOrders(+orderId);
    } else {
      console.error('Order ID not found in URL');
    } 
  }

  loadOrders(orderId:number) {
    this.orderService.getOrder(orderId).subscribe(
      (response: Order) => {
        this.cart = response;
        console.log('Loaded cart:', this.cart);
      },
      (error: any) => {
        console.error('Error loading cart:', error);
      }
    );
  }

  addProductToOrder(productId: number, quantity: number) {
    this.orderService.addProductToOrder(productId, quantity).subscribe(
      (response) => {
        console.log('Product added to order:', response);
        this.loadOrders(this.orderId); // Recargar el pedido después de agregar un producto
      },
      (error) => {
        console.error('Error adding product to order:', error);
      }
    );
  }

  removeProductFromOrder(orderId: number, productId: number) {
    this.orderService.removeProductFromOrder(orderId, productId).subscribe(
      (response) => {
        console.log('Product removed from order:', response);
        this.loadOrders(this.orderId); // Recargar el pedido después de eliminar un producto
      },
      (error) => {
        console.error('Error removing product from order:', error);
      }
    );
  }
}
