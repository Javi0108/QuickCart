import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CookieService } from "ngx-cookie-service";
import { tap } from 'rxjs/operators';
import { User } from '../interfaces/user.interface';
import { jwtDecode } from "jwt-decode";
import { FormGroup } from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseURL = window.location.protocol + '//' + window.location.hostname + ':8000' + "/api/";
  private token: string | null = null;
  private token_refresh: string | null = null;
  private user: User | null = null;
  constructor(private http: HttpClient, private cookies: CookieService) { }

  register(user: any): Observable<any> {
    return this.http.post(`${this.baseURL}` + "accounts/register/", user);
  }

  login(user: any): Observable<any> {
    return this.http.post<any>(`${this.baseURL}accounts/login/`, { user }).pipe(
      tap(response => {
        this.token = response.access;
        this.token_refresh = response.refresh;
        localStorage.setItem('token', this.token as string);
        localStorage.setItem('token_refresh', this.token_refresh as string);
        localStorage.setItem('user', JSON.stringify(response.user));
      })
    );
  }

  logout(user: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = token ? new HttpHeaders({ 'Authorization': `Bearer ${token}` }) : new HttpHeaders();
    const refreshToken = localStorage.getItem('token_refresh');
    localStorage.removeItem('token');
    localStorage.removeItem('token_refresh');
    localStorage.removeItem('user');
    return this.http.post<any>(`${this.baseURL}accounts/logout/`, { refresh_token: refreshToken }, { headers: headers });
  }


  getUser(id: any) {
    return this.http.get(`${this.baseURL}` + "accounts/profile/", id);
  }

  changeUserPassword(formValue: FormGroup, user: User) {
    const updatePass = {
      oldPassword: formValue.get('oldPassword')?.value,
      newPassword: formValue.get('newPassword')?.value,
      confirmPassword: formValue.get('confirmPassword')?.value,
      user: user, // Ejemplo de cómo podrías pasar el ID de usuario
    };
    return this.http.post<User>(`${this.baseURL}` + `accounts/change-password/`, updatePass, { headers: this.getHeadersGet() });
  }

  private getHeadersGet(): HttpHeaders {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    if (this.token) {
      headers = headers.set('Authorization', `Bearer ${this.token}`);
    }
    return headers;
  }

  // Método para verificar si el token de acceso está caducado
  isAccessTokenExpired(): boolean {
    const accessToken = localStorage.getItem('token');
    if (!accessToken) {
      return true;
    }
    const decodedToken: any = jwtDecode(accessToken);
    const expiration = decodedToken.exp * 1000; // convertir a milisegundos
    return Date.now() >= expiration;
  }

  refreshToken(refreshToken: string): Observable<any> {
    return this.http.post<any>(`${this.baseURL}token/refresh/`, { refresh: refreshToken });
  }
}
