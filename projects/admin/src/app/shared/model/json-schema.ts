/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComponentType } from '@angular/cdk/portal';
import { Type } from '@angular/core';
import { TableColumnComponent } from '../../../core/components/table/table';
import { APIService } from '../../../core/services/api.service';
import { PropInformation, WithPropType } from '../../../models/utils/type-utils';

export type JSONSchemaInfo<T = any> = {
  schema: WithPropType<T, GuiPropInformation>;
  label: string;
  labelPlural: string;
};

export type SchemaInfo<T = any> = JSONSchemaInfo<T> & {
  api: keyof APIService;
};

export type GuiInformation = {
  label: string;
  inputType: InputType;
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
  form?: ComponentType<never>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  list?: Type<TableColumnComponent<any>>;
}

export enum InputType {
  input,
  dateTime,
  relation,
  boolean,
  list,
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
