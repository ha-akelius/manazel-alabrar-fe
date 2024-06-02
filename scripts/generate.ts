import * as Reflect from 'reflect-metadata';
import * as ts from 'typescript';
import { GuiPropInformation } from '../projects/admin/src/app/shared/model/json-schema';

// Path to your lessons.ts file
const filePath = './projects/admin/src/json-models/lessons.ts';

// Function to extract information from GuiInfo annotation
function extractPropInfo(node: ts.Node, propertyKey: string): GuiPropInformation {
  const info = Reflect.getMetadata('GuiInfo', node, propertyKey);

  if (info) {
    const args = info.expression.arguments[0];
    return {
      type: (node as ts.PropertyDeclaration).type.getText() as U,
      name: propertyKey,
      optional: args?.properties.find((prop) => prop.name.getText() === 'optional')?.initializer.getText() ?? 'false',
      min: args?.properties.find((prop) => prop.name.getText() === 'min')?.initializer.getText() as number | undefined,
    };
  } else {
    return null;
  }
}

// Function to parse the TypeScript file
function parseTsFile(filePath: string) {
  const sourceFile = ts.createSourceFile(filePath, ts.ScriptTarget.Latest, {}, ts.sys);

  const classes = sourceFile.statements.filter(
    (node) => ts.isClassDeclaration(node) && node.modifiers?.some((mod) => mod.kind === ts.SyntaxKind.ExportKeyword),
  );

  for (const classNode of classes) {
    const className = classNode.name.text;
    console.log(`\nClass: ${className}`);

    for (const member of classNode.members) {
      if (ts.isPropertyDeclaration(member)) {
        const propInfo = extractPropInfo(member, member.name.text);
        if (propInfo) {
          console.log(`  Property: ${propInfo.name}`);
          console.log(`    Type: ${propInfo.type}`);
          console.log(`    Optional: ${propInfo.optional}`);
          if (propInfo.min !== undefined) {
            console.log(`    Min: ${propInfo.min}`);
          }
        }
      }
    }
  }
}

// Run the script
parseTsFile(filePath);
