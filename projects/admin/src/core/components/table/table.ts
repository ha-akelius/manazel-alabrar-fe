/* eslint-disable @typescript-eslint/no-explicit-any */
import { Directive, Input, Optional, Self, Type } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ControlValueAccessor, FormControl, FormGroup, NgControl } from '@angular/forms';
import { Subject, debounceTime } from 'rxjs';
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

@Directive()
export class FormComponent<T = any, X = T> implements ControlValueAccessor {
  @Input({ required: true }) propInfo: GuiPropInformation;
  formControl = new FormControl<X | undefined>(undefined);
  onChange: (x: T | undefined | null) => void;

  constructor(@Optional() @Self() protected ngControl: NgControl) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
    this.formControl.valueChanges
      .pipe(takeUntilDestroyed(), debounceTime(300))
      .subscribe((value) => this.valueChange(value));
  }

  get parentFormGroup(): FormGroup | undefined {
    return this.ngControl.control?.parent as FormGroup;
  }

  writeValue(obj: T): void {
    this.formControl.setValue(this.mapToX(obj), { emitEvent: false });
  }

  registerOnChange(fn: FormComponent['onChange']): void {
    this.onChange = fn;
  }

  registerOnTouched(): void {}

  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      if (this.formControl.enabled) {
        this.formControl.disable();
      }
    } else {
      if (this.formControl.disabled) {
        this.formControl.enable();
      }
    }
  }

  protected valueChange(value: X | undefined | null): void {
    this.onChange(value as unknown as T);
  }

  protected mapToX(value: T): X {
    return value as unknown as X;
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
