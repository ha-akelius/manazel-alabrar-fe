/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { APIService } from '../../../../core/services/api.service';
import { translations } from '../../../translations';
import { apiService, schemaInfo } from '../../model/schame';
import { DynamicFieldsComponent } from '../dynamic-fields/dynamic-fields.component';

@Component({
  standalone: true,
  selector: 'app-dynamic-form',
  imports: [MatButtonModule, ReactiveFormsModule, DynamicFieldsComponent],
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
})
export class DynamicFormComponent implements OnInit {
  apiService = inject(APIService);
  @Input() entityName: string = '';
  @Input() set value(value: unknown) {
    this.formValue.setValue(value);
  }
  @Output() formResult = new EventEmitter<typeof this.value | null>();
  formValue = new FormControl<unknown>(null, Validators.required);
  pageTitle: string = 'Add ' + this.entityName;
  translations = translations.general;

  ngOnInit(): void {
    if (this.value) {
      this.pageTitle = 'Edit' + this.entityName;
    } else {
      this.pageTitle = 'Add' + this.entityName;
    }
  }

  save() {
    if (!this.formValue.valid) {
      this.formValue.markAllAsTouched();
      return;
    }

    const api = apiService(schemaInfo(this.entityName).api, this.apiService);

    const obs = this.value
      ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
        api.update((this.value as unknown as any).id, this.formValue.value as never)
      : api.create(this.formValue.value as never);
    obs.subscribe((t) => {
      this.formResult.emit(t);
    });
  }

  cancel() {
    this.formResult.emit(null);
  }
}
