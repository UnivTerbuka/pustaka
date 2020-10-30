export interface Page {
  fonts: Font[];
  height: number;
  number: number;
  pages: number;
  text: Array<Array<number | string>>;
  width: number;
}

export interface Font {
  color: string;
  family: string;
  fontspec: string;
  size: string;
}
