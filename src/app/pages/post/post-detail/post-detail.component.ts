import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { UserService } from './../../../../api/services/user.service';
import { IUser } from './../../../../api/models/user.model';
import { IPost } from './../../../../api/models/post.model';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(private postService: PostService,
              private route: ActivatedRoute,
              private router: Router,
              private userService: UserService,
              private toastrService: ToastrService,
              private modalService: NgbModal) { }

  ngOnInit() {
    const routeSub = this.route.params.pipe(
      takeUntil(this.destroy$)
    ).subscribe(routerParam => {

      const postId = routerParam.id;
      this.postId = +postId;
      console.log('routerParam', this.postId);
      this.isLogin = this.userService.isAuthenticated();
      this.getPost(this.postId);
      this.getCurUser();
    });
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    // Unsubscribe from the subject
    this.destroy$.unsubscribe();
  }
  isArray(value) {
    return Array.isArray(value);
    // return typeof value;
  }
  getPost(id) {
    this.loading = true;
    this.postService.getPost(id).pipe(
      takeUntil(this.destroy$)
    ).subscribe(res => {
      this.post = res;
      console.log('PostDetailComponent -> getPost -> res', res);
      this.loading = false;
    }, e => console.log(e));
  }
  getCurUser() {
    this.loading = true;
    const token = this.userService.getToken();
    if (token) {
      this.userService.getUser(token).subscribe(res => {
        this.user = res;
        console.log('PostDetailComponent -> getCurUser -> res', res);
        this.loading = false;
      });
    }
  }
  refresh(event) {
    console.log('refresh');
    // this.loading = true;
    this.postService.getPost(this.postId).pipe(
      takeUntil(this.destroy$)
    ).subscribe(res => {
      this.post = res;
      console.log('PostDetailComponent -> refresh -> res', res);
    }, e => console.log(e), () => { this.loading = false; }
    );
  }

  handleLike() {
    this.post.like++;
    this.postService.updatePost(this.post).pipe(takeUntil(this.destroy$)).subscribe(
      data => {
        console.log('update post', data);
      }
    );
  }

  openModal(content) {
    this.modalService.open(content, { centered: true });
  }
  closeModal() {
    this.modalService.dismissAll();
  }

  deletePost() {
    this.postService.deletePost(this.post.id).subscribe(data => {
      this.toastrService.success('Xóa thành công', 'Thành công');
      this.closeModal();
      this.router.navigate(['/post']);
    });
  }
}
