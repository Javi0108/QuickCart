import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Profile } from '../interfaces/profile.interface';


@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private baseURL = "http://localhost:8000/api/accounts/profile/";
  private token: string | null;


  constructor(private http: HttpClient, private authService: AuthService, private cookies: CookieService) {
    this.token = localStorage.getItem('token');
  }

  getProfile(): Observable<any> {
    return this.http.get<Profile>(`${this.baseURL}`, { headers: this.getHeaders() });
  }

  editProfile(profile: Profile): Observable<any>{
    return this.http.post<Profile>(`${this.baseURL}`, profile ,{headers: this.getHeaders()});
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