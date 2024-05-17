import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Profile } from '../interfaces/profile.interface';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private baseURL = environment.backend + "/api/accounts/profile/";
  private token: string | null;


  constructor(private http: HttpClient, private authService: AuthService, private cookies: CookieService) {
    this.token = localStorage.getItem('token');
  }

  getProfile(): Observable<any> {
    return this.http.get<Profile>(`${this.baseURL}`, { headers: this.getHeadersGet() });
  }

  getProfileById(profileId: number): Observable<any> {
    return this.http.get<Profile>(`${this.baseURL}${profileId}/`, { headers: this.getHeadersGet() });
  }

  putEditProfile(formData: FormData): Observable<any> {
    return this.http.put<Profile>(`${this.baseURL}`, formData, { headers: this.getHeadersPut() });
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

  private getHeadersPut(): HttpHeaders {
    let headers = new HttpHeaders();
    if (this.token) {
      headers = headers.set('Authorization', `Bearer ${this.token}`);
    }
    return headers;
  }

}