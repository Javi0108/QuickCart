import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CookieService } from "ngx-cookie-service";
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseURL = "http://localhost:8000/api/";
  private token: string | null = null;
  private token_refresh: string | null = null;

  constructor(private http: HttpClient, private cookies: CookieService) {}

  login(user: any): Observable<any> {
    return this.http.post<any>(`${this.baseURL}accounts/login/`, { user }).pipe(
      tap(response => {
        this.token = response.access;
        this.token_refresh = response.refresh;
        localStorage.setItem('token', this.token as string);
        localStorage.setItem('token_refresh', this.token_refresh as string);
      })
    );
  }

  register(user: any): Observable<any> {
    return this.http.post(`${this.baseURL}`+"accounts/register/", user);
  }

  getUser(id: any) {
    return this.http.get(`${this.baseURL}`+"accounts/profile/", id)
  }

}
