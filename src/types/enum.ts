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
  Variables = 'Restfull_Client_Menu_Tab_Variables',
  Headers = 'Restfull_Client_Menu_Tab_Headers',
  Body = 'Restfull_Client_Menu_Tab_Body',
}

export enum BodyType {
  json = 'json',
  text = 'text',
}

export enum PlaceHolder {
  json = 'Body_Type_Json_Placeholder',
  text = 'Body_Type_Text_Placeholder',
}

export enum SegmentIndex {
  Languague = 1,
  Method = 3,
  Endpoint = 4,
  Body = 5,
  LastElement = 6,
}

export enum BodyMode {
  None = 'none',
  Raw = 'raw',
}
