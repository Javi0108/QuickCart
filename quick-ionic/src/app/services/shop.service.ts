import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { Section } from '../interfaces/section.interface';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  private baseURL = "http://localhost:8000/api/shops/";
  private token: string | null;

  constructor(private http: HttpClient, private cookies: CookieService) {
    this.token = localStorage.getItem('token');
  }

  getShopById(id_shop: number): Observable<any> {
    return this.http.get<any>(`${this.baseURL}detail/${id_shop}/`, { headers: this.getHeaders() });
  }

  saveShopSection(id_shop: number, shop_data: Section) {
    return this.http.post<any>(`${this.baseURL}add-shop-section/`, { id_shop, shop_data }, { headers: this.getHeaders() });
  }

  updateShopSection(idSection: number, shop_data: Section) {
    return this.http.put<any>(`${this.baseURL}sections/edit/${idSection}/`, { shop_data }, { headers: this.getHeaders() })
  }

  deleteShopSection(idSection: number){
    return this.http.delete<any>(`${this.baseURL}sections/delete/${idSection}/`, {headers: this.getHeaders()})
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
