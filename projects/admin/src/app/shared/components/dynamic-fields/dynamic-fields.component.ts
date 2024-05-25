import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, forwardRef } from '@angular/core';
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
import { RolesFormComponent } from '../../../../models/hooks/user/roles-form/roles-form.component';
import { GuiPropInformation, InputType, JSONSchemaInfo } from '../../model/json-schema';
import { jsonSchemaInfo, schemaInfo } from '../../model/schame';
import { DateFormComponent } from './components/date-form.component';
import { RelationComponent } from './components/relation/relation.component';
// Preserve original property order
const originalOrder = (): number => {
  return 0;
};

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
  ],
})
export class DynamicFieldsComponent implements OnInit, ControlValueAccessor {
  @Input({ required: true }) entityName: string = '';
  @Output() valueChanges = new EventEmitter();
  schemaInfo!: JSONSchemaInfo;
  inputType = InputType;
  dynamicForm: FormGroup = new FormGroup({});
  originalOrder = originalOrder;

  constructor() {
    // this.dynamicForm.valueChanges.pipe(takeUntilDestroyed()).subscribe((value) => this.onChange(value));
  }

  onChange: (x: unknown) => void;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  writeValue(value: any): void {
    this.dynamicForm.valueChanges.subscribe((value) => this.onChange(value ? structuredClone(value) : value));
    for (const propInfo of Object.values(this.schemaInfo.schema)) {
      if (propInfo.guiInfo.inputType === InputType.jsonArray) {
        const fieldName = propInfo.propInformation.basic.name;
        const formArray = this.dynamicForm.get(fieldName) as FormArray;
        for (let index = 0; index < value[fieldName].length; index++) {
          formArray.controls.push(new FormControl());
        }
      }
    }
    this.dynamicForm.patchValue(value || {}, { emitEvent: false });
  }

  formArrayValueChanges(value: unknown, index: number, formName: string): void {
    const formArray = this.dynamicForm.get(formName) as FormArray;
    const values = formArray.getRawValue();
    values[index] = value;
    formArray.setValue([...values]);
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

  registerOnChange(fn: typeof this.onChange): void {
    this.onChange = (x) => {
      fn(x);
      this.valueChanges.emit(x);
    };
  }

  registerOnTouched(): void {}

  ngOnInit(): void {
    this.schemaInfo = schemaInfo(this.entityName) || jsonSchemaInfo(this.entityName);
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
