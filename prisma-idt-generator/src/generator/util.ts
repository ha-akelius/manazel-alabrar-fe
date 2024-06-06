import fs from 'fs';

export function toKebabCase(str: string): string {
  return str
    .replace(/([A-Z])(?=[a-z])|(?=[^a-zA-Z0-9])/g, '-$1')
    .toLowerCase()
    .substring(1);
}

export function toSmallLetter(str: string): string {
  return str.charAt(0).toLocaleLowerCase() + str.substring(1);
}

export const excludeNames = [
  'id',
  'createdDate',
  'createdUserName',
  'createdUserId',
  'updatedDate',
  'updatedUserName',
  'updatedUserId',
];

export function createFile(file: string, content: string): void {
  fs.writeFileSync(file, content);
}
