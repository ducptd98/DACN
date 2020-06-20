import { ProductService } from './../../../../api/services/product.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  data = [
    {
      img: 'assets/single-list-slider/1.jpg',
      caption: 'FOR SALE'
    },
    {
      img: 'assets/single-list-slider/2.jpg',
      caption: 'FOR SALE'
    },
    {
      img: 'assets/single-list-slider/3.jpg',
      caption: 'FOR RENT'
    },
    {
      img: 'assets/single-list-slider/4.jpg',
      caption: 'FOR SALE'
    },
    {
      img: 'assets/single-list-slider/5.jpg',
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
  subscription: Subscription[] = [];
  product: any;
  productRelated = [];
  loading = true;

  constructor(private route: ActivatedRoute, private productSer: ProductService) { }
  ngOnDestroy(): void {
    this.subscription.forEach(item => item.unsubscribe());
  }

  ngOnInit() {
    const routeSub = this.route.params.subscribe(routerParam => {
      const productId = routerParam.productId;
      const category = routerParam.category;
      this.getProduct(productId);
    });
    this.subscription.push(routeSub);
  }

  getProduct(productId) {
    const prodSub = this.productSer.getProduct(productId).subscribe(
      res => {
        const data = JSON.parse(res.data);
        console.log('product', data[0]);
        const productRes = data[0];
        const images = JSON.parse(productRes.images);
        const desc = JSON.parse(productRes.desc);
        const addressDetail = productRes.address.split('tại')[1];
        const url = 'https://www.batdongsan.com.vn/' + productRes.url.split('/')[3];
        const product = Object.assign(productRes, { images, desc, addressDetail, url });
        this.product = product;
        console.log('ProductDetailComponent -> getProduct -> this.product', this.product);
        this.loading = false;
      },
      err => console.log('@@@ getProductByCategory', err),
      () => this.getProductRelated(this.product.addressDetail.split('-')[1]));
    this.subscription.push(prodSub);
  }
  getProductRelated(location) {
    const prodSub = this.productSer.getProductByLocation(location).subscribe(
      res => {
        const response = JSON.parse(res.data);
        const data = response.data;
        console.log('getProductRelated', response);

        const rnd = this.getRndInteger(0, data.length);
        const products = data.slice(rnd, rnd + 3).map(item => {
          const images = JSON.parse(item.images);
          const desc = JSON.parse(item.desc);
          return Object.assign(item, { images, desc });
        });
        this.productRelated = products;
      },
      err => console.log('@@@ getProductRelated', err));
    this.subscription.push(prodSub);
  }
  getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
}
