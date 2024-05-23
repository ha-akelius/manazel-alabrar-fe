import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { environment } from '../../../environments/environment';
import { translationKeys } from '../../core/models/translations';
import { SharedModule } from '../../core/modules/shared.module';
import { AuthenticationService, LOGIN_INFO } from '../../core/services/authentication.service';
import { StorageService } from '../../core/services/storage.service';
import { NavbarComponent } from '../components/navbar/navbar.component';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, SharedModule, NavbarComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  translationKeys = translationKeys;
  environment = environment;

  subject: string = encodeURIComponent('نسيت كلمة السر');

  loginFrom = this.fb.nonNullable.group({
    identifier: ['', Validators.required],
    password: ['', Validators.required],
  });
  formError = false;
  constructor(
    private fb: FormBuilder,
    private ss: StorageService,
    private authService: AuthenticationService,
  ) {
    this.loadLoginInformation();
  }

  login() {
    const value = this.loginFrom.getRawValue();
    this.formError = false;
    this.authService.saveToken('local', value).catch(() => (this.formError = true));
  }

  logincord() {
    return this.fb.group(
      {
        first_name: ['', [Validators.required]],
        last_name: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
        confirm_password: ['', [Validators.required]],
      },
      {
        validators: [
          // MatchPassword('password', 'password_confirmation'),
        ],
        asyncValidators: [],
        updateOn: 'change',
      },
    );
  }

  getBody(): string {
    return [
      'السلام عليكم',
      'نسيت كلمت السر الخاص بي',
      'اسم المستخدم: ' + this.loginFrom.controls.identifier.value,
      '',
      'جزاكم الله خيرا',
      '',
    ].join('\n');
  }

  private loadLoginInformation() {
    const loginInformation = this.ss.getItem(LOGIN_INFO);
    if (loginInformation) {
      this.loginFrom.setValue(JSON.parse(loginInformation));
    }
  }
}
