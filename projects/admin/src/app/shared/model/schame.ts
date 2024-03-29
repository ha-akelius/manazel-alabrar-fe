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

export function schemaInfo(entityName: string, apiService: APIService): SchemaInfo {
  const dataSchema: JSONSchema = getJSONSchema(entityName);
  const restApiService: RestApiServiceUnkown = getCaseInsensitiveProperty(apiService, entityName);
  return { schema: dataSchema, api: restApiService };
}

export function getFirstType(property: JSONSchema): string | undefined {
  if (typeof property.type === 'string') {
    return property.type;
  } else if (Array.isArray(property.type) && property.type.length > 0) {
    return property.type[0];
  }
  return undefined;
}
