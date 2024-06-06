import { DMMF } from '@prisma/generator-helper';
import fs from 'fs';
import { createFile, toKebabCase, toSmallLetter } from './util';

export function generateTrnaslationsEnum(models: DMMF.DatamodelEnum[]) {
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
