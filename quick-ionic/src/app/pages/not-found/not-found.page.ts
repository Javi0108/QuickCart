import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.page.html',
  styleUrls: ['./not-found.page.scss'],
})
export class NotFoundPage implements OnInit {

  @ViewChild('torch', { static: true }) torchElement!: ElementRef;
  countdown: number = 5;

  constructor() { }

  ngOnInit() {
    document.addEventListener('mousemove', (event) => {
      const torch = this.torchElement.nativeElement as HTMLElement;
      torch.style.top = event.clientY + 'px';
      torch.style.left = event.clientX + 'px';
    });

    setTimeout(() => {
      this.startCountdown();
    }, 5000);
  }

  startCountdown() {
    const countdownInterval = setInterval(() => {
      this.countdown--;
      if (this.countdown <= 0) {
        clearInterval(countdownInterval);
      }
    }, 1000);
  }

}
