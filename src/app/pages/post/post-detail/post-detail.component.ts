import { UserService } from './../../../../api/services/user.service';
import { IUser } from './../../../../api/models/user.model';
import { IPost } from './../../../../api/models/post.model';
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
  post: IPost;
  user: IUser;
  loading = false;
  isLogin = false;

  postId: number;

  constructor(private postService: PostService, private route: ActivatedRoute, private userService: UserService) { }

  ngOnInit() {
    const routeSub = this.route.params.pipe(
      takeUntil(this.destroy$)
    ).subscribe(routerParam => {
      const postId = routerParam.id;
      this.postId = postId;
      this.isLogin = this.userService.isAuthenticated();
      this.getPost(postId);
    });
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    // Unsubscribe from the subject
    this.destroy$.unsubscribe();
  }
  getPost(id) {
    this.loading = true;
    this.postService.getPost(id).pipe(
      takeUntil(this.destroy$)
    ).subscribe(res => {
      this.post = res;
      if (res.user) {
        this.user = res.user;
      }
      console.log('PostDetailComponent -> getPost -> res', res);
    }, e => console.log(e), () => { this.loading = false; }
    );
  }
  getComments() {

  }
  refresh(event) {
    console.log('refresh');

    this.postService.getPost(this.postId).pipe(
      takeUntil(this.destroy$)
    ).subscribe(res => {
      this.post = res;
      if (res.user) {
        this.user = res.user;
      }
      console.log('PostDetailComponent -> getPost -> res', res);
    }, e => console.log(e), () => { this.loading = false; }
    );
  }
}
