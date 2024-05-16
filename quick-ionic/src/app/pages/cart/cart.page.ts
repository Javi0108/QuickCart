import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { Order, OrderProduct } from '../../interfaces/cart.interface';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/interfaces/product.interface';
import { StripeService } from 'src/app/services/stripe.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  cart!: Order;
  orderId!: number;

  constructor(private route: ActivatedRoute, private orderService: OrderService, private stripeService: StripeService) { }

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

  getTotalPrice(orderProduct: OrderProduct): number {
    return orderProduct.quantity * Number(orderProduct.product.price);
  }

  updateQuantity(productId: number, quantity: number) {
    this.orderService.updateProductQuantity(this.cart.id_order, productId, quantity).subscribe({
      next: (response) => {
        console.log("Product quantity updated successfully");
      },
      error: (error) => {
        console.error('Error updating product quantity:', error);
      },
    });
  }

  removeFromCart(productId: number) {
    this.orderService.removeProductFromOrder(this.cart.id_order, productId).subscribe({
      next: (response) => {
        this.loadOrder(this.cart.id_order)
        console.log("Producto eliminado correctamente del carrito")
      },
      error: (error) => {
        console.error('Error al obtener los datos del pedido/producto:', error);
      },
    });
  }

  makePayment(products: any) {
    this.stripeService.createCheckoutSession(products, this.cart.id_order).subscribe((data) => {
      window.location.href = data.url;
    });
  }
  

}