import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { MustMatch } from 'src/app/utilities/confirmPass.validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {

  registerForm: FormGroup;
  submitted = false;
  subscription: Subscription = new Subscription();

  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPass: ['', Validators.required],
      phoneNumber: ['', [Validators.pattern('[0-9]*'), Validators.maxLength(10)]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      address: ['']
    }, {
      validator: MustMatch('password', 'confirmPass')
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  get f() {
    return this.registerForm.controls;
  }
  register() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }
  }
}
