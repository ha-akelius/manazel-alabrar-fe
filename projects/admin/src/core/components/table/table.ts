/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Directive, Input, Type, inject } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  FormControlDirective,
  FormControlName,
  FormGroup,
  NG_VALUE_ACCESSOR,
  NgControl,
  NgModel,
} from '@angular/forms';
import { Subject } from 'rxjs';
import { GuiPropInformation } from '../../../app/shared/model/json-schema';

export interface BasicRecord {
  id: number;
  name: string;
}

@Directive()
export class TableColumnComponent<X, T extends BasicRecord = BasicRecord> {
  @Input() record!: T;
  @Input() data?: X;
  @Input() key?: string;
  @Input() entityName!: string;
  @Input() onChange: Subject<void>;
}

@Directive({
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: NoopValueAccessorDirective,
    },
  ],
})
export class NoopValueAccessorDirective implements ControlValueAccessor {
  writeValue(_obj: any): void {}
  registerOnChange(_fn: any): void {}
  registerOnTouched(_fn: any): void {}
}

export function injectNgControl() {
  const ngControl = inject(NgControl, { self: true, optional: true });

  if (!ngControl) throw new Error('...');

  if (
    ngControl instanceof FormControlDirective ||
    ngControl instanceof FormControlName ||
    ngControl instanceof NgModel
  ) {
    return ngControl;
  }

  throw new Error('...');
}

@Directive()
export class FormFieldComponent<T = any> {
  @Input({ required: true }) propInfo: GuiPropInformation;
  @Input({ required: true }) formControl: FormControl<T>;

  get parentFormGroup(): FormGroup | undefined {
    return this.formControl.parent as FormGroup;
  }
}
@Directive()
export class FormComponent<T = any> {
  @Input({ required: true }) propInfo: GuiPropInformation;
  ngControl = injectNgControl();

  get parentFormGroup(): FormGroup | undefined {
    return this.ngControl.control?.parent as FormGroup;
  }

  get formControl(): FormControl<T> {
    return this.ngControl.control;
  }
}

export function componentDef<T>(component: new () => T, inputs: { [P in keyof T as Exclude<P, 'record'>]: T[P] }) {
  return { component, inputs };
}

export interface TableColumn<T extends BasicRecord> {
  name: string;
  displayName: string;
  dataKey?: keyof T;
  isSortable?: boolean;
  position?: 'right' | 'left';
  fn?: ((val: T[keyof T] | undefined, x: T) => string) | ((val: T[keyof T] | undefined) => string);
  componentDef?:
    | {
        component: Type<TableColumnComponent<unknown, T>>;
        inputs?: Record<string, unknown>;
      }
    | undefined;
}
