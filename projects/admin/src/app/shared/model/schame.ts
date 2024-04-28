/* eslint-disable @typescript-eslint/no-explicit-any */
import { APIService } from '../../../core/services/api.service';
import { schemas } from '../../../models/gui-info';
import { propInfos } from '../../../models/prop-info';
import { RestApiServiceUnkown } from '../../../shared/services/rest-api.service';
import { SchemaInfo } from './json-schema';

function getJSONKey(entityName: string): string | undefined {
  const propLower = entityName.toLowerCase();
  for (const key in propInfos) {
    if (key.toLowerCase() === propLower + 'propinfo') {
      return key.replace('PropInfo', '');
    }
  }
  return undefined; // Or throw an error if the property is not found
}

function toSmallLetter(str: string): string {
  return str.charAt(0).toLocaleLowerCase() + str.substring(1);
}

export function schemaInfo<T>(entityName: string): SchemaInfo<T> {
  const key = getJSONKey(entityName)!;
  return schemas[(toSmallLetter(key) + 'Schema') as keyof typeof schemas] as SchemaInfo<T>;
  // const entityTranslations = translations[toSmallLetter(key) as keyof typeof translations];
  // const schema = propInfos![(key + 'PropInfo') as keyof typeof propInfos] as WithPropType<T, PropInformation<any, any>>;
  // const propertiesInfo: PropertyInformation[] = getPropertiesInfo(key, schema);

  // return { propertiesInfo, schema: schema, entityTranslations, api: restApiService as RestApiServiceUnkown<T> };
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
