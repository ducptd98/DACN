import { IUser } from './../../../api/models/user.model';
import { IPost } from './../../../api/models/post.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

  @Input() post: IPost;
  @Input() user: IUser;

  constructor() { }

  ngOnInit() {

  }

}
