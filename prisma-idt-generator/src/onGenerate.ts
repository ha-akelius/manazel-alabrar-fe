import { GeneratorOptions } from '@prisma/generator-helper';
import { generateAPIService } from './generator/api-service';
import { generateGuiInfos } from './generator/gui-info';
import { createPropInfo } from './generator/prop-info';
import { generateTrnaslationsEnum } from './generator/translations';

export default async function onGenerate(options: GeneratorOptions) {
  const models = options.dmmf.datamodel.models;
  // generateTrnaslations(models);
  generateTrnaslationsEnum(options.dmmf.datamodel.enums);
  generateAPIService(models);
  generateGuiInfos(models);
  createPropInfo(models);
}

// function generateTrnaslations(models: DMMF.Model[]) {
//   const file = 'projects/admin/src/app/translations/';
//   const filePath = file + 'index.ts';
//   models.forEach((e) => {
//     const small = toSmallLetter(e.name);
//     const fileName = toKebabCase(e.name);
//     if (!fs.existsSync(file + fileName + '.ts')) {
//       const content = `
//       import { ${e.name} } from '@prisma/client';
//       import { PropType } from '../shared/model/json-schema';

//       export const ${small}: Record<keyof PropType<${e.name}>, string> = {
//       };
//           `;
//       createFile(file + fileName + '.ts', content);

//       const fileContent = fs.readFileSync(filePath, 'utf8');
//       const regex = /};$/gm;
//       const newContent = `import { ${small} } from './${fileName}';\n` + fileContent.replace(regex, `  ${small},\n};`);
//       fs.writeFileSync(filePath, newContent, 'utf8');
//     }
//   });
// }
