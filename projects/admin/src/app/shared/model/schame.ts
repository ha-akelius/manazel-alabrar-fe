import { JSONSchema7Type, JSONSchema7TypeName } from 'json-schema';
import { APIService } from '../../../core/services/api.service';
import { RestApiServiceUnkown } from '../../../shared/services/rest-api.service';
import schema from '../../model/json-schema.json';
import { JSONSchema, SchemaInfo } from './json-schema';

const schemaJson: JSONSchema = schema as unknown as JSONSchema;

export function getJSONSchema(entityName: string): JSONSchema {
  return getCaseInsensitiveProperty(schemaJson.definitions, entityName);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getCaseInsensitiveProperty(obj: object, prop: string): any {
  const propLower = prop.toLowerCase();
  for (const key in obj) {
    if (key.toLowerCase() === propLower) {
      return obj[key as keyof typeof obj];
    }
  }
  return undefined; // Or throw an error if the property is not found
}

export function getPropertyType(property: JSONSchema): JSONSchema7TypeName {
  return Array.isArray(property.type) ? property.type[0] : property.type!;
}

export function schemaInfo<T>(entityName: string, apiService: APIService): SchemaInfo<T> {
  const dataSchema: JSONSchema = getJSONSchema(entityName);
  const restApiService: RestApiServiceUnkown = getCaseInsensitiveProperty(apiService, entityName);
  return { schema: dataSchema, api: restApiService as RestApiServiceUnkown<T> };
}

export function getFirstType(property: JSONSchema): JSONSchema7TypeName | undefined {
  if (typeof property.type === 'string') {
    return property.type;
  } else if (Array.isArray(property.type) && property.type.length > 0) {
    return property.type[0];
  }
  return undefined;
}

export type htmlInputType = 'date' | 'number' | 'text';

export function fromJsonTypeToHtmlType(propertyName: string, type: JSONSchema7Type): htmlInputType {
  if (numberTypes.includes(type)) {
    return 'number';
  } else if (propertyName.toLowerCase().indexOf('date') >= 0) {
    return 'date';
  } else {
    return 'text';
  }
}

export const numberTypes: JSONSchema7Type[] = ['number', 'integer'];
