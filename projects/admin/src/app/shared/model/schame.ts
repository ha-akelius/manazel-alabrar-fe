import { JSONSchema7Type, JSONSchema7TypeName } from 'json-schema';
import schema from '../../../../../../src/app/core/models/json-schema.json';
import { APIService } from '../../../core/services/api.service';
import * as hooks from '../../../models/hooks';
import { RestApiServiceUnkown } from '../../../shared/services/rest-api.service';
import { translations } from '../../translations';
import { InputType, JSONSchema, PropertyInformation, SchemaInfo, excludeFields } from './json-schema';

const schemaJson: JSONSchema = schema as unknown as JSONSchema;

function getJSONKey(entityName: string): string | undefined {
  const propLower = entityName.toLowerCase();
  for (const key in schemaJson.definitions) {
    if (key.toLowerCase() === propLower) {
      return key;
    }
  }
  return undefined; // Or throw an error if the property is not found
}

export function getPropertyType(property: JSONSchema): JSONSchema7TypeName {
  return Array.isArray(property.type) ? property.type[0] : property.type!;
}

function toSmallLetter(str: string): string {
  return str.charAt(0).toLocaleLowerCase() + str.substring(1);
}

function getInputType(
  property: JSONSchema,
  firstType: JSONSchema7TypeName | undefined,
  ref: string | undefined,
): InputType {
  if (property.format === 'date-time') {
    return InputType.dateTime;
  } else if (['string', 'number', 'integer'].includes(firstType ?? '')) {
    return InputType.input;
  } else if (ref) {
    return InputType.relation;
  } else if (firstType === 'boolean') {
    return InputType.boolean;
  } else {
    return InputType.unknown;
  }
}

export function schemaInfo<T>(entityName: string, apiService: APIService): SchemaInfo<T> {
  const key = getJSONKey(entityName)!;
  const jsonSchema = schema.definitions[key as keyof typeof schema.definitions] as unknown as JSONSchema;
  const restApiService: RestApiServiceUnkown = apiService[toSmallLetter(key) as keyof typeof apiService];
  const propertiesInfo: PropertyInformation[] = getPropertiesInfo(key, jsonSchema);
  const entityTranslations = translations[toSmallLetter(key) as keyof typeof translations];

  return { propertiesInfo, schema: jsonSchema!, entityTranslations, api: restApiService as RestApiServiceUnkown<T> };
}

function getPropertiesInfo(key: string, dataSchema: JSONSchema) {
  const propertiesInfo: PropertyInformation[] = [];
  const relations: string[] = [];
  const modelHooks = hooks[(toSmallLetter(key) + 'Hooks') as keyof typeof hooks];
  for (const [propertyName, property] of Object.entries(dataSchema.properties)) {
    if (excludeFields.includes(propertyName)) {
      continue;
    }
    // const type = getPropertyType(property);
    const refs = property.$ref?.split('/');
    const ref = refs ? (refs[refs.length - 1] as keyof APIService) : undefined;
    const controlName = propertyName + (ref ? 'Id' : '');
    // if (propertyName !== 'id' && type !== 'array') {
    if (propertyName !== 'id') {
      const firstType = getFirstType(property);
      const inputType = getInputType(property, firstType, ref);
      if (ref) {
        relations.push(propertyName + 'Name');
      }
      const proHooks = modelHooks ? modelHooks[propertyName as keyof typeof modelHooks] : undefined;
      propertiesInfo.push({
        name: controlName,
        propertyName: propertyName,
        property: property,
        firstType: firstType,
        inputType: inputType,
        ref: ref,
        hooks: proHooks,
      });
    }
  }
  propertiesInfo.filter((p) => relations.includes(p.propertyName)).forEach((p) => (p.hide = true));
  return propertiesInfo;
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
