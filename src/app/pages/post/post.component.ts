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
  posts: IPost[] = [];
  myPosts: IPost[] = [];

  limit = 6;
  offset = 0;
  curPage = 1;
  total = 0;

  curUser: IUser;

  constructor(private postService: PostService, private userService: UserService) { }

  ngOnInit() {
    this.curUser = this.userService.curUser;
    this.getAllPost();
    this.getAllPostOfCurUser();
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    // Unsubscribe from the subject
    this.destroy$.unsubscribe();
  }
  tabChange(e) {
    console.log(e);
    this.activeTab = e.nextId;
  }
  getAllPost() {
    this.postService.getPosts(this.curPage).pipe(
      takeUntil(this.destroy$)
    ).subscribe(res => {
      console.log('getAllPost', res);
      this.posts = res;
    });
  }
  getAllPostOfCurUser() {
    this.userService.getPostsByUser(this.curUser.id).subscribe(res => {
      this.myPosts = res;
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
  }
}
