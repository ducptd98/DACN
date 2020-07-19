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

  curUser: IUser;

  constructor(private postService: PostService, private userService: UserService) { }

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
    this.postService.getPosts(this.curPage).pipe(
      takeUntil(this.destroy$)
    ).subscribe(res => {
      console.log('getAllPost', res);
      this.posts = res;
      this.totalGlobalPost = this.posts.length;
      this.posts = this.posts.slice(this.offset, this.offset + this.limit);
    });
  }
  getAllPostOfCurUser() {
    this.userService.getPostsByUser(this.curUser.id).subscribe(res => {
      console.log('mypost', res);

      this.myPosts = res;
      this.totalMyPost = this.myPosts.length;
      this.myPosts = this.myPosts.slice(this.offset, this.offset + this.limit);
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

  getPostsByTag(tag) {
    this.activeTab = 'global';
    this.postService.getPostsBytag(tag).pipe(takeUntil(this.destroy$)).subscribe(data => {
      console.log('PostComponent -> getPostsByTag -> data', data);
      this.posts = data;
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
}
