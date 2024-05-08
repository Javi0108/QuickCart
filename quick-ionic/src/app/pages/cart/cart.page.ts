import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { Order, OrderProduct } from '../../interfaces/cart.interface';
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

  loadOrders(orderId: number) {
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

  getTotalPrice(orderProduct: OrderProduct): number {
    return orderProduct.quantity * Number(orderProduct.product.price);
  }
}