import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.page.html',
  styleUrls: ['./not-found.page.scss'],
})
export class NotFoundPage implements OnInit {
  @ViewChild('torch', { static: true }) torchElement!: ElementRef;


  constructor() { }

  ngOnInit() {
    document.addEventListener('mousemove', (event) => {
      const torch = this.torchElement.nativeElement as HTMLElement;
      torch.style.top = event.clientY + 'px';
      torch.style.left = event.clientX + 'px';
    });
  }

}
