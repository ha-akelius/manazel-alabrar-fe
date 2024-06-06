import { DMMF } from '@prisma/generator-helper';
import { createFile, excludeNames, toKebabCase } from './util';

export function createPropInfo(models: DMMF.Model[]) {
  const folder = 'projects/admin/src/models/prop-info';
  models.forEach((model) => {
    createPrismaPropInfo(folder, model);
    createExtraPropInfo(folder, model);
  });
}

function createExtraPropInfo(folder: string, model: DMMF.Model) {
  const kebab = toKebabCase(model.name);
  const fields = model.fields.filter(excludeFields2);
  // if (!fs.existsSync(folder + kebab + '.prop-info.ts')) {
  let content = `/* eslint-disable @typescript-eslint/no-explicit-any */
import { ${model.name}, ${model.fields
    .filter((f) => (f.kind === 'object' || f.kind === 'enum') && excludeFields2(f))
    .map((f) => f.type)
    .join(',')} } from '@prisma/client';
import { PropInformation, WithPropType } from '../utils/type-utils';
import { ${model.name}GenInfo } from './${kebab}.gen-info';`;

  content += getJsonImports(fields);
  fields.forEach((f) => {
    content += `const ${f.name}: PropInformation<${fromDBToTs(f)}, '${fromDBToTs(f)}'> = {
        basic: ${model.name}GenInfo.${f.name},
      };`;
  });

  content += `export const ${model.name}PropInfo: WithPropType<${model.name}, PropInformation<any, any>> = {`;
  content += fields.map((f) => `${f.name}: ${f.name}`).join(',\n');
  content += '};';
  createFile(`${folder}/${kebab}.prop-info.ts`, content);
  // }
}

function getJsonImports(fields: DMMF.Field[]) {
  let content: string = '';
  const imports = fields
    .filter((f) => f.type === 'Json')
    .map((f) => capitalizeAndTrimS(f.name))
    .join(', ');
  if (imports) {
    content += ` import { ${imports} } from '../../json-models';\n`;
  }
  return content;
}

function createPrismaPropInfo(folder: string, model: DMMF.Model) {
  let toImports = model.fields
    .filter((f) => (f.kind === 'object' || f.kind === 'enum') && excludeFields2(f))
    .map((f) => f.type)
    .join(',');
  toImports = toImports.trim().length ? `import { ${toImports} } from '@prisma/client';` : '';
  let contentFields = `/* eslint-disable @typescript-eslint/no-explicit-any */
import { PropPrismaInformation } from '../utils/type-utils';
  `;
  const fields = model.fields.filter(excludeFields2);
  contentFields += getJsonImports(fields);
  contentFields += toImports;

  const contentExport = `export const ${model.name}GenInfo = {` + fields.map((f) => f.name).join(',') + '};';

  fields.forEach((f) => {
    contentFields += `const ${f.name}: PropPrismaInformation<${fromDBToTs(f)}, '${fromDBToTs(f)}'> = {
      type: '${fromDBToTs(f)}',
      name: '${f.name}',
    `;
    if (f.hasDefaultValue && f.name !== 'id') {
      contentFields += `defaultValue: ${f.default},`;
    }

    if (f.isList) {
      contentFields += `array: true,`;
    }

    if (!f.isRequired) {
      contentFields += `optional: true,`;
    }

    const ref = model.fields.find((ref) => ref.name === f.name.replace('Id', ''));
    if (f.name.endsWith('Id') && ref) {
      contentFields += `ref: '${ref.type}',`;
    }
    contentFields += `};
    `;

    // contentFields += JSON.stringify(f);
  });

  createFile(`${folder}/${toKebabCase(model.name)}.gen-info.ts`, contentFields + contentExport);
}
function excludeFields(f: DMMF.Field) {
  return f.kind !== 'object' && !excludeNames.includes(f.name);
}

function excludeFields2(f: DMMF.Field) {
  return excludeFields(f);
  // return (
  //   f.name !== 'id' &&
  //   f.type !== 'Json' &&
  //   f.name !== 'user' &&
  //   !(f.kind === 'object' && f.isList) &&
  //   !excludeNames.includes(f.name)
  // );
}

function capitalizeAndTrimS(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function fromDBToTs(field: DMMF.Field) {
  const db = field.type;
  switch (db) {
    case 'Boolean':
      return 'boolean';
    case 'String':
      return 'string';
    case 'Int':
    case 'Float':
      return 'number';
    case 'DateTime':
      return 'Date';
    case 'Json':
      return capitalizeAndTrimS(field.name);
    default:
      return db;
  }
}
