import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CookieService } from "ngx-cookie-service";

const URLAPI = 'http://localhost:8000/api/';

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

  getUser(id: any) {
    return this.http.get(URLAPI+"accounts/profile/", id)
  }

}
