/* eslint-disable @typescript-eslint/no-explicit-any */
import { APIService } from '../../../core/services/api.service';
import { hooks } from '../../../models/hooks';
import { propInfos } from '../../../models/prop-info';
import { PropInformation, WithPropType } from '../../../models/utils/type-utils';
import { RestApiServiceUnkown } from '../../../shared/services/rest-api.service';
import { translations } from '../../translations';
import { InputType, PropertyInformation, SchemaInfo, excludeFields } from './json-schema';

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

export function schemaInfo<T>(entityName: string, apiService: APIService): SchemaInfo<T> {
  const key = getJSONKey(entityName)!;
  const restApiService: RestApiServiceUnkown = apiService[toSmallLetter(key) as keyof typeof apiService];
  const entityTranslations = translations[toSmallLetter(key) as keyof typeof translations];
  const schema = propInfos![(key + 'PropInfo') as keyof typeof propInfos] as WithPropType<T, PropInformation<any, any>>;
  const propertiesInfo: PropertyInformation[] = getPropertiesInfo(key, schema);

  return { propertiesInfo, schema: schema, entityTranslations, api: restApiService as RestApiServiceUnkown<T> };
}

function getInputType(
  property: PropInformation<any, any>,
  firstType: string,
  ref: keyof APIService | undefined,
): InputType {
  if (property.basic.type === 'Date') {
    return InputType.dateTime;
  } else if (ref) {
    return InputType.relation;
  } else if (['string', 'number', 'integer'].includes(firstType ?? '')) {
    return InputType.input;
  } else if (firstType === 'boolean') {
    return InputType.boolean;
  } else {
    return InputType.unknown;
  }
}

function getPropertiesInfo(key: string, dataSchema: WithPropType<any, PropInformation<any, any>>) {
  const propertiesInfo: PropertyInformation[] = [];
  const relations: string[] = [];
  const modelHooks = hooks[(toSmallLetter(key) + 'Hooks') as keyof typeof hooks];
  for (const propertyName of Object.keys(dataSchema)) {
    const property = dataSchema[propertyName];
    if (excludeFields.includes(propertyName)) {
      continue;
    }
    // const type = getPropertyType(property);
    // const refs = property.$ref?.split('/');
    const ref = property.basic.ref ? (toSmallLetter(property.basic.ref) as keyof APIService) : undefined;
    const controlName = propertyName + (ref ? 'Id' : '');
    // if (propertyName !== 'id' && type !== 'array') {
    if (propertyName !== 'id') {
      const firstType = property.basic.type;
      const inputType = getInputType(property, firstType, ref);
      if (ref) {
        relations.push(propertyName.replace('Id', '') + 'Name');
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
  // propertiesInfo.filter((p) => relations.includes(p.propertyName)).forEach((p) => (p.hide = true));
  return propertiesInfo;
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
