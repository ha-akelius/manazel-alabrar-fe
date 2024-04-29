/* eslint-disable @typescript-eslint/no-explicit-any */
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { APIService } from '../../../../core/services/api.service';
import { translations } from '../../../translations';
import { GuiPropInformation, InputType, SchemaInfo } from '../../model/json-schema';
import { apiService, schemaInfo } from '../../model/schame';
import { RelationComponent } from './relation/relation.component';

// Preserve original property order
const originalOrder = (): number => {
  return 0;
};

@Component({
  standalone: true,
  selector: 'app-dynamic-form',
  imports: [
    MatInputModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatSlideToggleModule,
    MatButtonModule,
    CommonModule,
    MatCardModule,
    RelationComponent,
  ],
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
})
export class DynamicFormComponent implements OnInit {
  apiService = inject(APIService);
  @Input() entityName: string = '';
  @Input() value: unknown;
  @Output() formResult = new EventEmitter<typeof this.value | null>();
  dynamicForm: FormGroup = new FormGroup({});
  schemaInfo!: SchemaInfo;
  inputType = InputType;
  pageTitle: string = 'Add ' + this.entityName;
  translations = translations.general;
  originalOrder = originalOrder;
  createFormGroup() {
    const formGroup = new FormGroup({});
    for (const propInfo of Object.values(this.schemaInfo.schema)) {
      const control = new FormControl(propInfo.propInformation.basic.defaultValue, this.collectValidators(propInfo));
      formGroup.addControl(propInfo.propInformation.basic.name, control);
    }
    this.dynamicForm = formGroup;
  }

  ngOnInit(): void {
    this.schemaInfo = schemaInfo(this.entityName);
    this.createFormGroup();

    if (this.value) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this.dynamicForm.patchValue(this.value as any);
      this.pageTitle = 'Edit' + this.entityName;
    } else {
      this.pageTitle = 'Add' + this.entityName;
    }
  }

  save() {
    if (!this.dynamicForm.valid) {
      this.dynamicForm.markAllAsTouched();
      return;
    }
    const api = apiService(this.schemaInfo.api, this.apiService);

    const obs = this.value
      ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
        api.update((this.value as unknown as any).id, this.dynamicForm.value as never)
      : api.create(this.dynamicForm.value as never);
    obs.subscribe((t) => {
      this.formResult.emit(t);
    });
  }

  cancel() {
    this.formResult.emit(null);
  }

  getRelation(property: GuiPropInformation) {
    return this.dynamicForm.get(property.propInformation.basic.name.replace('Id', '') + 'Name')!;
  }

  private collectValidators(property: GuiPropInformation): ValidatorFn[] {
    const validators: ValidatorFn[] = [];

    if (property.propInformation.extra?.min) {
      validators.push(Validators.min(property.propInformation.extra.min));
    }

    if (property.propInformation.extra?.max) {
      validators.push(Validators.min(property.propInformation.extra.max));
    }

    if (!property.propInformation.basic.optional) {
      validators.push(Validators.required);
    }

    if (property.propInformation.basic.name.includes('email')) {
      validators.push(Validators.email);
    }

    // if (propertyName === 'name') {
    //   validators.push(Validators.minLength(3));
    //   validators.push(Validators.maxLength(20));
    // }

    // const nameRegex = /^[a-zA-Z0-9]{3,20}$/;

    // if (propertyName === 'name') {
    //   validators.push(Validators.pattern(nameRegex));
    // }

    return validators;
  }
}
