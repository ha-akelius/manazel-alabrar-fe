import { GeneratorOptions } from '@prisma/generator-helper';
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

function createFile(file: string, content: string): void {
  fs.writeFileSync(file, content);
}
