import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TranslateModule } from '@ngx-translate/core';
import { translationKeys } from '../../../../../../../src/app/core/models/translations';
import { UserStore } from '../../user-state';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, TranslateModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  form = this.fb.group({
    name: ['', Validators.required],
  });

  translationKeys = translationKeys;

  constructor(
    private fb: FormBuilder,
    private userStore: UserStore,
  ) {
    const student = this.userStore.studentResponse().data!;
    this.form.setValue({
      name: student.name,
    });
  }

  save() {
    if (this.form.valid) {
      this.userStore.saveProfile(this.form.controls.name.value!);
    }
  }
}
