import { DMMF, GeneratorOptions } from '@prisma/generator-helper';
import fs from 'fs';
import path from 'path';

function toKebabCase(str: string): string {
  return str
    .replace(/([A-Z])(?=[a-z])|(?=[^a-zA-Z0-9])/g, '-$1')
    .toLowerCase()
    .substring(1);
}

function toSmallLetter(str: string): string {
  return str.charAt(0).toLocaleLowerCase() + str.substring(1);
}

export default async function onGenerate(options: GeneratorOptions) {
  const models = options.dmmf.datamodel.models;
  // generateTrnaslations(models);
  generateTrnaslationsEnum(options.dmmf.datamodel.enums);
  generateAPIService(models);
  generateGuiInfos(models);
}
const excludeNames = [
  'id',
  'createdDate',
  'createdUserName',
  'createdUserId',
  'updatedDate',
  'updatedUserName',
  'updatedUserId',
];

function excludeFields(f: DMMF.Field) {
  return f.kind !== 'object' && f.type !== 'Json' && !excludeNames.includes(f.name);
}

function generateAPIService(models: GeneratorOptions['dmmf']['datamodel']['models']) {
  const file = 'projects/admin/src/core/services/api.service.ts';
  const outputPath = path.resolve(file);
  fs.rmSync(outputPath);
  let content = `import { Injectable } from '@angular/core';
  import { ${models.map((m) => m.name).join(', ')}, Prisma } from '@prisma/client';
  import { RestApiService } from '../../shared/services/rest-api.service';

  @Injectable({
    providedIn: 'root',
  })
  export class APIService {
    `;
  models.forEach((e) => {
    const small = toSmallLetter(e.name);
    content += `  ${small} = new RestApiService<${e.name}, Prisma.${e.name}FindManyArgs, Prisma.${e.name}CreateInput, Prisma.${e.name}UpdateInput>(
  '${toKebabCase(e.name)}');

  `;
  });
  content += '}';

  createFile(outputPath, content);
}

function generateGuiInfos(models: DMMF.Model[]) {
  const file = 'projects/admin/src/models/gui-info/';

  let content = '';
  let content2 = 'export const schemas = {';
  models.forEach((e) => {
    content += `import { ${toSmallLetter(e.name)}Schema} from './${toKebabCase(e.name)}.gui-info';`;
    content2 += `${toSmallLetter(e.name)}Schema,`;
    const guiInfoFile = file + toKebabCase(e.name) + '.gui-info.ts';
    // if (!fs.existsSync(guiInfoFile)) {
    const guiInfoContent = `import { ${e.name} } from '@prisma/client';
  import { GuiPropInformation, SchemaInfo } from '../../app/shared/model/json-schema';
  import { ${e.name}PropInfo } from '../prop-info/${toKebabCase(e.name)}.prop-info';
  import { WithPropType } from '../utils/type-utils';

  export const ${toSmallLetter(e.name)}GuiInfo: WithPropType<${e.name}, GuiPropInformation> = {
    ${e.fields.filter(excludeFields).map(
      (f) => `
${f.name}: {
  propInformation: ${e.name}PropInfo.${f.name},
  guiInfo: {
    label: '',
  },
}
    `,
    )}
  };

  export const ${toSmallLetter(e.name)}Schema: SchemaInfo<${e.name}> = {
    schema: ${toSmallLetter(e.name)}GuiInfo,
    label: '',
    labelPlural: '',
    api: '${toSmallLetter(e.name)}',
  };

  `;
    createFile(guiInfoFile, guiInfoContent);
    // }
  });
  if (!fs.existsSync(file + 'index.ts')) {
    fs.rmSync(file + 'index.ts');
  }
  createFile(file + 'index.ts', content + content2 + '}');
}

function createFile(file: string, content: string): void {
  fs.writeFileSync(file, content);
}
function generateTrnaslations(models: DMMF.Model[]) {
  const file = 'projects/admin/src/app/translations/';
  const filePath = file + 'index.ts';
  models.forEach((e) => {
    const small = toSmallLetter(e.name);
    const fileName = toKebabCase(e.name);
    if (!fs.existsSync(file + fileName + '.ts')) {
      const content = `
      import { ${e.name} } from '@prisma/client';
      import { PropType } from '../shared/model/json-schema';

      export const ${small}: Record<keyof PropType<${e.name}>, string> = {
      };
          `;
      createFile(file + fileName + '.ts', content);

      const fileContent = fs.readFileSync(filePath, 'utf8');
      const regex = /};$/gm;
      const newContent = `import { ${small} } from './${fileName}';\n` + fileContent.replace(regex, `  ${small},\n};`);
      fs.writeFileSync(filePath, newContent, 'utf8');
    }
  });
}
function generateTrnaslationsEnum(models: DMMF.DatamodelEnum[]) {
  const file = 'projects/admin/src/app/translations/';
  const filePath = file + 'index.ts';
  models.forEach((e) => {
    const small = toSmallLetter(e.name);
    const fileName = toKebabCase(e.name);
    if (!fs.existsSync(file + fileName + '.ts')) {
      const content = `import { ${e.name} } from '@prisma/client';

      export const ${toSmallLetter(e.name)}: Record<${e.name}, string> = {
        ${e.values.map((v) => v.name + ': ""').join(',')}
      };
      `;
      createFile(file + fileName + '.ts', content);

      const fileContent = fs.readFileSync(filePath, 'utf8');
      const regex = /};$/gm;
      const newContent = `import { ${small} } from './${fileName}';\n` + fileContent.replace(regex, `  ${small},\n};`);
      fs.writeFileSync(filePath, newContent, 'utf8');
    }
  });
}
