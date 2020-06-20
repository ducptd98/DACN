import { PageTopComponent } from './../../components/page-top/page-top.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CategoryService } from './../../../api/services/category.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { OwlModule } from 'ngx-owl-carousel';
import { CategoryComponent } from './category.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import HttpConfigInterceptor from 'src/app/utilities/httpconfig.interceptor';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: CategoryComponent
      }
    ]
  }
];

@NgModule({
  declarations: [
    CategoryComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    OwlModule,
    SharedModule
  ],
  providers: [
    CategoryService,
    // { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true }
  ]
})
export class CategoryModule { }
