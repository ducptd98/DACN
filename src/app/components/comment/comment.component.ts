import {environment} from './../../../environments/environment';
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IComment} from './../../../api/models/comment.model';
import {IPost} from './../../../api/models/post.model';
import {IUser} from './../../../api/models/user.model';
import {CommentService} from './../../../api/services/comment.service';
import {UserService} from './../../../api/services/user.service';
import * as CustomEditor from '../../../assets/ckeditor5/src/ckeditor';
import * as DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import {UploadAdapter} from '../../utilities/UploadAdapter';
import Pusher from 'pusher-js';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  @Input() isPost = true;
  @Input() post: IPost;
  @Input() user: IUser;
  @Input() cmt: IComment;


  @Output() commentSubmit: EventEmitter<any> = new EventEmitter<any>();
  @Output() commentRemove: EventEmitter<any> = new EventEmitter<any>();


  userNotPost: any;
  contentValue = '';

  public Editor = DecoupledEditor;
  // public Editor = CustomEditor;
  public config = {
    language: 'vi',
    placeholder: 'Nhập nội dung'
  };

  public onReady(editor) {
    editor.ui.getEditableElement().parentElement.insertBefore(
      editor.ui.view.toolbar.element,
      editor.ui.getEditableElement(),
      editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
        console.log(btoa(loader.file));
        return new UploadAdapter(loader);
      }
    );
  }


  constructor(private cmtService: CommentService, private userService: UserService) {
    this.cmtService.channel.bind('chat-message',
      data => {
        console.log('channel', data);
        this.commentSubmit.emit(true);
      }
    );
  }

  ngOnInit() {
    if (!this.isPost) {
      this.contentValue = this.cmt.content;
      this.getUserNotPost();
    }
  }

  getUserNotPost() {
    this.userService.getUserInfo(this.cmt.user_id).subscribe(res => {
      this.userNotPost = res;
    });
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
      this.contentValue = '';
      this.commentSubmit.emit(true);
      // this.commentSubmit.unsubscribe();
    });
  }

  deleteCmt() {
    this.cmtService.deleteComment(this.cmt.id).subscribe(res => {
      this.commentRemove.emit(true);
      // this.commentSubmit.unsubscribe();
    });
  }

  handleChange(event) {
    // console.log(event);
  }

}
