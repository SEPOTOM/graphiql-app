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
  Variables = 'Variables',
  Headers = 'Headers',
  Body = 'Body',
}

export enum BodyType {
  json = 'json',
  text = 'text',
}

export enum PlaceHolder {
  json = 'Enter JSON here...',
  text = 'Enter the text here...',
}

export enum SegmentIndex {
  Method = 3,
  Endpoint = 4,
  Body = 5,
}

export enum BodyMode {
  None = 'none',
  Raw = 'raw',
}
