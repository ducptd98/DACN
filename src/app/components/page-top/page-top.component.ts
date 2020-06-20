import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-page-top',
  templateUrl: './page-top.component.html',
  styleUrls: ['./page-top.component.scss']
})
export class PageTopComponent implements OnInit {

  @Input() header: string;
  @Input() imgPageTop: string;
  @Input() descriptions: string;
  @Input() isHomePage: boolean;

  @Output() viewDetail = new EventEmitter<any>();
  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    if (this.header == null) {
      this.header = this.route.snapshot.data.breadcrumb;
    }
  }
  onClick() {
    this.viewDetail.emit(true);
  }
}
