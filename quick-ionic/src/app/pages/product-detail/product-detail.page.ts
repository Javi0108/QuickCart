import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/interfaces/product.interface';
import { ProductService } from 'src/app/services/product.service';
import { IonInput } from '@ionic/angular';
import { OrderService } from 'src/app/services/order.service';
import { NotificationToastService } from 'src/app/services/notification-toast.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
})
export class ProductDetailPage implements OnInit {

  @ViewChild('quantity') quantity!: IonInput;

  selectedImage: string | null = null;
  productId!: number;
  productData!: Product;
  productComments: any;
  quantity_value: number = 1;
  newComment: string = '';

  currentUserId: string | null = null;

  public environment = environment;
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private orderService: OrderService,
    private notificationToastService: NotificationToastService,
  ) { }

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      const userString = localStorage.getItem('user');
      if (userString) {
        const user = JSON.parse(userString);
        this.currentUserId = user.id;
        console.log(user); 
        console.log(this.currentUserId);
      } else {
        console.error('No user found in localStorage');
      }
      this.productId = +productId;
      this.getProduct();
    } else {
      console.error('Invalid Product ID');
    }
  }

  getProduct() {
    this.productService.getProductById(this.productId).subscribe({
      next: (productData: Product) => {
        this.productData = productData;
        this.selectedImage = this.productData.avatar
        if (!this.productData) {
          console.error('No se encontró el producto con el ID proporcionado.');
        }
      },
      error: (error) => {
        console.error('Error al obtener los datos del producto:', error);
      }
    });

    this.productService.getProductComments(this.productId).subscribe({
      next: (data: any) => {
        this.productComments = data;
        console.log(this.productComments)
      },
      error: (error) => {
        console.error('Error al obtener los comentarios del producto:', error);
      }
    })
  }

  selectImage(image: string) {
    this.selectedImage = image;
  }

  addToCart() {
    this.quantity_value = Number(this.quantity.value);
    this.orderService.addProductToOrder(this.productId, this.quantity_value).subscribe({
      next(response) {
        console.log("Producto añadido correctamente al carrito")
      },
      error(error) {
        console.error('Error al obtener los datos del pedido/producto:', error);
      },
    });
  }
  
  calculateDaysAgo(dateString: string): number {
    const datePosted = new Date(dateString);
    const currentDate = new Date();
    const differenceInTime = currentDate.getTime() - datePosted.getTime();
    const differenceInDays = differenceInTime / (1000 * 3600 * 24);
    return Math.round(differenceInDays);
  }

  submitComment() {
    if (!this.newComment.trim()) {
      // Si el comentario está vacío, no hagas nada
      return;
    }

    this.productService.addComment(this.productId, this.newComment).subscribe({
      next: (newCommentData: any) => {
        this.productComments.unshift(newCommentData);
        this.newComment = '';
      },
      error: (error) => {
        console.error('Error al agregar el comentario:', error);
      }
    });
  }

  deleteComment(id: number) {
    this.productService.deleteComment(id).subscribe({
      next: (data: any) => {
        this.productComments = data;
        this.notificationToastService.presentToast(
          'El comentario se eliminó correctamente.',
          'success',
          '../../assets/check.svg'
        );
      },
      error: (error) => {
        console.error('Error al eliminar el comentario:', error);
        this.notificationToastService.presentToast(
          'Se produjo un error al eliminar el comentario. Por favor, inténtalo de nuevo más tarde.',
          'error',
          '../../assets/error.svg'
        );
      }
    });
  }

}