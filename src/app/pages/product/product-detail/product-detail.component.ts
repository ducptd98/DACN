import { UserService } from './../../../../api/services/user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IPost } from './../../../../api/models/post.model';
import { PostService } from './../../../../api/services/post.service';
import { FacebookService, InitParams, UIResponse, UIParams } from 'ngx-facebook';
import { ProductService } from './../../../../api/services/product.service';
import { Subscription, fromEvent, Observable, Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { startWith, map, takeUntil } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  // data = [
  //   {
  //     img: 'assets/single-list-slider/1.jpg',
  //     caption: 'FOR SALE'
  //   },
  //   {
  //     img: 'assets/single-list-slider/2.jpg',
  //     caption: 'FOR SALE'
  //   },
  //   {
  //     img: 'assets/single-list-slider/3.jpg',
  //     caption: 'FOR RENT'
  //   },
  //   {
  //     img: 'assets/single-list-slider/4.jpg',
  //     caption: 'FOR SALE'
  //   },
  //   {
  //     img: 'assets/single-list-slider/5.jpg',
  //     caption: 'FOR RENT'
  //   },
  // ];
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
  product: any;
  productRelated = [];
  loading = true;
  isLogin = false;
  currentUrl = '';
  isScreenSmall$: Observable<any>;

  destroy$: Subject<boolean> = new Subject<boolean>();

  postForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private productSer: ProductService,
              private userService: UserService,
              private fb: FormBuilder,
              private postService: PostService,
              private modalService: NgbModal) {
    this.currentUrl = window.location.href;
    this.postForm = this.fb.group({
      title: ['', [Validators.required]],
      tag: ['', []]
    });
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    // Unsubscribe from the subject
    this.destroy$.unsubscribe();
  }

  ngOnInit() {
    // Checks if screen size is less than 1024 pixels
    const checkScreenSize = () => document.body.offsetWidth > 1238;

    // Create observable from window resize event throttled so only fires every 500ms
    const screenSizeChanged$ = fromEvent(window, 'resize').pipe(takeUntil(this.destroy$), map(checkScreenSize));

    // Start off with the initial value use the isScreenSmall$ | async in the
    // view to get both the original value and the new value after resize.
    this.isScreenSmall$ = screenSizeChanged$.pipe(startWith(checkScreenSize()));
    const routeSub = this.route.params.subscribe(routerParam => {
      const productId = routerParam.productId;
      const category = routerParam.category;
      this.getProduct(productId);
      this.isLogin = this.userService.isAuthenticated();
    });
  }
  private handleError(error) {
    console.error('Error processing action', error);
  }

  getProduct(productId) {
    const prodSub = this.productSer.getProduct(productId).pipe(takeUntil(this.destroy$)).subscribe(
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
  }
  getProductRelated(location) {
    const prodSub = this.productSer.getProductByLocation(location).pipe(takeUntil(this.destroy$)).subscribe(
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
  }
  getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
  openModal(content) {
    this.modalService.open(content, { centered: true });
  }
  closeModal() {
    this.modalService.dismissAll();
  }
  createPost() {
    if (this.postForm.invalid) {
      console.log('error');
      return;
    }
    const content = [];
    content.push(this.product.desc);
    content.push(this.product.images);
    const post: IPost = {
      id: null,
      title: this.postForm.value.title,
      content: JSON.stringify(content),
      like: 0,
      tag: this.postForm.value.tag,
      created_at: null,
      updated_at: null,
      user_id: this.userService.curUser.id,
      link: window.location.href,
      comments: [],
      user: null
    };
    this.postService.createPost(post).pipe(takeUntil(this.destroy$)).subscribe(res => {
      console.log('createPost', res);
      this.router.navigate(['/post/' + res.id]);
      this.closeModal();
    });
  }
}
