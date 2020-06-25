import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  activeTab = 'my';
  constructor() { }

  ngOnInit() {
  }
  tabChange(e) {
    console.log(e);
    this.activeTab = e.nextId;
  }
}
