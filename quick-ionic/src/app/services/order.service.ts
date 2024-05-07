import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { Order } from '../interfaces/cart.interface';


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private baseURL = "http://localhost:8000/api/orders/cart";
  private token: string | null;

  constructor(private http: HttpClient, private cookies: CookieService) {
    this.token = localStorage.getItem('token');
  }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.baseURL}`, { headers: this.getHeaders() });
  }

  getOrderById(orderId: number): Observable<Order> {
    return this.http.get<Order>(`${this.baseURL}${orderId}/`, { headers: this.getHeaders() });
  }

  createOrder(orderData: any): Observable<Order> {
    return this.http.post<Order>(`${this.baseURL}/`, orderData, { headers: this.getHeaders() });
  }

  updateOrder(orderId: number, updatedOrderData: any): Observable<Order> {
    return this.http.put<Order>(`${this.baseURL}${orderId}/`, updatedOrderData, { headers: this.getHeaders() });
  }

  deleteOrder(orderId: number): Observable<any> {
    return this.http.delete<any>(`${this.baseURL}${orderId}/`, { headers: this.getHeaders() });
  }

  private getHeaders(): HttpHeaders {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    if (this.token) {
      headers = headers.set('Authorization', `Bearer ${this.token}`);
    }
    return headers;
  }
}