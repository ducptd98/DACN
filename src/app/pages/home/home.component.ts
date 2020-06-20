import { LocationService } from './../../../api/services/location.service';
import { CategoryService } from './../../../api/services/category.service';
import { Subscription } from 'rxjs';
import { ProductService } from './../../../api/services/product.service';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ToastContainerDirective, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  @ViewChild(ToastContainerDirective, { static: true }) toastContainer: ToastContainerDirective;

  bindDescriptionsToPagetop = 'Tìm kiếm nhà đất, thông tin bất động sản ở từng khu vực trọng điểm';
  mySlideOptions = { items: 1, dots: true, nav: false, autoplay: true, loop: true };
  data = [
    {
      descriptions: '“Leramiz was quick to understand my needs and steer me in the right direction. Their professionalism' +
        'and warmth made the process of finding a suitable home a lot less stressful than it could have been.' +
        'Thanks, agent Tony Holland.”',
      name: 'Stacy Mc',
      title: 'CEP’s Director',
      img: 'review/1.jpg'
    },
    {
      descriptions: '“Leramiz was quick to understand my needs and steer me in the right direction. Their professionalism' +
        'and warmth made the process of finding a suitable home a lot less stressful than it could have been.' +
        'Thanks, agent Tony Holland.”',
      name: 'Stacy Mc Neeley',
      title: 'CEP’s Director',
      img: 'review/1.jpg'
    },
    {
      descriptions: '“Leramiz was quick to understand my needs and steer me in the right direction. Their professionalism' +
        'and warmth made the process of finding a suitable home a lot less stressful than it could have been.' +
        'Thanks, agent Tony Holland.”',
      name: 'Mc Neeley',
      title: 'CEP’s Director',
      img: 'review/1.jpg'
    },
  ];

  products = [];
  Allproducts = [];
  category = [];
  address;
  district;
  subscription: Subscription[] = [];
  cateId = '552d7834298d11583518cd80fa5bd049';

  limit = 25;
  offset = 0;

  constructor(private prodService: ProductService,
              private cateService: CategoryService,
              private toastrService: ToastrService) { }
  ngOnDestroy(): void {
    this.subscription.forEach(item => item.unsubscribe());
  }

  ngOnInit() {
    console.log('HomeComponent -> ngOnInit -> ngOnInit');
    this.getProductByCategory(this.cateId, this.limit, this.offset);
    this.getCategory();
    this.toastrService.overlayContainer = this.toastContainer;
  }

  getProductByCategory(cateId: string, limit: number, offset: number) {
    const prodSub = this.prodService.getProductByCategory(cateId, limit, offset).subscribe(
      res => {
        const data = JSON.parse(res.data);
        this.products = data.map(item => {
          const images = JSON.parse(item.images);
          const desc = JSON.parse(item.desc);
          return Object.assign(item, { images, desc });
        });
      },
      err => console.log('@@@ getProductByCategory', err));
    this.subscription.push(prodSub);
  }
  getCategory() {
    const cateSubscription = this.cateService.getAllNotPaging().subscribe(
      data => {
        this.category = data;
        console.log('HomeComponent -> getCategory -> this.category', this.category);
      },
      err => console.error('@@@ getAllNotPaging err ', err),
    );
    this.subscription.push(cateSubscription);
  }
  click() {
    this.toastrService.success('in div');
  }
  onAddress(e) {
    console.log('onAddress', e);
    this.address = e;
  }
  onDistrict(e) {
    console.log('onDistrict', e);
    this.district = e;
  }
}
