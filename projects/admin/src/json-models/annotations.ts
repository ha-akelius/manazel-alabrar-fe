import 'reflect-metadata';
import { GuiPropInformation } from '../app/shared/model/json-schema';

export function GuiInfo(info: Partial<GuiPropInformation>): PropertyDecorator {
  return (target, propertyKey) => {
    Reflect.defineMetadata('GuiInfo', info, target, propertyKey);
  };
}
