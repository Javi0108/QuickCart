import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const refreshToken = localStorage.getItem('token_refresh'); // Corregir la obtención del refresh token
    
    if (refreshToken && this.authService.isAccessTokenExpired()) {
      // Token de acceso caducado, renovarlo
      return this.authService.refreshToken(refreshToken).pipe( // Corregir el uso de refreshToken
        switchMap((response) => {
          // Actualizar el token de acceso en el almacenamiento local
          localStorage.setItem('token', response.access);
          // Clonar la solicitud original y agregar el nuevo token de acceso
          const newRequest = request.clone({
            setHeaders: {
              Authorization: `Bearer ${response.access}`
            }
          });
          // Procesar la solicitud clonada
          return next.handle(newRequest);
        })
      );
    } else {
      // Token de acceso válido, continuar con la solicitud original
      return next.handle(request);
    }
  }
}