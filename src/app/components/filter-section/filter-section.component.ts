import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LocationService } from './../../../api/services/location.service';
import { ToastrService } from 'ngx-toastr';
import { AlertProvider } from './../../utilities/alert.provider';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter, enableProdMode, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-filter-section',
  templateUrl: './filter-section.component.html',
  styleUrls: ['./filter-section.component.scss'],
  // viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class FilterSectionComponent implements OnInit, OnDestroy {

  @Input() provinces = [];
  @Input() districts: [];

  locationForm: FormGroup;
  province = null;
  district = null;
  address = null;
  subscription: Subscription[] = [];

  @Output() selectedAddress = new EventEmitter<any>();
  @Output() selectedDistrict = new EventEmitter<any>();

  constructor(private fb: FormBuilder,
    // private toastrSercvice: ToastrService,
              private router: Router,
              private locateService: LocationService) {
    this.locationForm = this.fb.group({
      provinceControl: []
    });
  }
  ngOnDestroy(): void {
    this.subscription.forEach(item => item.unsubscribe());
  }

  ngOnInit() {
    this.getProvince();
  }

  find() {
    this.selectedAddress.emit(this.address);
    this.selectedDistrict.emit(this.district);
    const name = `${this.district.Title}`;
    this.router.navigate([`/product/search`, { name }]);
  }

  provinceChange(e) {
    console.log('province', this.province);
    this.getDistrict(this.province.ID);
  }
  districtChange(e) {
    console.log('district', this.district);
  }
  getProvince() {
    const locateSubscription = this.locateService.getProvinceCity().subscribe(data => {
      this.provinces = data.LtsItem;
    });
    this.subscription.push(locateSubscription);
  }
  getDistrict(provinceId) {
    const locateSubscription = this.locateService.getDistrict(provinceId).subscribe(data => {
      this.districts = data;
    });
    this.subscription.push(locateSubscription);
  }
}
