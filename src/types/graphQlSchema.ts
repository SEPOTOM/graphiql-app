type Nullable<T> = T | undefined | null;

export interface GraphQlSchemaTypesItem {
  description: string;
  enumValues?: Nullable<never[]>;
  fields: Nullable<GraphQlSchemaTypesFields[]>;
  inputFields: Nullable<GraphQlSchemaTypesInputFields[]>;
  interfaces?: Nullable<never[]>;
  kind: string;
  name: string;
  possibleTypes: Nullable<never[]>;
}

export interface GraphQlSchemaTypesFields {
  args?: never[];
  deprecationReason?: Nullable<string>;
  description: string;
  isDeprecated?: boolean;
  name: string;
  type: GraphQlSchemaTypesFieldType;
}

export interface GraphQlSchemaTypesInputFields {
  defaultValue: Nullable<string>;
  description: string;
  name: string;
  type: GraphQlSchemaTypesFieldType;
}

export interface GraphQlSchemaTypesFieldType {
  kind: string;
  name: string;
  ofType: Nullable<GraphQlSchemaTypesFieldType>;
}
