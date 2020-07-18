import { takeUntil } from 'rxjs/operators';
import { IUser } from './../../../api/models/user.model';
import { MustMatch } from 'src/app/utilities/confirmPass.validators';
import { Router } from '@angular/router';
import { UserService } from './../../../api/services/user.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

  profileForm: FormGroup;
  submitted = false;
  destroy$: Subject<boolean> = new Subject<boolean>();
  curUser: IUser;

  loading = false;

  constructor(private fb: FormBuilder, private authService: UserService, private router: Router) {
    this.getCurUser();
   }
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  ngOnInit() {
    this.profileForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPass: ['', Validators.required],
      // phoneNumber: ['', [Validators.pattern('[0-9]*'), Validators.maxLength(10)]],
      name: ['', Validators.required],
    }, {
      validator: MustMatch('password', 'confirmPass')
    });
  }
  get f() {
    return this.profileForm.controls;
  }

  getCurUser() {
    this.loading = true;
    const token = this.authService.getToken();
    if (token) {
      this.authService.getUser(token).subscribe(res => {
        this.curUser = res;
        this.f.name.setValue(this.curUser.name);
        this.loading = false;
      });
    }
  }

  updateProfile() {
    this.submitted = true;

    if (this.profileForm.invalid) {
      alert('invalid');
      return;
    }

    if (this.f.password.value !== this.f.confirmPass.value) {
      alert('ko giong');
      return;
    }
    const info = {
      name: this.f.name.value,
      password: this.f.password.value,
    };
    const user: IUser = { ...this.curUser, ...info };
    this.authService.updateInfo(this.curUser.id, user).pipe(takeUntil(this.destroy$)).subscribe(res => {
      console.log(res);

    });
  }

}
