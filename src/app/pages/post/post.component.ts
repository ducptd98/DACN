import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { IUser } from './../../../api/models/user.model';
import { UserService } from './../../../api/services/user.service';
import { IPost } from './../../../api/models/post.model';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { PostService } from './../../../api/services/post.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit, OnDestroy {
  activeTab = 'my';
  destroy$: Subject<boolean> = new Subject<boolean>();

  tags: string[] = [];
  posts: IPost[] = [];
  myPosts: IPost[] = [];

  totalGlobalPost = 0;
  totalMyPost = 0;

  limit = 6;
  offset = 0;
  curPage = 1;
  loading = false;

  curUser: IUser;
  postForm: FormGroup;
  searchForm: FormGroup;

  constructor(private postService: PostService,
              private userService: UserService,
              private fb: FormBuilder,
              private router: Router,
              private modalService: NgbModal) {
    this.postForm = this.fb.group({
      title: ['', [Validators.required]],
      tag: ['', []],
      content: ['', []]
    });
    this.searchForm = this.fb.group({
      searchTerm: ['']
    });
  }
  get f() {
    return this.searchForm.controls;
  }
  get fPost() {
    return this.postForm.controls;
  }

  ngOnInit() {
    // this.curUser = this.userService.curUser;
    this.getCurUser();
    this.getAllPost();
    this.getAllTags();
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    // Unsubscribe from the subject
    this.destroy$.unsubscribe();
  }
  getCurUser() {
    const token = this.userService.getToken();
    if (token) {
      this.userService.getUser(token).subscribe(res => {
        this.curUser = res;
        this.getAllPostOfCurUser();
      });
    }
  }
  tabChange(e) {
    console.log(e);
    this.activeTab = e.nextId;
    this.limit = 6;
    this.offset = 0;
    this.curPage = 1;
    // tslint:disable-next-line:no-unused-expression
    this.activeTab === 'my' && this.curUser ? this.getAllPostOfCurUser() : this.getAllPost();
  }
  getAllPost() {
    this.loading = true;
    this.postService.getPosts(this.curPage).pipe(
      takeUntil(this.destroy$)
    ).subscribe(res => {
      console.log('getAllPost', res);
      this.posts = res.data;
      this.totalGlobalPost = res.total;
      this.loading = false;
    });
  }
  getAllPostOfCurUser() {
    this.loading = true;
    this.userService.getPostsByUser(this.curUser.id).subscribe(res => {
      console.log('mypost', res);
      this.loading = false;
      this.myPosts = res;
      this.totalMyPost = this.myPosts.length;
    });
  }

  getAllTags() {
    this.postService.getAllTag().pipe(takeUntil(this.destroy$)).subscribe(
      data => {
        console.log('get all tag', data);

        this.tags = data;
      }
    );
  }

  searchPost() {
    const userId = this.activeTab === 'my' ? this.curUser.id : null;
    this.postService.searchPost(this.f.searchTerm.value, userId).pipe(takeUntil(this.destroy$)).subscribe(res => {
      console.log('PostComponent -> searchPost -> data', res.data);
      if (this.activeTab === 'my') {
        this.myPosts = res.data;
        this.totalMyPost = res.total;
      } else {
        this.posts = res.data;
        this.totalGlobalPost = res.total;
      }
      // this.f.searchTerm.setValue(null);
    });
  }

  getPostsByTag(tag) {
    this.activeTab = 'global';
    this.postService.getPostsByTag(tag).pipe(takeUntil(this.destroy$)).subscribe(data => {
      console.log('PostComponent -> getPostsByTag -> data', data);
      this.posts = data;
      this.totalGlobalPost = this.posts.length;
    });
  }
  changeCurPage(e) {
    // page 1: off = (1-1)*5 = 0
    // page 2: off = (2-1)*5 = 5
    // page 3: off = (3-1)*5 = 10
    // page 1: off = (1-1)*5 = 0
    const { pageNumber, limit, offset } = e;
    console.log('PostComponent -> changeCurPage -> pageNumber', pageNumber);
    // const pageNumber = e;
    this.offset = (pageNumber - 1) * this.limit;
    this.curPage = pageNumber;
    this.getAllPost();
    this.getAllPostOfCurUser();
  }
  search({ value, valid }, tab) {
    // if (tab === 'my') {
    //   this.getAllPostOfCurUser();
    // } else {
    //   this.getAllPost();
    // }
    this.searchPost();
  }
  openModal(content) {
    this.modalService.open(content, { centered: true });
  }
  closeModal() {
    this.modalService.dismissAll();
  }
  createPost() {
    if (this.postForm.invalid) {
      console.log('error');
      return;
    }
    const post: IPost = {
      id: null,
      title: this.fPost.title.value,
      content: JSON.stringify(this.fPost.content.value),
      like: 0,
      tag: this.fPost.tag.value,
      created_at: null,
      updated_at: null,
      user_id: this.userService.curUser.id,
      link: null,
      comments: [],
      user: null
    };
    this.postService.createPost(post).pipe(takeUntil(this.destroy$)).subscribe(res => {
      console.log('createPost', res);
      this.router.navigate(['/post/' + res.id]);
      this.closeModal();
    });
  }
}
