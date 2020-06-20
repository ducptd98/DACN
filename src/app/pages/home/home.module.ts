import { PageTopComponent } from './../../components/page-top/page-top.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LocationService } from './../../../api/services/location.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CategoryService } from './../../../api/services/category.service';
import { ProductService } from './../../../api/services/product.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { Routes, RouterModule } from '@angular/router';
import { FilterSectionComponent } from 'src/app/components/filter-section/filter-section.component';
import { PropertyCardComponent } from 'src/app/components/property-card/property-card.component';
import { OwlModule } from 'ngx-owl-carousel';
import { SharedModule } from 'src/app/shared/shared.module';
import HttpConfigInterceptor from 'src/app/utilities/httpconfig.interceptor';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
];

@NgModule({
  declarations: [
    HomeComponent,
    FilterSectionComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    OwlModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    ProductService,
    CategoryService,
    LocationService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true }
  ]
})
export class HomeModule { }
