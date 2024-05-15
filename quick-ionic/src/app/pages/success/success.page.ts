import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from 'src/app/interfaces/cart.interface';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-success',
  templateUrl: './success.page.html',
  styleUrls: ['./success.page.scss'],
})
export class SuccessPage implements OnInit {
  cart!: Order; 
  orderId!: number;

  constructor(private route: ActivatedRoute, private orderService: OrderService) {
  }

  ngOnInit() {
    const orderId = this.route.snapshot.paramMap.get('id');
      if (orderId) {
        this.orderId = +orderId;
        this.loadOrder(+orderId);
      } else {
        console.error('Order ID not found in URL');
      }
  }

  loadOrder(orderId: number) {
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
}