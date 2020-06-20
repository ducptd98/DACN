import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-featured-detail',
  templateUrl: './featured-detail.component.html',
  styleUrls: ['./featured-detail.component.scss']
})
export class FeaturedDetailComponent implements OnInit {

  data = [
    {
      img: '../../../../assets/single-list-slider/1.jpg',
      caption: 'FOR SALE'
    },
    {
      img: '../../../../assets/single-list-slider/2.jpg',
      caption: 'FOR SALE'
    },
    {
      img: '../../../../assets/single-list-slider/3.jpg',
      caption: 'FOR RENT'
    },
    {
      img: '../../../../assets/single-list-slider/4.jpg',
      caption: 'FOR SALE'
    },
    {
      img: '../../../../assets/single-list-slider/5.jpg',
      caption: 'FOR RENT'
    },
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
