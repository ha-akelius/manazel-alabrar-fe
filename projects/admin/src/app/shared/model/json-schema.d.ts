import { JSONSchema7 } from 'json-schema';
import { RestApiServiceUnkown } from '../../../shared/services/rest-api.service';

export type JSONSchema = Omit<JSONSchema7, 'properties'> & {
  properties: {
    [key: string]: JSONSchema;
  };
  definitions: {
    [key: string]: JSONSchema;
  };
};

export type SchemaInfo = {
  schema: JSONSchema;
  api: RestApiServiceUnkown;
};
