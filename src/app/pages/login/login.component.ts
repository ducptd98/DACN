import { ToastrService } from 'ngx-toastr';
import { UserService } from './../../../api/services/user.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder,
              private authService: UserService,
              private toastrService: ToastrService,
              private router: Router) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['nhoxku2019@gmail.com', [Validators.required, Validators.email]],
      password: ['Test123!', [Validators.required, Validators.minLength(8)]]
    });
  }
  get f() {
    return this.loginForm.controls;
  }
  login() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      console.log('error');
      return;
    }

    this.authService.login(this.f.email.value, this.f.password.value)
      .subscribe(
        res => {
          console.log(res);
          this.authService.setToken(res.token);
          this.router.navigate(['/home']);

        },
        error => this.toastrService.error(error.error[0])
      );
  }
}
