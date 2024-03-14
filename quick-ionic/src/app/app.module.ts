import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FooterPageModule } from './components/footer/footer.module';
import { MenuPageModule } from './components/menu/menu.module';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from "ngx-cookie-service";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, FooterPageModule, MenuPageModule, HttpClientModule],
  providers: [CookieService, { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
