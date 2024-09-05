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
