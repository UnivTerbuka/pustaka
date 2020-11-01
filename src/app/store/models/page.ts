export interface Page {
  id?: string;
  modul?: string;
  fonts: Array<Font>;
  height: number;
  number: number;
  pages: number;
  text: Array<Array<number | string>>;
  // [[number,number,number,number,number, string]]
  width: number;
}

export interface Font {
  color: string;
  family: string;
  fontspec: string;
  size: string;
}
