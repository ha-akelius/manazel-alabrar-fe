/* eslint-disable @typescript-eslint/no-explicit-any */
import { Type } from '@angular/core';
import { FormComponent, FormFieldComponent, TableColumnComponent } from '../../../core/components/table/table';
import { APIService } from '../../../core/services/api.service';
import { PropInformation, WithPropType } from '../../../models/utils/type-utils';

export type Action<T> = {
  label: string;
  actionFactory: () => (x: T) => void;
};

export type JSONSchemaInfo<T = any> = {
  schema: WithPropType<T, GuiPropInformation>;
  actions?: Action<T>[];
  label: string;
  labelPlural: string;
};

export type SchemaInfo<T = any> = JSONSchemaInfo<T> & {
  api: keyof APIService;
};

export type GuiInformation = {
  label: string;
  inputType: InputType;
  options?: object;
  hide?: {
    form?: boolean;
    list?: boolean;
  };
  hooks?: ComponentHooks;
};

export type GuiPropInformation = {
  propInformation: PropInformation<any, any>;
  guiInfo: GuiInformation;
};

export interface ComponentHooks {
  form?: Type<FormComponent | FormFieldComponent>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  list?: Type<TableColumnComponent<any>>;
}

export enum InputType {
  input,
  textarea,
  dateTime,
  relation,
  boolean,
  enum,
  list,
  json,
  jsonArray,
  unknown,
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
