import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CookieService } from "ngx-cookie-service";

const URLAPI = 'http://localhost:8000/';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private cookies: CookieService) {}

  login(user: any): Observable<any>{
    return this.http.post(URLAPI+"accounts/login/", user);
  }

  register(user: any): Observable<any> {
    return this.http.post(URLAPI+"accounts/register/", user);
  }

  getUser() {
    return this.http.get(URLAPI+"accounts/profile/")
  }

  getUserLogged() {
    const token = this.getToken();
  }

  setToken(token: string) {
    this.cookies.set("token", token);
  }

  getToken(){
    return this.cookies.get("token")
  }

}
