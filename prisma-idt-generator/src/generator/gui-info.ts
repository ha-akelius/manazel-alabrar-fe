import { DMMF } from '@prisma/generator-helper';
import fs from 'fs';
import { createFile, excludeNames, toKebabCase, toSmallLetter } from './util';

export function generateGuiInfos(models: DMMF.Model[]) {
  const file = 'projects/admin/src/models/gui-info/';

  let content = '';
  let content2 = 'export const schemas = {';
  models.forEach((e) => {
    content += `import { ${toSmallLetter(e.name)}Schema} from './${toKebabCase(e.name)}.gui-info';`;
    content2 += `${toSmallLetter(e.name)}Schema,`;
    const guiInfoFile = file + toKebabCase(e.name) + '.gui-info.ts';
    if (!fs.existsSync(guiInfoFile)) {
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
    }
  });
  if (!fs.existsSync(file + 'index.ts')) {
    fs.rmSync(file + 'index.ts');
  }
  createFile(file + 'index.ts', content + content2 + '}');
}

function excludeFields(f: DMMF.Field) {
  return f.kind !== 'object' && f.type !== 'Json' && !excludeNames.includes(f.name);
}
