import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  page = 1;
  totalRecord: number;
  @Input() limit = 25;
  offset = 0;

  @Output() changePage: EventEmitter<any> = new EventEmitter<any>();
  @Input() length: number;
  @Input() curPage: number;
  constructor() {

  }

  ngOnInit() {
    this.totalRecord = this.length;
    this.page = Math.ceil(this.totalRecord / this.limit);

  }

  PageChanged(pageNumber) {
    const l = this.limit;
    const o = (pageNumber - 1) * this.limit;
    this.changePage.emit({ pageNumber, limit: l, offset: o });
  }
}
