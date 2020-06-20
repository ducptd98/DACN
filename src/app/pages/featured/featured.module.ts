import { PageTopComponent } from './../../components/page-top/page-top.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FeaturedCardComponent } from 'src/app/components/featured-card/featured-card.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeaturedComponent } from './featured.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
// import { BreadcrumbComponent } from 'src/app/components/breadcrumb/breadcrumb.component';
import { FeaturedDetailComponent } from './featured-detail/featured-detail.component';
import { OwlModule } from 'ngx-owl-carousel';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: FeaturedComponent
      },
      {
        // path: ':id',
        path: 'detail',
        component: FeaturedDetailComponent,
        data: { breadcrumb: 'Featured Detail' },
      }
    ]
  }
];


@NgModule({
  declarations: [
    FeaturedComponent,
    // BreadcrumbComponent,
    FeaturedDetailComponent,
    FeaturedCardComponent,
  ],
  imports: [
    CommonModule,
    OwlModule,
    RouterModule.forChild(routes),
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class FeaturedModule { }
