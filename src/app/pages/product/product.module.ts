import { ResponseInterceptorService } from './../../utilities/response-interceptor.service';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PageTopComponent } from './../../components/page-top/page-top.component';
import { FacebookCustomService } from './../../../api/services/facebook-custom.service';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ProductService } from './../../../api/services/product.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { OwlModule } from 'ngx-owl-carousel';
import { NgModule, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FacebookModule, FacebookService } from 'ngx-facebook';

import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';
import HttpConfigInterceptor from 'src/app/utilities/httpconfig.interceptor';
import { ProductDetailComponent } from './product-detail/product-detail.component';


@NgModule({
  declarations: [
    ProductComponent,
    ProductDetailComponent,
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    OwlModule,
    SharedModule,
    ReactiveFormsModule,
    FacebookModule.forRoot(),
    NgbModule
  ],
  providers: [
    ProductService,
    FacebookCustomService,
    FacebookService,
    NgbModal,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: forwardRef(() => ResponseInterceptorService),
      multi: true
    },
  ]
})
export class ProductModule { }
