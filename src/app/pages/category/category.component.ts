import { Subscription } from 'rxjs';
import { ICategory } from './../../../api/models/category.model';
import { CategoryService } from './../../../api/services/category.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoadingBarService } from '@ngx-loading-bar/core';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit, OnDestroy {
  lstCate = new Array<ICategory>();
  filterCase = new Array<ICategory>();
  loading = true;
  curPage = 1;

  subscription: Subscription[] = [];

  constructor(private cateService: CategoryService, private loadingBar: LoadingBarService) {
  }
  ngOnDestroy(): void {
    this.subscription.forEach(item => item.unsubscribe());
  }

  ngOnInit() {
    this.loading = true;
    this.loadData();
  }
  loadData() {
    this.loading = true;
    // this.loadingBar.start();
    const cateSub = this.cateService.getAllNotPaging().subscribe(
      data => {
        data.forEach(item => this.lstCate.push(item));
        // this.loadingBar.complete();
      },
      err => console.error('@@@ getAllNotPaging err ', err),
      () => { this.filterCase = this.lstCate.slice(0, 6); this.loading = false; }
    );
    this.subscription.push(cateSub);
  }

  changeCurPage(e) {
    const { pageNumber, limit, offset } = e;
    // const pageNumber = e;
    const begin = 6 * (pageNumber - 1);
    this.curPage = pageNumber;
    const end = begin + 6;
    this.filterCase = this.lstCate.slice(begin, end);

  }
}
