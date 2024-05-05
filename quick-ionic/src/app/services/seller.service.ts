import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { ShopCreate } from '../interfaces/shop.interface';

@Injectable({
  providedIn: 'root'
})
export class SellerService {

  private baseURL = "http://localhost:8000/api/shops/";
  private token: string | null;

  constructor(private http: HttpClient, private cookies: CookieService) {
    this.token = localStorage.getItem('token');
  }

  getShops(): Observable<any> {
    // Obtener las tiendas del vendedor actual
    return this.http.get<any>(`${this.baseURL}my-shops/`, { headers: this.getHeaders() });
  }

  addShop(newShopData: ShopCreate): Observable<any> {
    // Agregar una nueva tienda
    return this.http.post<any>(`${this.baseURL}create-shop/`, newShopData, {headers: this.getHeaders()})
  }

  removeShop(shopId: number): Observable<any> {
    // Eliminar una tienda por su ID
    return this.http.delete<any>(`${this.baseURL}delete/${shopId}/`, { headers: this.getHeaders() });
  }

  editShop(shopId: number, updatedShopData: any): Observable<any> {
    return this.http.put<any>(`${this.baseURL}edit/${shopId}/`, updatedShopData, { headers: this.getHeaders() });
  }

  // Método para obtener los encabezados de la solicitud
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
