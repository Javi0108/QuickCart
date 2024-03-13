import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  isSidebar: boolean = false;
  constructor() { }

  ngOnInit() {
  }

  openSidebar() {
    this.isSidebar = this.isSidebar ? false : true;
  }
}
