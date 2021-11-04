/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const ts = require('typescript');

function upperCaseFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function lowerCaseFirstLetter(string) {
  return string.charAt(0).toLowerCase() + string.slice(1);
}

function createUrqlImportStatement() {
  return ts.factory.createImportDeclaration(
    undefined,
    undefined,
    ts.factory.createImportClause(
      true,
      undefined,
      ts.factory.createNamedImports([ts.factory.createImportSpecifier(
        undefined,
        ts.factory.createIdentifier('OperationResult')
      )]),
    ),
    ts.factory.createStringLiteral('@urql/core', true),
  );
}

function createGqlServiceImportStatement(importPath) {
  return ts.factory.createImportDeclaration(
    undefined,
    undefined,
    ts.factory.createImportClause(
      true,
      undefined,
      ts.factory.createNamedImports([ts.factory.createImportSpecifier(
        undefined,
        ts.factory.createIdentifier("GraphqlService"),
      )]),
    ),
    ts.factory.createStringLiteral(path.dirname(importPath), true),
  );
}

function createTypeExportStatement(operationType, operationName) {
  operationType = upperCaseFirstLetter(operationType);
  operationName = upperCaseFirstLetter(operationName);
  const operation = `${operationName}${operationType}`;
  const operationVariable = `${operation}Variables`;
  const operationResponse = `${operationName}Response`;

  return ts.factory.createTypeAliasDeclaration(
    undefined,
    [ts.factory.createToken(ts.SyntaxKind.ExportKeyword)],
    operationResponse,
    undefined,
    ts.factory.createTypeReferenceNode(
      'OperationResult',
      [
        ts.factory.createTypeReferenceNode(operation),
        ts.factory.createTypeReferenceNode(operationVariable),
      ],
    ),
  );
}

function createExportFunction(operationType, operationName) {
  const functionName = lowerCaseFirstLetter(operationName);

  operationName = upperCaseFirstLetter(operationName);
  const operation = `${operationName}${upperCaseFirstLetter(operationType)}`;
  const operationVariable = `${operation}Variables`;
  const operationResponse = `${operationName}Response`;

  return ts.factory.createFunctionDeclaration(
    undefined,
    [
      ts.factory.createModifier(ts.SyntaxKind.ExportKeyword),
      ts.factory.createModifier(ts.SyntaxKind.AsyncKeyword),
    ],
    undefined,
    ts.factory.createIdentifier(functionName),
    undefined,
    [
      ts.factory.createParameterDeclaration(
        undefined,
        undefined,
        undefined,
        ts.factory.createIdentifier('input'),
        undefined,
        ts.factory.createTypeReferenceNode(
          ts.factory.createIdentifier(operationVariable),
          undefined,
        ),
        undefined,
      ),
      ts.factory.createParameterDeclaration(
        undefined,
        undefined,
        undefined,
        ts.factory.createIdentifier('client'),
        undefined,
        ts.factory.createTypeReferenceNode(
          ts.factory.createIdentifier('GraphqlService'),
          undefined,
        ),
        undefined,
      ),
    ],
    ts.factory.createTypeReferenceNode(
      ts.factory.createIdentifier("Promise"),
      [ts.factory.createTypeReferenceNode(
        ts.factory.createIdentifier(operationResponse),
        undefined
      )]
    ),
    ts.factory.createBlock(
      [ts.factory.createReturnStatement(ts.factory.createAwaitExpression(ts.factory.createCallExpression(
        ts.factory.createElementAccessExpression(
          ts.factory.createIdentifier('client'),
          ts.factory.createStringLiteral(operationType, true),
        ),
        undefined,
        [
          ts.factory.createIdentifier(operationName),
          ts.factory.createIdentifier('input'),
        ],
      )))],
      true,
    ),
  );
}

module.exports = {
  plugin: (_schema, documents, _config, info) => {
    const { outputFile } = info;

    const gqlServiceFilePath = path.relative(
      path.dirname(outputFile),
      path.resolve(__dirname, '../service/index.ts'),
    );

    const sourceFile = ts.createSourceFile(
      '',
      '',
      ts.ScriptTarget.Latest,
      false,
      ts.ScriptKind.TS,
    );

    const printer = ts.createPrinter({
      newLine: ts.NewLineKind.LineFeed,
    });

    let append = [];

    for (const { document } of documents) {
      if (!document || !document.definitions) continue;
      for (const def of document.definitions) {
        const { kind, operation, name: { value } } = def;

        if (kind !== 'OperationDefinition') continue;

        const printed = printer.printList(
          ts.ListFormat.MultiLine,
          ts.factory.createNodeArray([
            createTypeExportStatement(operation, value),
            createExportFunction(operation, value),
          ]),
          sourceFile,
        );

        append.push(printed);
      }
    }

    let prepend = [];
    if (append.length) {
      const printed = printer.printList(
        ts.ListFormat.MultiLine,
        ts.factory.createNodeArray([
          createGqlServiceImportStatement(gqlServiceFilePath),
          createUrqlImportStatement(),
        ]),
        sourceFile,
      );

      prepend.push(printed);

      append = [
        '\n',
        ...append,
        '\n',
      ];
    }
    return {
      content: '',
      prepend,
      append,
    };
  },
};
