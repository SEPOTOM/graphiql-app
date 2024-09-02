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
  Variables = 'RestfullClientMenuTabVariables',
  Headers = 'RestfullClientMenuTabHeaders',
  Body = 'RestfullClientMenuTabBody',
}

export enum BodyType {
  json = 'json',
  text = 'text',
}

export enum PlaceHolder {
  json = 'BodyTypeJsonPlaceholder',
  text = 'BodyTypeTextPlaceholder',
}

export enum SegmentIndex {
  Languague = 1,
  Method = 3,
  Endpoint = 4,
  Body = 5,
}

export enum BodyMode {
  None = 'none',
  Raw = 'raw',
}
