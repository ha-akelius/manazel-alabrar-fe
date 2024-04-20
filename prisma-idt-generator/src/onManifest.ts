import type { GeneratorManifest } from '@prisma/generator-helper';

export default function onManifest(): GeneratorManifest {
  return {
    defaultOutput: './types',
    prettyName: 'IDT Prisma generator',
    version: '0.0.1',
  };
}
