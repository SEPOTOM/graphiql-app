export interface Annotations {
  row: number;
  column: number;
  text: string;
  type: string;
}

export interface JSONError {
  line: number;
  column: number;
  message: string;
}

export type EditorOptions = {
  readOnly: boolean;
  automaticLayout?: boolean;
  minimap?: { enabled: boolean };
};
