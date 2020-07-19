import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from './../../../api/services/product.service';
import { Subject } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-featured',
  templateUrl: './featured.component.html',
  styleUrls: ['./featured.component.scss']
})
export class FeaturedComponent implements OnInit, OnDestroy {
  searchTerm = '';
  loading = false;
  limit = 6;
  offset = 0;
  curPage = 1;

  products = [];
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

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
    this.loading = false;
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
      },
      err => console.log('@@@ searchProductByName', err),
      () => {
        this.router.navigate([`/product/search`, { name }]);
        this.loading = false;
      });
  }

  getProductFavourite() {

  }

  search({ value, valid }) {
    if (this.f.searchTerm.value !== '') {
      this.searchProductByName(value.searchTerm, this.curPage);
    } else {
      this.getProductFavourite();
    }
  }

}
