/* eslint-disable @typescript-eslint/no-explicit-any */
import { APIService } from '../../../core/services/api.service';
import { jsonSchemas } from '../../../json-models/gui-info';
import { jsonPropInfos } from '../../../json-models/prop-info';
import { schemas } from '../../../models/gui-info';
import { modelPropInfos } from '../../../models/prop-info';
import { RestApiServiceUnkown } from '../../../shared/services/rest-api.service';
import { JSONSchemaInfo, SchemaInfo } from './json-schema';

function getJSONKey(entityName: string, obj: any): string | undefined {
  const propLower = entityName.toLowerCase().replace('-', '');
  for (const key in obj) {
    if (key.toLowerCase() === propLower + 'propinfo') {
      return key.replace('PropInfo', '');
    }
  }
  return undefined; // Or throw an error if the property is not found
}

function toSmallLetter(str: string): string {
  return str.charAt(0).toLocaleLowerCase() + str.substring(1);
}

export function jsonSchemaInfo<T>(entityName: string): JSONSchemaInfo<T> {
  const key = getJSONKey(entityName, jsonPropInfos)!;
  return jsonSchemas[(toSmallLetter(key) + 'Schema') as keyof typeof jsonSchemas] as unknown as JSONSchemaInfo<T>;
}

export function assertSchemaInfo<T>(entityName: string): SchemaInfo<T> {
  return schemaInfo<T>(entityName)!;
}

export function schemaInfo<T>(entityName: string): SchemaInfo<T> | null {
  const key = getJSONKey(entityName, modelPropInfos);
  if (key) {
    return schemas[(toSmallLetter(key) + 'Schema') as keyof typeof schemas] as unknown as SchemaInfo<T>;
  } else {
    return null;
  }
}

export function apiService(key: keyof APIService, apiService: APIService): RestApiServiceUnkown {
  return apiService[key] as RestApiServiceUnkown;
}

export type htmlInputType = 'date' | 'number' | 'text';

export function fromJsonTypeToHtmlType(propertyName: string, type: string): htmlInputType {
  if (numberTypes.includes(type)) {
    return 'number';
  } else if (propertyName.toLowerCase().indexOf('date') >= 0) {
    return 'date';
  } else {
    return 'text';
  }
}

export const numberTypes = ['number', 'integer'];
