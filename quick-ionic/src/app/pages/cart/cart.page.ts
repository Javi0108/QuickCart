import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { Order } from '../../interfaces/cart.interface';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  orders: Order[] = [];

  constructor(private orderService: OrderService) { }

  ngOnInit() {
    this.loadOrders();
  }

  loadOrders() {
    this.orderService.getOrder().subscribe(
      (response: Order) => {
        this.cart = response;
      },
      (error) => {
        console.error('Error loading cart:', error);
      }
    );
  }

  addProductToOrder(productId: number, quantity: number) {
    this.orderService.addProductToOrder(productId, quantity).subscribe(
      (response) => {
        console.log('Product added to order:', response);
        // Optionally, reload the orders after adding a product
        this.loadOrders();
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
        // Optionally, reload the orders after removing a product
        this.loadOrders();
      },
      (error) => {
        console.error('Error removing product from order:', error);
      }
    );
  }
}
