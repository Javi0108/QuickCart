import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from 'src/app/interfaces/cart.interface';
import { NotificationToastService } from 'src/app/services/notification-toast.service';
import { OrderService } from 'src/app/services/order.service';
import { StripeService } from 'src/app/services/stripe.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-success',
  templateUrl: './success.page.html',
  styleUrls: ['./success.page.scss'],
})
export class SuccessPage implements OnInit {
  cart!: Order;

  public environment = environment;
  constructor(
    private orderService: OrderService, 
    private stripeService: StripeService, 
    private router: Router,
    private notificationToastService: NotificationToastService) {
  }

  ngOnInit() {
    this.loadOrder();
  }

  loadOrder() {
    this.orderService.getOrder().subscribe(
      (response: Order) => {
        this.cart = response;
        console.log('Loaded cart:', this.cart);
      },
      (error: any) => {
        console.error('Error loading cart:', error);
      }
    );
  }

  cancelOrder() {
    this.stripeService.cancelPayment("" + this.cart.id_order, this.cart.order_products).subscribe({
      next: (response) => {
        this.notificationToastService.presentToast(
          'Order cancelled successfully',
          'success',
          '../../assets/check.svg'
        );
        this.router.navigate(['cart']);
      },
      error: (error) => {
        this.notificationToastService.presentToast(
          'An error occurred while canceling the order',
          'danger',
          '../../assets/exclamation.svg'
        );
      }
    });
  }

}