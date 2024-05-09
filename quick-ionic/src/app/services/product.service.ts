import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { Product, ProductCreate } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseURL = "http://localhost:8000/api/shops/";
  private token: string | null;

  constructor(private http: HttpClient, private cookies: CookieService) {
    this.token = localStorage.getItem('token');
  }

  getProducts(): Observable<any> {
    return this.http.get<any>(`${this.baseURL}catalog/`, { headers: this.getHeaders() });
  }

  getShopProducts(shopId:number): Observable<any> {
    return this.http.get<any>(`${this.baseURL}shop-catalog/${shopId}`, { headers: this.getHeaders() });
  }

  getProductById(ProductId: number): Observable<any> {
    return this.http.get<any>(`${this.baseURL}product/${ProductId}/`, { headers: this.getHeaders() });
  }

  addProduct(newProductData: ProductCreate): Observable<any> {
    console.log(newProductData)
    return this.http.post<any>(`${this.baseURL}create-product/`, newProductData, {headers: this.getHeaders()})
  }
  
  deleteProduct(ProductId: number): Observable<any> {
    return this.http.delete<any>(`${this.baseURL}delete/product/${ProductId}/`, { headers: this.getHeaders() });
  }

  editProduct(ProductId: number, updatedProductData: any): Observable<any> {
    return this.http.put<any>(`${this.baseURL}edit/product/${ProductId}/`, updatedProductData, { headers: this.getHeaders() });
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
