import { IUser } from './../api/models/user.model';
import { UserService } from './../api/services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Real Estate';
  constructor() {

  }
  ngOnInit(): void {

  }
}
