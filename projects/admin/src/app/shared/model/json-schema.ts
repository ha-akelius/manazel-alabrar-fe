/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComponentType } from '@angular/cdk/portal';
import { Type } from '@angular/core';
import { TableColumnComponent } from '../../../core/components/table/table';
import { APIService } from '../../../core/services/api.service';
import { PropInformation, WithPropType } from '../../../models/utils/type-utils';
import { RestApiServiceUnkown } from '../../../shared/services/rest-api.service';

export type SchemaInfo<T = unknown> = {
  propertiesInfo: PropertyInformation[];
  schema: WithPropType<any, PropInformation<any, any>>;
  api: RestApiServiceUnkown<T>;
  entityTranslations: Record<string, string>;
};

export interface ComponentHooks {
  form?: ComponentType<never>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  list?: Type<TableColumnComponent<any>>;
}

export type HookType<T> = {
  [P in keyof T]?: ComponentHooks;
};

export enum InputType {
  input,
  dateTime,
  relation,
  boolean,
  unknown,
}

export interface PropertyInformation {
  inputType: InputType;
  name: string;
  property: PropInformation<any, any>;
  propertyName: string;
  firstType: string | undefined;
  ref: keyof APIService | undefined;
  hooks?: ComponentHooks;
}

export type PropType<T> = Omit<
  T,
  'createdDate' | 'createdUserName' | 'createdUserId' | 'updatedDate' | 'updatedUserName' | 'updatedUserId'
>;

export const excludeFields = [
  'createdDate',
  'createdUserName',
  'createdUserId',
  'updatedDate',
  'updatedUserName',
  'updatedUserId',
];
