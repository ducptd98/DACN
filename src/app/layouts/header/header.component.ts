import { Router, NavigationStart } from '@angular/router';
import { ChangeDetectionStrategy } from '@angular/compiler/src/core';
import { takeUntil, filter } from 'rxjs/operators';
import { UserService } from './../../../api/services/user.service';
import { IUser } from './../../../api/models/user.model';
import { Subscription, Subject } from 'rxjs';
import { ICategory } from './../../../api/models/category.model';
import { CategoryService } from './../../../api/services/category.service';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {

  @Input() login = false;
  @Input() user: IUser = null;

  loading = false;
  lv1 = new Array<any>();
  lv2 = new Array<any>();

  Rent: ICategory;
  Sale: ICategory;

  selectedItem: ICategory;

  destroy$: Subject<boolean> = new Subject<boolean>();


  constructor(private cateService: CategoryService, private authService: UserService, private router: Router) {
    this.loadData();
  }
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationStart)
    )
      .subscribe((event: NavigationStart) => {
        // You only receive NavigationStart events
        this.getCurUser();
      });
  }

  getCurUser() {
    this.login = this.authService.isAuthenticated();
    const token = this.authService.getToken();
    if (token) {
      this.authService.getUser(token).subscribe(res => {
        console.log('curUser', res);
        this.user = res;
      });
    }
  }

  loadData() {
    this.loading = true;
    // this.loadingBar.start();
    this.cateService.getAllNotPaging().pipe(takeUntil(this.destroy$)).subscribe(
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
  }
  getSaleProduct() {
    this.cateService.getCategoryByParentCategory(this.Sale.url_encode).pipe(takeUntil(this.destroy$)).subscribe(
      data => this.lv1 = data.map(item => {
        const title = item.url_site.split('/')[3];
        return Object.assign(item, { title });
      }),
      err => console.error('@@@ getSaleProduct', err)
    );
  }

  getRentProduct() {
    const cateSubscription = this.cateService.getCategoryByParentCategory(this.Rent.url_encode).pipe(takeUntil(this.destroy$)).subscribe(
      data => this.lv2 = data.map(item => {
        const title = item.url_site.split('/')[3];
        return Object.assign(item, { title });
      }),
      err => console.error('@@@ getRentProduct', err)
    );
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/home']).then(() => window.location.reload());
  }
}
