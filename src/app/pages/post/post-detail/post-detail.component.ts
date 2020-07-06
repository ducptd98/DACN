import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { PostService } from './../../../../api/services/post.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit, OnDestroy {

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private postService: PostService, private route: ActivatedRoute) { }

  ngOnInit() {
    const routeSub = this.route.params.subscribe(routerParam => {
      const postId = routerParam.productId;
      this.getPost(postId);
    });
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    // Unsubscribe from the subject
    this.destroy$.unsubscribe();
  }
  getPost(id) {
    this.postService.getPost(id).pipe(
      takeUntil(this.destroy$)
    ).subscribe(res => {
      console.log('get Detail', res);
    });
  }
}
