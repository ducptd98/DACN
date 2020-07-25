import {Component, forwardRef, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, NG_VALUE_ACCESSOR} from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

// @ts-ignore
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ModalComponent),
    }
  ]
})
export class ModalComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
  }

}
