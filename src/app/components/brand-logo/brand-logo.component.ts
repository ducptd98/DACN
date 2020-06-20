import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-brand-logo',
  templateUrl: './brand-logo.component.html',
  styleUrls: ['./brand-logo.component.scss'],
  // encapsulation: ViewEncapsulation.None
})
export class BrandLogoComponent implements OnInit {

  data = [
    'assets/partner/1.png',
    'assets/partner/2.png',
    'assets/partner/3.png',
    'assets/partner/4.png',
    'assets/partner/5.png',
  ];
  options = {
    items: 4,
    dots: true,
    nav: false,
    autoplay: true,
    loop: true,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 3,
      },
      1000: {
        items: 4,
      }
    }
  };
  constructor() { }

  ngOnInit() {

  }

}
