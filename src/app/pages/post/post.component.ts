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

  constructor(private postService: PostService) { }

  ngOnInit() {
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
    this.postService.getPosts().pipe(
      takeUntil(this.destroy$)
    ).subscribe(res => {
      console.log('getAllPost', res);
    });
  }
}
