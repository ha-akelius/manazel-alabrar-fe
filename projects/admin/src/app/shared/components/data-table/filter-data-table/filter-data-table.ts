import { htmlInputType } from '../../../model/schame';

export enum operators {
  equals = 'equals',
  lte = 'lte',
  gte = 'gte',
  contains = 'contains',
  startWith = 'startWith',
  endWith = 'endWith',
}

export const typeOperator: Record<htmlInputType, operators[]> = {
  text: [operators.equals, operators.lte, operators.gte, operators.contains, operators.startWith, operators.endWith],
  number: [operators.equals, operators.lte, operators.gte],
  date: [operators.equals, operators.lte, operators.gte],
};
