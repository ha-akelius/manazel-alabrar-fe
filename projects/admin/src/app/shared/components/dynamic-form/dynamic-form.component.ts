/* eslint-disable @typescript-eslint/no-explicit-any */
import { JsonPipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { APIService } from '../../../../core/services/api.service';
import { translations } from '../../../translations';
import { apiService, assertSchemaInfo } from '../../model/schame';
import { DynamicFieldsComponent } from '../dynamic-fields/dynamic-fields.component';

@Component({
  standalone: true,
  selector: 'app-dynamic-form',
  imports: [JsonPipe, MatButtonModule, ReactiveFormsModule, DynamicFieldsComponent],
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
})
export class DynamicFormComponent implements OnInit {
  apiService = inject(APIService);
  snackBar = inject(MatSnackBar);
  durationInSeconds = 3;
  @Input() entityName: string = '';
  @Input() set value(value: unknown) {
    this.formValue.setValue(value);
    this._value = value;
  }
  _value: unknown;
  @Output() formResult = new EventEmitter<typeof this._value | null>();
  formValue = new FormControl<unknown>(null, Validators.required);
  pageTitle: string = 'Add ' + this.entityName;
  translations = translations.general;

  ngOnInit(): void {
    if (this._value) {
      this.pageTitle = 'Edit' + this.entityName;
    } else {
      this.pageTitle = 'Add' + this.entityName;
    }
  }

  save() {
    if (!this.formValue.valid) {
      this.formValue.markAllAsTouched();
      this.openSnackbar($localize`done successfully`);
      return;
    }

    const api = apiService(assertSchemaInfo(this.entityName).api, this.apiService);

    const obs = this._value
      ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
        api.update((this._value as unknown as any).id, this.formValue.value as never)
      : api.create(this.formValue.value as never);
    obs.subscribe((t) => {
      this.formResult.emit(t);
    });
  }

  cancel() {
    this.formResult.emit(null);
    this.openSnackbar($localize`cancel done`);
  }

  private openSnackbar(message: string): void {
    this.snackBar.open(message, '', {
      duration: 2000,
    });
  }
}
