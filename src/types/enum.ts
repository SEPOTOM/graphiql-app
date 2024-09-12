export enum GraphQlMenuTabs {
  Variables = 'graphQl_menu_tab_variables',
  Headers = 'graphQl_menu_tab_headers',
  Schema = 'graphQl_menu_tab_schema',
}

export enum GraphQlHeadersEditor {
  HeadersEditorEN = 'Headers',
  HeadersEditorRU = 'Заголовки',
}

export enum GraphQlVariablesEditor {
  HeadersEditorEN = 'Variables',
  HeadersEditorRU = 'Переменные',
}

export enum Method {
  Get = 'GET',
  Post = 'POST',
  Put = 'PUT',
  Patch = 'PATCH',
  Delete = 'DELETE',
  Head = 'HEAD',
  Options = 'OPTIONS',
}

export enum MenuTabsRest {
  Variables = 'restfull_client_menu_tab_variables',
  Headers = 'restfull_client_menu_tab_headers',
  Body = 'restfull_client_menu_tab_body',
}

export enum BodyType {
  graphql = 'graphql',
  json = 'json',
  text = 'text',
}

export enum PlaceHolder {
  graphql = 'body_type_graphql_placeholder',
  json = 'body_type_json_placeholder',
  text = 'body_type_text_placeholder',
}

export enum SegmentIndex {
  Language = 1,
  Method = 3,
  Endpoint = 4,
  Body = 5,
  LastElement = 6,
}

export enum BodyMode {
  None = 'none',
  Raw = 'raw',
}

export enum StorageKey {
  Variables = 'variables_data',
}
