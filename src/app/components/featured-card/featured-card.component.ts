import { IProduct } from './../../../api/models/product.model';
import { IUser } from './../../../api/models/user.model';
import { Component, OnInit, Input } from '@angular/core';
import { ControlContainer, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-featured-card',
  templateUrl: './featured-card.component.html',
  styleUrls: ['./featured-card.component.scss'],
})
export class FeaturedCardComponent implements OnInit {

  @Input() srcImage: string;
  @Input() product: IProduct;
  @Input() user: IUser;
  // can truyen object

  constructor() { }

  ngOnInit() {
    this.srcImage = 'assets/feature/'.concat(this.srcImage);
  }

}
