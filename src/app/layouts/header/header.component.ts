import { Subscription } from 'rxjs';
import { ICategory } from './../../../api/models/category.model';
import { CategoryService } from './../../../api/services/category.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  loading = false;
  lv1 = new Array<any>();
  lv2 = new Array<any>();

  Rent: ICategory;
  Sale: ICategory;

  selectedItem: ICategory;

  subscription: Subscription[] = [];

  constructor(private cateService: CategoryService) {
    this.loadData();
  }
  ngOnDestroy(): void {
    this.subscription.forEach(item => item.unsubscribe());
  }

  ngOnInit() {
  }
  loadData() {
    this.loading = true;
    // this.loadingBar.start();
    const cateSubscription = this.cateService.getAllNotPaging().subscribe(
      data => {
        data.forEach(item => {
          if (item.parent_category === null) {
            if (item.category1 === 'Nhà đất bán') {
              this.Sale = item;
            } else {
              this.Rent = item;
            }
          }
        });
        // this.loadingBar.complete();
        this.loading = false;
      },
      err => console.error('@@@ getAllNotPaging err ', err),
      () => {
        this.getSaleProduct();
        this.getRentProduct();
      }
    );
    this.subscription.push(cateSubscription);
  }
  getSaleProduct() {
    const cateSubscription = this.cateService.getCategoryByParentCategory(this.Sale.url_encode).subscribe(
      data => this.lv1 = data.map(item => {
        const title = item.url_site.split('/')[3];
        return Object.assign(item, { title });
      }),
      err => console.error('@@@ getSaleProduct', err)
    );
    this.subscription.push(cateSubscription);
  }

  getRentProduct() {
    const cateSubscription = this.cateService.getCategoryByParentCategory(this.Rent.url_encode).subscribe(
      data => this.lv2 = data.map(item => {
        const title = item.url_site.split('/')[3];
        return Object.assign(item, { title });
      }),
      err => console.error('@@@ getRentProduct', err)
    );
    this.subscription.push(cateSubscription);
  }
}
