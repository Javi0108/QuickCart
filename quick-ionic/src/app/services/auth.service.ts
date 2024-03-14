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

  register(username: string, password: string, email: string, name: string, type: string) {
    return this.http.post<any>('http://localhost:8000/accounts/register/', { username, password, email, name, type });
  }

  login(user: any): Observable<any>{
    return this.http.post(URLAPI + 'login/', user);
  }
}
