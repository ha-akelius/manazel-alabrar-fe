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
  generateTrnaslations(models);
  generateAPIService(models);
  generateDummyInterfaces(models);
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

function generateDummyInterfaces(models: DMMF.Model[]) {
  let content = '';
  models.forEach((e) => {
    content += `
  export class ${e.name} {}
`;
  });
  const file = 'src/app/core/models/dummy-interfaces.ts';
  if (fs.existsSync(file)) {
    fs.rmSync(file);
  }
  createFile(file, content);
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
