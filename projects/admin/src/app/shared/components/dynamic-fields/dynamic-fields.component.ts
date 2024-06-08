import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit, forwardRef } from '@angular/core';
import {
  ControlValueAccessor,
  FormArray,
  FormControl,
  FormGroup,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Subscription } from 'rxjs';
import { BasicRecord } from '../../../../core/components/table/table';
import { RolesFormComponent } from '../../../../models/hooks/user/roles.component';
import { GuiPropInformation, InputType, JSONSchemaInfo } from '../../model/json-schema';
import { jsonSchemaInfo, schemaInfo } from '../../model/schame';
import { DateFormComponent } from './components/date-form.component';
import { MediaFieldComponent } from './components/media-field/media-field.component';
import { RelationComponent } from './components/relation/relation.component';
// Preserve original property order

@Component({
  selector: 'app-dynamic-fields',
  standalone: true,
  templateUrl: './dynamic-fields.component.html',
  styleUrl: './dynamic-fields.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DynamicFieldsComponent),
      multi: true,
    },
  ],
  imports: [
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    MatSlideToggleModule,
    MatButtonModule,
    CommonModule,
    RelationComponent,
    MatExpansionModule,
    MatSelectModule,
    DateFormComponent,
    RolesFormComponent,
    MediaFieldComponent,
  ],
})
export class DynamicFieldsComponent implements OnInit, OnDestroy, ControlValueAccessor {
  @Input({ required: true }) entityName: string = '';
  @Input() excludeFields: string[] = [];
  schemaInfo!: JSONSchemaInfo;
  inputType = InputType;
  dynamicForm: FormGroup = new FormGroup({});
  props: GuiPropInformation[];
  originalValue: BasicRecord | null = null;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  writeValue(value: any): void {
    this.originalValue = value;
    for (const propInfo of Object.values(this.schemaInfo.schema)) {
      if (propInfo.guiInfo.inputType === InputType.jsonArray) {
        const fieldName = propInfo.propInformation.basic.name;
        const formArray = this.dynamicForm.get(fieldName) as FormArray;
        if (value?.[fieldName]) {
          value[fieldName] = Array.isArray(value[fieldName]) ? value[fieldName] : [value[fieldName]];
          for (const element of value[fieldName]) {
            formArray.push(new FormControl(element));
          }
        }
      }
    }
    this.dynamicForm.patchValue(value || {}, { emitEvent: false });
  }

  addControl(prop: GuiPropInformation): void {
    this.formArray(prop).push(new FormControl());
  }

  formArray(prop: GuiPropInformation): FormArray {
    return this.dynamicForm.controls[prop.propInformation.basic.name] as FormArray;
  }

  formArrayControls(prop: GuiPropInformation): FormControl[] {
    return this.formArray(prop).controls as FormControl[];
  }

  subscription = new Subscription();
  registerOnChange(fn: (x: unknown) => void): void {
    this.subscription = this.dynamicForm.valueChanges.subscribe((value) => fn(value));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  registerOnTouched(): void {}

  ngOnInit(): void {
    this.schemaInfo = schemaInfo(this.entityName) || jsonSchemaInfo(this.entityName);
    this.props = Object.values(this.schemaInfo.schema).filter(
      (prop) => !this.excludeFields.includes(prop.propInformation.basic.name),
    );
    this.createFormGroup();
  }

  createFormGroup() {
    const formGroup = new FormGroup({});
    for (const propInfo of Object.values(this.schemaInfo.schema)) {
      if (propInfo.guiInfo.inputType === InputType.jsonArray) {
        const control = new FormArray([]);
        formGroup.addControl(propInfo.propInformation.basic.name, control);
      } else {
        const control = new FormControl(propInfo.propInformation.basic.defaultValue, this.collectValidators(propInfo));
        formGroup.addControl(propInfo.propInformation.basic.name, control);
      }
    }
    this.dynamicForm = formGroup;
  }

  getCompInputs(prop: GuiPropInformation): Record<string, unknown> | undefined {
    return {
      propInfo: prop,
      formControl: this.dynamicForm.controls[prop.propInformation.basic.name],
      record: this.originalValue,
    };
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

    return validators;
  }
}
