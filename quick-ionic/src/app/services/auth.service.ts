import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

const URLAPI = 'http://localhost:8000/';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  register(user: any): Observable<any> {
    return this.http.post<any>(URLAPI + "accounts/register/", user);
  }

  login(user: any): Observable<any>{
    return this.http.post(URLAPI + 'login/', user);
  }
}
