import { IPost } from './../../../api/models/post.model';
import { IUser } from './../../../api/models/user.model';
import { IComment } from './../../../api/models/comment.model';
import { CommentService } from './../../../api/services/comment.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  @Input() isPost = true;
  @Input() post: IPost;
  @Input() user: IUser;
  @Input() contentValue = '';
  @Input() cmtId: number;

  @Output() commentSubmit: EventEmitter<any> = new EventEmitter<any>();
  @Output() commentRemove: EventEmitter<any> = new EventEmitter<any>();



  constructor(private cmtService: CommentService) { }

  ngOnInit() {
  }

  comment() {
    const cmt: IComment = {
      id: null,
      post_id: this.post.id,
      content: this.contentValue,
      user: null,
      user_id: this.user.id
    };
    this.cmtService.createComment(cmt).subscribe(res => {
      console.log('cmtService', res);
      this.contentValue = '';
      this.commentSubmit.emit(true);
      // this.commentSubmit.unsubscribe();
    });
  }

  deleteCmt() {
    this.cmtService.deleteComment(this.cmtId).subscribe(res => {
      console.log('deleteCmt', res);
      this.commentRemove.emit(true);
      // this.commentSubmit.unsubscribe();
    });
  }

  handleChange(event) {
    this.contentValue = event.target.value;
  }

}
