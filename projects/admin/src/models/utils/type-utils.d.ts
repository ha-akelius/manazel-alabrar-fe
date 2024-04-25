import { z } from 'zod';

export type PropType<T> = Omit<
  T,
  'id' | 'createdDate' | 'createdUserName' | 'createdUserId' | 'updatedDate' | 'updatedUserName' | 'updatedUserId'
>;
type IsSimpleType<T> = T extends string | number | boolean | symbol | Enum ? true : false;

interface Enum {
  // Marker interface for enums
}

type IsObject<T> = T extends object ? (T extends null | undefined ? never : true) : never;

type SimpleType<T> = {
  [P in keyof T as IsSimpleType<T[P]> extends true ? P : never]: T[P];
};

export type ImportantProps<T> = SimpleType<PropType<T>>;

export type ZodOutputFor<T> = z.ZodType<ImportantProps<T>>;
