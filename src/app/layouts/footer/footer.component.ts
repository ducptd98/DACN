import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { getLocaleDateTimeFormat } from '@angular/common';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  currentTime: string;
  constructor() { }

  ngOnInit() {
    this.currentTime = Date.now().toLocaleString();
  }

}
