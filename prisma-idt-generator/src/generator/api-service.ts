import { GeneratorOptions } from '@prisma/generator-helper';
import fs from 'fs';
import path from 'path';
import { createFile, toKebabCase, toSmallLetter } from './util';

export function generateAPIService(models: GeneratorOptions['dmmf']['datamodel']['models']) {
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
