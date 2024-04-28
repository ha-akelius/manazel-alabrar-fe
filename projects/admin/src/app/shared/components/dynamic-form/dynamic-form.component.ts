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
import { PropInformation } from '../../../../models/utils/type-utils';
import { translations } from '../../../translations';
import { InputType, PropertyInformation, SchemaInfo } from '../../model/json-schema';
import { schemaInfo } from '../../model/schame';
import { RelationComponent } from './relation/relation.component';

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
  createFormGroup() {
    const formGroup = new FormGroup({});
    for (const propInfo of this.schemaInfo.propertiesInfo) {
      const control = new FormControl(
        propInfo.property.basic.defaultValue,
        this.collectValidators(propInfo.propertyName, propInfo.property),
      );
      formGroup.addControl(propInfo.name, control);
    }
    this.dynamicForm = formGroup;
  }

  ngOnInit(): void {
    this.schemaInfo = schemaInfo(this.entityName, this.apiService);
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

    const obs = this.value
      ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.schemaInfo.api.update((this.value as unknown as any).id, this.dynamicForm.value as never)
      : this.schemaInfo.api.create(this.dynamicForm.value as never);
    obs.subscribe((t) => {
      this.formResult.emit(t);
    });
  }

  cancel() {
    this.formResult.emit(null);
  }

  getRelation(property: PropertyInformation) {
    return this.dynamicForm.get(property.propertyName.replace('Id', '') + 'Name')!;
  }

  private collectValidators(propertyName: string, property: PropInformation<any, any>): ValidatorFn[] {
    const validators: ValidatorFn[] = [];

    if (property.extra?.min) {
      validators.push(Validators.min(property.extra.min));
    }

    if (property.extra?.max) {
      validators.push(Validators.min(property.extra.max));
    }

    if (!property.basic.optional) {
      validators.push(Validators.required);
    }

    if (propertyName.includes('email')) {
      validators.push(Validators.email);
    }

    // if (propertyName === 'name') {
    //   validators.push(Validators.minLength(3));
    //   validators.push(Validators.maxLength(20));
    // }

    const nameRegex = /^[a-zA-Z0-9]{3,20}$/;

    if (propertyName === 'name') {
      validators.push(Validators.pattern(nameRegex));
    }

    return validators;
  }
}
