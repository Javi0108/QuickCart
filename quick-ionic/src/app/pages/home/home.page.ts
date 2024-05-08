import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild(IonContent) content!: IonContent;
  
  constructor() { }

  ngOnInit() {
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return token !== null;
  }

  scrollToElement(elementId: string): void {
    const element = document.getElementById(elementId);
    if (element) {
      const yOffset = element.offsetTop;
      this.content.scrollToPoint(0, yOffset, 1000);
    }
  }

  stopPropagation(event: Event): void {
    event.stopPropagation();
  }

}
