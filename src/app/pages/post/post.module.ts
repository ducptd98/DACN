import { CommentComponent } from './../../components/comment/comment.component';
import { ArticleComponent } from './../../components/article/article.component';
import { SharedModule } from './../../shared/shared.module';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { PostComponent } from './post.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostRoutingModule } from './post-routing.module';
import { NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    PostComponent,
    PostDetailComponent,
    ArticleComponent,
    CommentComponent
  ],
  imports: [
    CommonModule,
    PostRoutingModule,
    SharedModule,
    NgbTabsetModule
  ]
})
export class PostModule { }
