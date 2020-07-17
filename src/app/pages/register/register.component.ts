import { IUser } from './../../../api/models/user.model';
import { UserService } from './../../../api/services/user.service';
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

  constructor(private fb: FormBuilder, private authService: UserService, private router: Router) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPass: ['', Validators.required],
      // phoneNumber: ['', [Validators.pattern('[0-9]*'), Validators.maxLength(10)]],
      name: ['', Validators.required],
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
      alert('invalid');
      return;
    }

    if (this.f.password.value !== this.f.confirmPass.value) {
      alert('ko giong');
      return;
    }
    const user: IUser = {
      id: null,
      name: this.f.name.value,
      password: this.f.password.value,
      email: this.f.email.value,
      created_at: null,
      updated_at: null,
      avatar: null,
      avatar_path: null,
      remember_token: null
    };
    this.authService.register(user).subscribe(res => {
      console.log(res);
      this.router.navigate(['/login']);
    });
  }
}
