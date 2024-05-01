import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, forwardRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  ControlValueAccessor,
  FormControl,
  FormGroup,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { GuiPropInformation, InputType, JSONSchemaInfo } from '../../model/json-schema';
import { schemaInfo } from '../../model/schame';
import { RelationComponent } from '../dynamic-form/relation/relation.component';

// Preserve original property order
const originalOrder = (): number => {
  return 0;
};

@Component({
  selector: 'app-dynamic-fields',
  standalone: true,
  imports: [
    MatInputModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatSlideToggleModule,
    MatButtonModule,
    CommonModule,
    RelationComponent,
  ],
  templateUrl: './dynamic-fields.component.html',
  styleUrl: './dynamic-fields.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DynamicFieldsComponent),
      multi: true,
    },
  ],
})
export class DynamicFieldsComponent implements OnInit, ControlValueAccessor {
  @Input({ required: true }) entityName: string = '';
  schemaInfo!: JSONSchemaInfo;
  inputType = InputType;
  dynamicForm: FormGroup = new FormGroup({});
  originalOrder = originalOrder;

  constructor() {
    this.dynamicForm.valueChanges.pipe(takeUntilDestroyed()).subscribe((value) => this.onChange(value));
  }

  onChange: (x: unknown) => void;

  writeValue(value: unknown): void {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.dynamicForm.patchValue(value as any);
  }
  registerOnChange(fn: typeof this.onChange): void {
    this.onChange = fn;
  }
  registerOnTouched(): void {}

  ngOnInit(): void {
    this.schemaInfo = schemaInfo(this.entityName);
    this.createFormGroup();
  }

  createFormGroup() {
    const formGroup = new FormGroup({});
    for (const propInfo of Object.values(this.schemaInfo.schema)) {
      const control = new FormControl(propInfo.propInformation.basic.defaultValue, this.collectValidators(propInfo));
      formGroup.addControl(propInfo.propInformation.basic.name, control);
    }
    this.dynamicForm = formGroup;
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

    return validators;
  }
}
