import {FormGroup, Validators, FormBuilder} from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ToastrService} from 'ngx-toastr';
import {UserService} from './../../../../api/services/user.service';
import {IUser} from './../../../../api/models/user.model';
import {IPost} from './../../../../api/models/post.model';
import {takeUntil} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {Subject} from 'rxjs';
import {PostService} from './../../../../api/services/post.service';
import {Component, OnInit, OnDestroy, AfterContentInit, AfterViewInit} from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

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

  postForm: FormGroup;

  public config = {
    language: 'vn',
    placeholder: 'Nhập nội dung!'
  };
  public Editor = ClassicEditor;

  constructor(private postService: PostService,
              private route: ActivatedRoute,
              private router: Router,
              private fb: FormBuilder,
              private userService: UserService,
              private toastrService: ToastrService,
              private modalService: NgbModal) {
    this.postForm = this.fb.group({
      title: ['', [Validators.required]],
      tag: ['', []],
      content: ['', []]
    });
  }

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


  get f() {
    return this.postForm.controls;
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
      this.f.title.setValue(this.post.title);
      this.f.tag.setValue(this.post.tag);
      this.f.content.setValue(JSON.stringify(this.post.content));

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
      }, e => console.log(e), () => {
        this.loading = false;
      }
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
    this.modalService.open(content, {centered: true, size: 'lg'});
  }

  closeModal() {
    this.modalService.dismissAll();
  }

  deletePost() {
    this.postService.deletePost(this.post.id).pipe(takeUntil(this.destroy$)).subscribe(data => {
      this.toastrService.success('Xóa thành công', 'Thành công');
      this.closeModal();
      this.router.navigate(['/post']);
    });
  }

  updatedPost() {
    const image = this.isArray(this.post.content) ? this.post.content[1] : '';
    const content = [];
    if (this.isArray(this.post.content)) {
      content.push(this.f.content.value);
      content.push(image);
    }
    const updated = Object.assign({}, this.post, {content}, {title: this.f.title.value}, {tag: this.f.tag.value});

    if (this.postForm.invalid) {
      this.toastrService.error('lỗi form', 'Lỗi');
      this.closeModal();
      return;
    }

    this.postService.updatePost(updated).pipe(takeUntil(this.destroy$)).subscribe(data => {
      this.toastrService.success('Sửa thành công', 'Thành công');
      this.getPost(this.postId);
      this.closeModal();
    });
  }
}