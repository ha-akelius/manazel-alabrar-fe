import { Directive, Input, Type } from '@angular/core';
import { Subject } from 'rxjs';

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
