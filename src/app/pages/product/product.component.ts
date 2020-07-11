import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Subscription, Subject } from 'rxjs';
import { ProductService } from './../../../api/services/product.service';
import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnDestroy {
  loading = true;
  subscription: Subscription[] = [];
  limit = 6;
  offset = 0;
  products = [];
  filterProducts = [];
  curPage = 1;
  cateId = '';
  category = '';
  total = 0;

  filter;

  searchForm: FormGroup;

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private prodService: ProductService,
              private route: ActivatedRoute,
              private router: Router,
              private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      searchTerm: ['']
    });
  }
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
    this.loading = false;
  }

  ngOnInit() {
    this.loading = true;
    const routeSub = this.route.params.pipe(takeUntil(this.destroy$)).subscribe(routerParam => {

      this.cateId = routerParam.cateId;
      if (!routerParam.cateId) {
        this.filter = routerParam.name;
        this.searchProductByName(this.filter, 1);
        this.category = routerParam.category;
      } else {
        this.category = routerParam.category;
        this.getProductByCategory(routerParam.cateId, 25, 0);
      }
    });
  }
  get f() {
    return this.searchForm.controls;
  }

  getById(prodId: string) {
    const prodSub = this.prodService.getProduct(prodId).pipe(takeUntil(this.destroy$)).subscribe(
      data => {
        console.log('@@@ prod by Id', data);


      },
      err => console.log('@@@ getById', err));
  }
  searchProductByName(name, page) {
    this.loading = true;
    const prodSub = this.prodService.searchByName(name, page).pipe(takeUntil(this.destroy$)).subscribe(
      res => {
        const data = JSON.parse(res.data);
        const total = +res.total_record;
        this.products = data.data.map(item => {
          const images = JSON.parse(item.images);
          const desc = JSON.parse(item.desc);
          return Object.assign(item, { images, desc });
        });
        this.total = total;

      },
      err => console.log('@@@ searchProductByName', err),
      () => {
        this.router.navigate([`/product/search`, { name }]);
        this.loading = false;
      });
  }

  getProductByCategory(cateId: string, limit: number, offset: number) {
    this.loading = true;
    const prodSub = this.prodService.getProductByCategory(cateId, limit, offset).pipe(takeUntil(this.destroy$)).subscribe(
      res => {
        const data = JSON.parse(res.data);
        const total = +res.total_record;
        this.products = data.map(item => {
          const images = JSON.parse(item.images);
          const desc = JSON.parse(item.desc);
          return Object.assign(item, { images, desc });
        });
        this.total = total;
      },
      err => console.log('@@@ getProductByCategory', err),
      () => this.loading = false);
  }
  changeCurPage(e) {
    // page 1: off = (1-1)*5 = 0
    // page 2: off = (2-1)*5 = 5
    // page 3: off = (3-1)*5 = 10
    // page 1: off = (1-1)*5 = 0
    const { pageNumber, limit, offset } = e;
    // const pageNumber = e;
    this.offset = (pageNumber - 1) * this.limit;
    this.curPage = pageNumber;
    if (this.f.searchTerm.value === '') {
      this.getProductByCategory(this.cateId, this.limit, this.offset);
    } else {
      // const begin = this.limit * (pageNumber - 1);
      // const end = begin + 6;
      // this.filterProducts = this.products.slice(begin, end);
      this.searchProductByName(this.f.searchTerm.value, this.curPage);
    }
    // this.getProductByCategory(this.cateId, this.limit, this.offset);
  }
  search({ value, valid }) {
    if (this.f.searchTerm.value !== '') {
      this.searchProductByName(value.searchTerm, this.curPage);
    } else {
      this.getProductByCategory(this.cateId, this.limit, this.offset);
    }
  }
}
