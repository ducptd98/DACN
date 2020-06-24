import { PostDetailComponent } from './post-detail/post-detail.component';
import { PostComponent } from './post.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: PostComponent
      },
      {
        path: ':id',
        component: PostDetailComponent,
        data: { breadcrumb: 'Chi tiết' },
      },
      {
        path: 'search',
        component: PostComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostRoutingModule { }
