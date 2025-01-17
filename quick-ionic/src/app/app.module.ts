import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FooterPageModule } from './components/footer/footer.module';
import { MenuPageModule } from './components/menu/menu.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CookieService } from "ngx-cookie-service";
import { TokenInterceptor } from './interceptors/token.interceptor';
import { ReactiveFormsModule } from '@angular/forms';
// import { AngularFireModule } from 'angularfire2';
// import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    FooterPageModule,
    MenuPageModule,
    HttpClientModule,
    ReactiveFormsModule,
    // AngularFireModule,
    // AngularFireModule.initializeApp(environment.firebaseConfig),
  ],
  providers: [
    CookieService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true } // Registra el interceptor aquí
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
