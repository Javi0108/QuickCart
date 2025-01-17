import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../interfaces/cart.interface';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private baseURL = "http://localhost:8000/api/orders/";
  private token: string | null;

  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('token');
  }

  getOrder(orderId: number): Observable<Order> {
    return this.http.get<Order>(`${this.baseURL}${orderId}/`, { headers: this.getHeaders() });
  }

  addProductToOrder(productId: number, quantity: number = 1): Observable<any> {
    const data = { product_id: productId, quantity };
    return this.http.post<any>(`${this.baseURL}add/`, data, { headers: this.getHeaders() });
  }
  
  updateProductQuantity(orderId: number, productId: number, quantity: number): Observable<any> {
    const data = { product_id: productId, quantity };
    return this.http.put<any>(`${this.baseURL}update/${orderId}/`, data, { headers: this.getHeaders() });
  }

  removeProductFromOrder(orderId: number, productId: number): Observable<any> {
    return this.http.delete<any>(`${this.baseURL}remove/${orderId}/?product_id=${productId}`, { headers: this.getHeaders() });
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
