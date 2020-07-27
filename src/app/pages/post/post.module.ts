import { OwlModule } from 'ngx-owl-carousel';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ResponseInterceptorService } from './../../utilities/response-interceptor.service';
import { CommentComponent } from './../../components/comment/comment.component';
import { ArticleComponent } from './../../components/article/article.component';
import { SharedModule } from './../../shared/shared.module';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { PostComponent } from './post.component';
import { NgModule, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostRoutingModule } from './post-routing.module';
import { NgbTabsetModule, NgbModalModule, NgbDropdown, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import {CKEditorModule} from '@ckeditor/ckeditor5-angular';



@NgModule({
  declarations: [
    PostComponent,
    PostDetailComponent,
    ArticleComponent,
    CommentComponent,
  ],
  imports: [
    CommonModule,
    PostRoutingModule,
    SharedModule,
    NgbTabsetModule,
    ReactiveFormsModule,
    NgbModalModule,
    OwlModule,
    NgbDropdownModule,
    CKEditorModule,
    FormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: forwardRef(() => ResponseInterceptorService),
      multi: true
    },
  ]
})
export class PostModule { }
