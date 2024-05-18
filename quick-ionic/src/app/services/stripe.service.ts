import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StripeService {

  private baseURL = environment.backend + "api/orders/";
  private token: string | null;

  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('token');
  }
  createCheckoutSession(items: any[], order_id : number) {
    return this.http.post<any>(`${this.baseURL}create-checkout-session/`, { items , order_id: order_id });
  }

  cancelPayment(orderId: string) {
    return this.http.post<any>(`${this.baseURL}cancel-payment/${orderId}`, {});
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
