/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from 'zod';

export type PropType<T> = Omit<
  T,
  | 'id'
  | 'createdDate'
  | 'createdUserName'
  | 'createdUserId'
  | 'updatedDate'
  | 'updatedUserName'
  | 'updatedUserId'
  | 'answerOptions'
  | 'questions'
  | 'student_info'
  | 'pathInformation'
>;
export type ImportantProps<T> = PropType<T>;
type IsSimpleType<T> = T extends string | number | boolean | symbol | Enum ? true : false;

interface Enum {
  // Marker interface for enums
}

type IsObject<T> = T extends object ? (T extends null | undefined ? never : true) : never;

type SimpleType<T> = {
  [P in keyof T as IsSimpleType<T[P]> extends true ? P : never]: T[P];
};

export type ZodOutputFor<T> = z.ZodType<SimpleType<PropType<T>>>;

export type DefaultValue<T extends number | boolean | string | Date> = T;

export type WithPropType<T = unknown, X = unknown> = WithType<PropType<T>, X>;

type WithType<T, X> = {
  [P in keyof T]-?: X;
};

type GetTypeName<T, Name extends string = never> = T extends string
  ? 'string'
  : T extends number
    ? 'number'
    : T extends Date
      ? 'Date'
      : T extends boolean
        ? 'boolean'
        : T extends symbol
          ? 'symbol'
          : Name;

export type PropPrismaInformation<T = any, Name extends string = string> = {
  type: Name;
  name: string;
  defaultValue?: T;
  array?: boolean;
  optional?: boolean;
  enum?: boolean;
  ref?: string;
};

declare function $localize(key: string): string;

// export type MinMx<T> = T extends string | number | boolean | symbol | Enum ? number : () => T | T;
export type MinMx = number;

export type PropExtraInformation<T> = {
  y?: T;
  min?: MinMx;
  max?: MinMx;
};

export type PropInformation<T = unknown, Name extends string = never> = {
  basic: PropPrismaInformation<T, Name>;
  extra?: PropExtraInformation<T>;
};
