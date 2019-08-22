import {
  DocumentNode,
  DefinitionNode,
  VariableDefinitionNode,
  OperationDefinitionNode,
} from 'graphql';

export enum DocumentType {
  Query,
  Mutation,
  Subscription,
}

export interface IDocumentDefinition {
  type: DocumentType;
  name: string;
  variables: VariableDefinitionNode[];
}

export function parser(document: DocumentNode): IDocumentDefinition {
  // variables
  let variables;
  let type;
  let name;

  const queries = document.definitions.filter(
    (x: DefinitionNode) =>
      x.kind === 'OperationDefinition' && x.operation === 'query',
  );

  const mutations = document.definitions.filter(
    (x: DefinitionNode) =>
      x.kind === 'OperationDefinition' && x.operation === 'mutation',
  );

  const subscriptions = document.definitions.filter(
    (x: DefinitionNode) =>
      x.kind === 'OperationDefinition' && x.operation === 'subscription',
  );

  type = queries.length ? DocumentType.Query : DocumentType.Mutation;
  if (!queries.length && !mutations.length) {
    type = DocumentType.Subscription;
  }

  const definitions = queries.length
    ? queries
    : mutations.length ? mutations : subscriptions;

  const definition = definitions[0] as OperationDefinitionNode;
  variables = definition.variableDefinitions || [];
  const hasName = definition.name && definition.name.kind === 'Name';
  name = hasName ? definition.name.value : 'data'; // fallback to using data if no name
  return { name, type, variables };
}
