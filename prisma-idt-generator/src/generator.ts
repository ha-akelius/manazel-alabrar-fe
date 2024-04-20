import { generatorHandler } from '@prisma/generator-helper';
import onGenerate from './onGenerate';
import onManifest from './onManifest';

generatorHandler({
  onManifest: onManifest,
  onGenerate: onGenerate,
});
