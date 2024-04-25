import { ComponentType } from '@angular/cdk/portal';
import { Type } from '@angular/core';
import { JSONSchema7 } from 'json-schema';
import { TableColumnComponent } from '../../../core/components/table/table';
import { APIService } from '../../../core/services/api.service';
import { RestApiServiceUnkown } from '../../../shared/services/rest-api.service';

export type JSONSchema = Omit<JSONSchema7, 'properties'> & {
  properties: {
    [key: string]: JSONSchema;
  };
  definitions: {
    [key: string]: JSONSchema;
  };
};

export type SchemaInfo<T = unknown> = {
  propertiesInfo: PropertyInformation[];
  schema: JSONSchema;
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
  property: JSONSchema;
  propertyName: string;
  hide?: boolean;
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
