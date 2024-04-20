import { JSONSchema7 } from 'json-schema';
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
  firstType: string | undefined;
  ref: keyof APIService | undefined;
}
