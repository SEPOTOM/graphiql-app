export interface GraphQlSchemaTypesItem {
  description: string;
  enumValues?: null | never[];
  fields: GraphQlSchemaTypesFields[] | null;
  inputFields: GraphQlSchemaTypesInputFields[] | null;
  interfaces?: null | never[];
  kind: string;
  name: string;
  possibleTypes: null | never[];
}

export interface GraphQlSchemaTypesFields {
  args?: never[];
  deprecationReason?: null | string;
  description: string;
  isDeprecated?: boolean;
  name: string;
  type: GraphQlSchemaTypesFieldType;
}

export interface GraphQlSchemaTypesInputFields {
  defaultValue: null | string;
  description: string;
  name: string;
  type: GraphQlSchemaTypesFieldType;
}

export interface GraphQlSchemaTypesFieldType {
  kind: string;
  name: string;
  ofType: null | GraphQlSchemaTypesFieldType;
}
